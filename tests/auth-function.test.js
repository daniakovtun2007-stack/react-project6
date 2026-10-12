import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { after, before, test } from 'node:test';
import { env } from 'node:process';
import handler from '../netlify/functions/auth.js';

const originalEnvironment = {
  email: env.APP_AUTH_EMAIL,
  password: env.APP_AUTH_PASSWORD,
  secret: env.JWT_SECRET_BASE64
};

before(() => {
  env.APP_AUTH_EMAIL = 'test@example.com';
  env.APP_AUTH_PASSWORD = 'test-password';
  env.JWT_SECRET_BASE64 = Buffer.alloc(32, 7).toString('base64');
});

after(() => {
  if (originalEnvironment.email === undefined) delete env.APP_AUTH_EMAIL;
  else env.APP_AUTH_EMAIL = originalEnvironment.email;
  if (originalEnvironment.password === undefined) delete env.APP_AUTH_PASSWORD;
  else env.APP_AUTH_PASSWORD = originalEnvironment.password;
  if (originalEnvironment.secret === undefined) delete env.JWT_SECRET_BASE64;
  else env.JWT_SECRET_BASE64 = originalEnvironment.secret;
});

test('login returns a bearer token and /me accepts it', async () => {
  const loginResponse = await handler(new Request('https://site.example/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ' TEST@example.com ', password: 'test-password' })
  }));
  const login = await loginResponse.json();

  assert.equal(loginResponse.status, 200);
  assert.equal(login.tokenType, 'Bearer');
  assert.equal(login.expiresIn, 900);

  const userResponse = await handler(new Request('https://site.example/api/auth/me', {
    headers: { Authorization: `Bearer ${login.token}` }
  }));

  assert.equal(userResponse.status, 200);
  assert.deepEqual(await userResponse.json(), { email: 'test@example.com' });
});

test('login rejects an incorrect password', async () => {
  const response = await handler(new Request('https://site.example/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@example.com', password: 'wrong-password' })
  }));

  assert.equal(response.status, 401);
});

test('protected endpoint rejects missing and malformed tokens', async () => {
  const missingTokenResponse = await handler(new Request('https://site.example/api/auth/me'));
  const malformedTokenResponse = await handler(new Request('https://site.example/api/auth/me', {
    headers: { Authorization: 'Bearer invalid.token.value' }
  }));

  assert.equal(missingTokenResponse.status, 401);
  assert.equal(malformedTokenResponse.status, 401);
});

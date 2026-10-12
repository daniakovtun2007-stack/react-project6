import { createHmac, timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';
import { env } from 'node:process';

const TOKEN_LIFETIME_SECONDS = 900;

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

function getConfiguration() {
  const email = env.APP_AUTH_EMAIL?.trim().toLowerCase();
  const password = env.APP_AUTH_PASSWORD;
  const secretBase64 = env.JWT_SECRET_BASE64;

  if (!email || !password || !secretBase64) {
    return null;
  }

  const secret = Buffer.from(secretBase64, 'base64');
  if (secret.length < 32) {
    return null;
  }

  return { email, password, secret };
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function encodeBase64Url(value) {
  return Buffer.from(value).toString('base64url');
}

function signToken(email, secret) {
  const now = Math.floor(Date.now() / 1000);
  const header = encodeBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = encodeBase64Url(JSON.stringify({
    sub: email,
    iat: now,
    exp: now + TOKEN_LIFETIME_SECONDS
  }));
  const unsignedToken = `${header}.${payload}`;
  const signature = createHmac('sha256', secret).update(unsignedToken).digest('base64url');

  return `${unsignedToken}.${signature}`;
}

function verifyToken(token, email, secret) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }

  const [headerPart, payloadPart, signature] = parts;
  const unsignedToken = `${headerPart}.${payloadPart}`;
  const expectedSignature = createHmac('sha256', secret).update(unsignedToken).digest('base64url');
  if (!safeEqual(signature, expectedSignature)) {
    return false;
  }

  try {
    const header = JSON.parse(Buffer.from(headerPart, 'base64url').toString('utf8'));
    const payload = JSON.parse(Buffer.from(payloadPart, 'base64url').toString('utf8'));
    const now = Math.floor(Date.now() / 1000);

    return header.alg === 'HS256'
      && payload.sub === email
      && Number.isInteger(payload.exp)
      && payload.exp > now;
  } catch (error) {
    if (error instanceof SyntaxError) {
      return false;
    }
    throw error;
  }
}

export default async function handler(request) {
  const config = getConfiguration();
  if (!config) {
    return jsonResponse(503, { message: 'Authentication service is not configured.' });
  }

  const requestUrl = new URL(request.url);
  const endpoint = requestUrl.searchParams.get('endpoint')
    || requestUrl.pathname.split('/').filter(Boolean).at(-1);

  if (endpoint === 'login' && request.method === 'POST') {
    let credentials;
    try {
      credentials = await request.json();
    } catch (error) {
      if (error instanceof SyntaxError) {
        return jsonResponse(400, { message: 'A valid email and password are required.' });
      }
      throw error;
    }

    if (
      typeof credentials?.email !== 'string'
      || typeof credentials?.password !== 'string'
      || !credentials.email.trim()
      || !credentials.password
    ) {
      return jsonResponse(400, { message: 'A valid email and password are required.' });
    }

    const email = credentials.email.trim().toLowerCase();
    if (!safeEqual(email, config.email) || !safeEqual(credentials.password, config.password)) {
      return jsonResponse(401, { message: 'Invalid email or password.' });
    }

    return jsonResponse(200, {
      token: signToken(config.email, config.secret),
      tokenType: 'Bearer',
      expiresIn: TOKEN_LIFETIME_SECONDS
    });
  }

  if (endpoint === 'me' && request.method === 'GET') {
    const authorization = request.headers.get('Authorization') || '';
    const match = /^Bearer ([^\s]+)$/.exec(authorization);

    if (!match || !verifyToken(match[1], config.email, config.secret)) {
      return jsonResponse(401, { message: 'Unauthorized' });
    }

    return jsonResponse(200, { email: config.email });
  }

  return jsonResponse(404, { message: 'Not found.' });
}

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import Notification from './Notification.jsx';
import apiBaseUrl from './api.js';
import './App.css';

function Auth({ theme, toggleTheme, toggleLanguage, onLoginSuccess, t }) {
  const location = useLocation();
  const [email, setEmail] = useState(() =>
    localStorage.getItem('remember_me') === 'true'
      ? localStorage.getItem('saved_email') || ''
      : ''
  );
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(localStorage.getItem('remember_me') === 'true');
  const [loginError, setLoginError] = useState('');
  const [hasSessionError, setHasSessionError] = useState(() => Boolean(location.state?.authError));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setHasSessionError(false);
    setIsSubmitting(true);

    const normalizedEmail = email.trim().toLowerCase();

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password })
      });

      if (!response.ok) {
        setLoginError(
          response.status === 401
            ? t.login.error
            : response.status === 400
              ? t.login.invalidInput
              : response.status === 503
                ? t.login.serverNotConfigured
              : t.login.serverError
        );
        return;
      }

      const authResponse = await response.json();
      if (typeof authResponse.token !== 'string' || !authResponse.token) {
        setLoginError(t.login.serverError);
        return;
      }
      onLoginSuccess(authResponse.token);
      if (rememberMe) {
        localStorage.setItem('saved_email', normalizedEmail);
        localStorage.setItem('remember_me', 'true');
      } else {
        localStorage.removeItem('saved_email');
        localStorage.setItem('remember_me', 'false');
      }

      navigate('/home');
    } catch {
      setLoginError(t.login.serverError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <Notification
        message={hasSessionError ? t.login.sessionError : loginError}
        onClose={() => {
          setLoginError('');
          setHasSessionError(false);
        }}
        closeLabel={t.closeNotification}
      />

      <button
        type="button"
        className="btn btn-outline-secondary control-toggle language-toggle"
        onClick={toggleLanguage}
        aria-label={t.languageLabel}
      >
        {t.languageButton}
      </button>

      <button
        type="button"
        className="btn btn-outline-secondary control-toggle theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'light' ? t.themeDark : t.themeLight}
      >
        <><Icon name={theme === 'light' ? 'moon' : 'sun'} /> {theme === 'light' ? t.dark : t.light}</>
      </button>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <div className="card auth-card border-0">
              <div className="card-body">
                <div className="text-center mb-4">
                  <div className="auth-badge mx-auto mb-3"><Icon name="lock" /></div>
                  <h2 className="fw-bold mb-1">{t.login.welcome}</h2>
                  <p className="text-secondary mb-0">{t.login.intro}</p>
                </div>

                <form onSubmit={handleLogin} className="needs-validation" noValidate>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">{t.login.email}</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-semibold">{t.login.password}</label>
                    <div className="input-group input-group-lg">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className="form-control"
                        placeholder={t.login.passwordPlaceholder}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? t.login.hidePassword : t.login.showPassword}
                      >
                        <Icon name={showPassword ? 'eyeOff' : 'eye'} />
                      </button>
                    </div>
                  </div>

                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setRememberMe(checked);
                        localStorage.setItem('remember_me', String(checked));

                        if (!checked) {
                          localStorage.removeItem('saved_email');
                        }
                      }}
                    />
                    <label className="form-check-label text-secondary" htmlFor="rememberMe">
                      {t.login.rememberMe}
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg w-100" disabled={isSubmitting}>
                    {isSubmitting ? t.login.submitting : t.login.submit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
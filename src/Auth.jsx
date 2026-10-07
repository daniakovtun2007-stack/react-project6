import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Auth({ theme, toggleTheme }) {
  const [email, setEmail] = useState(localStorage.getItem('saved_email') || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(localStorage.getItem('remember_me') === 'true');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === 'daniakovtun2007@gmail.com' && password === '19022008') {
      localStorage.setItem('isLoggedIn', 'true');

      if (rememberMe) {
        localStorage.setItem('saved_email', normalizedEmail);
        localStorage.setItem('remember_me', 'true');
      } else {
        localStorage.removeItem('saved_email');
        localStorage.setItem('remember_me', 'false');
      }

      navigate('/home');
      return;
    }

    setErrorMsg('Неправильний емейл або пароль! Спробуйте ще раз.');
  };

  return (
    <div className="auth-wrapper">
      <button
        type="button"
        className="btn btn-outline-secondary theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'light' ? 'Увімкнути темну тему' : 'Увімкнути світлу тему'}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <div className="card auth-card border-0">
              <div className="card-body">
                <div className="text-center mb-4">
                  <div className="auth-badge mx-auto mb-3">🔐</div>
                  <h2 className="fw-bold mb-1">Вітаємо!</h2>
                  <p className="text-secondary mb-0">Будь ласка, увійдіть у свій акаунт</p>
                </div>

                {errorMsg && (
                  <div className="alert alert-danger py-2 mb-4" role="alert">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleLogin} className="needs-validation" noValidate>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">Емейл</label>
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
                    <label htmlFor="password" className="form-label fw-semibold">Пароль</label>
                    <div className="input-group input-group-lg">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className="form-control"
                        placeholder="Введіть пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Сховати пароль' : 'Показати пароль'}
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label text-secondary" htmlFor="rememberMe">
                      Запам'ятати мене
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg w-100">
                    Увійти
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
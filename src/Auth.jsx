import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (email === "daniakovtun2007@gmail.com" && password === "19022008") {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/home');
    } else {
      setErrorMsg('Неправильний емейл або пароль! Спробуйте ще раз.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Вітаємо!</h2>
          <p>Будь ласка, увійдіть у свій акаунт</p>
        </div>

        {errorMsg && <div className="error-alert">{errorMsg}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Емейл</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Введіть пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
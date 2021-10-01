import React from "react";
import AuthForm from "../AuthForm/AuthForm";

function Login({ onSubmit }) {
  return (
    <AuthForm
      title="Рады видеть!"
      buttonText="Войти"
      afterText="Ещё не зарегистрированы?"
      link="/signup"
      linkText="Регистрация"
      onSubmit={onSubmit}
    >
      <div className="auth__item">
      <label className="auth__label" htmlFor="email">
        E-mail
      </label>
      <input
        type="email"
        className="auth__input"
        id="email"
        name="email"
        placeholder="Email"
        // value={email || ''}
        required
        // onChange={handleEmailChange}
        minLength="4"
      />
      <span className="auth__error"></span>
      </div>
      <div className="auth__item">
      <label className="auth__label" htmlFor="password">
        Пароль
      </label>
      <input
        type="password"
        className="auth__input"
        id="password"
        name="password"
        placeholder="Пароль"
        // value={password || ''}
        required
        // onChange={handlePasswordChange}
        minLength="8"
      />
      <span className="auth__error"></span>
      </div>
    </AuthForm>
  );
}

export default Login;

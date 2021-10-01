import React from "react";
import AuthForm from "../AuthForm/AuthForm";

function Profile({ onSubmit }) {
  return (
    <AuthForm
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      afterText="Уже зарегистрированы?"
      link="/signin"
      linkText="Войти"
      onSubmit={onSubmit}
    >
      <div className="auth__item">
        <label className="auth__label" htmlFor="name">
          Имя
        </label>
        <input
          type="text"
          className="auth__input"
          id="name"
          name="name"
          placeholder="Email"
          // value={email || ''}
          required
          // onChange={handleEmailChange}
          minLength="2"
          maxLength="30"
        />
        <span className="auth__error"></span>
      </div>
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

export default Profile;

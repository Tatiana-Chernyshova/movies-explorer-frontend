import React from "react";
import { useForm } from "react-hook-form";
import AuthForm from "../AuthForm/AuthForm";

function Login({ onSubmit }) {
  const {
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange"
  });

  return (
    <AuthForm
      title="Рады видеть!"
      buttonText="Войти"
      afterText="Ещё не зарегистрированы?"
      link="/signup"
      linkText="Регистрация"
      onSubmit={onSubmit}
      isValid={isValid}
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
        {...register("email", { required: "Это обязательное поле" ,
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Неверный формат email",
        }})}
      />
      {errors.email && (
        <span className="auth__error">{errors.email.message}</span>
      )}
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
        {...register("password", {
          required: "Необходимо ввести пароль",
          minLength: {
            value: 8,
            message: "Минимальная длина пароля должна быть 8 символов",
          }
        })}
      />
      {errors.password && (
        <span className="auth__error">{errors.password.message}</span>
      )}
      </div>
    </AuthForm>
  );
}

export default Login;

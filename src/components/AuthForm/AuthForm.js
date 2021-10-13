import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./AuthForm.css";

function AuthForm({
  onSubmit,
  title,
  buttonText,
  afterText,
  link,
  linkText,
  registration,
  authMessage,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  return (
    <article className="auth__page">
      <form
        className="auth"
        name="auth"
        onSubmit={handleSubmit((data) => onSubmit(data))}
        noValidate
      >
        <h2 className="auth__heading">{title}</h2>
        <fieldset className="auth__input-container">
          {registration && (
            <div className="auth__item">
              <label className="auth__label" htmlFor="name">
                Имя
              </label>
              <input
                type="text"
                className="auth__input"
                id="name"
                name="name"
                placeholder="Имя"
                required
                {...register("name", {
                  required: "Необходимо ввести имя",
                  minLength: {
                    value: 2,
                    message: "Введите минимум 2 символа",
                  },
                  maxLength: {
                    value: 30,
                    message: "Максимальная длина имени - 30 символов",
                  },
                })}
              />
              {errors.name && (
                <span className="auth__error">{errors.name.message}</span>
              )}
            </div>
          )}
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
              required
              {...register("email", {
                required: "Это обязательное поле",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Неверный формат email",
                },
              })}
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
              required
              minLength="8"
              {...register("password", {
                required: "Необходимо ввести пароль",
                minLength: {
                  value: 8,
                  message: "Минимальная длина пароля должна быть 8 символов",
                },
              })}
            />
            {errors.password && (
              <span className="auth__error">{errors.password.message}</span>
            )}
          </div>
          {authMessage && <span className="auth__message">{authMessage}</span>}
          <button
            type="submit"
            className="auth__submit"
            aria-label="auth__submit"
            disabled={!isValid}
          >
            {buttonText}
          </button>
          <div className="auth__after">
            <p className="auth__text">{afterText}</p>
            <Link to={link} className="auth__link">
              {linkText}
            </Link>
          </div>
        </fieldset>
      </form>
    </article>
  );
}

export default AuthForm;

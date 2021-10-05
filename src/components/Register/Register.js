import React from "react";
import { useForm } from "react-hook-form";
import AuthForm from "../AuthForm/AuthForm";

function Profile({ onSubmit }) {
  const {
    register,
    // handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange"
  });


  return (
    <AuthForm
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      afterText="Уже зарегистрированы?"
      link="/signin"
      linkText="Войти"
      onSubmit={onSubmit}
      isValid={isValid}
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
          placeholder="Имя"
          // value={email || ''}
          required
          // onChange={handleEmailChange}
          // minLength="2"
          // maxLength="30"
          {...register("name", {
            required: "Необходимо ввести имя",
            minLength: {
              value: 2,
              message: "Введите минимум 2 символа",
            },
            maxLength: {
              value: 30,
              message: "Максимальная длина имени - 30 символов",
            }
          })}
        />
        {errors.name && (
          <span className="auth__error">{errors.name.message}</span>
        )}
        {/* /> */}
        {/* <span className="auth__error"></span> */}
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
          // minLength="4"
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
        {/* <span className="auth__error"></span> */}
      </div>
    </AuthForm>
  );
}

export default Profile;

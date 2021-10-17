import React from "react";
import AuthForm from "../AuthForm/AuthForm";

function Register({ onSubmit, authMessage }) {

  return (
    <AuthForm
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      afterText="Уже зарегистрированы?"
      link="/signin"
      linkText="Войти"
      onSubmit={onSubmit}
      registration={true}
      authMessage={authMessage}
    />
  );
}

export default Register;

import React from "react";
import AuthForm from "../AuthForm/AuthForm";

function Login({ onSubmit, authMessage }) {

  return (
    <AuthForm
      title="Рады видеть!"
      buttonText="Войти"
      afterText="Ещё не зарегистрированы?"
      link="/signup"
      linkText="Регистрация"
      onSubmit={onSubmit}
      registration={false}
      authMessage={authMessage}
    />
  );
}

export default Login;

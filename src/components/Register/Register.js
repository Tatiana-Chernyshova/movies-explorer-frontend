import React from "react";
import { useForm } from "react-hook-form";
import AuthForm from "../AuthForm/AuthForm";

function Register({ onSubmit }) {
  


  // const {
  //   register,
  //   // handleSubmit,
  //   formState: { errors, isValid },
  // } = useForm({
  //   mode: "onChange"
  // });


  return (
    <AuthForm
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      afterText="Уже зарегистрированы?"
      link="/signin"
      linkText="Войти"
      onSubmit={onSubmit}
      // isValid={isValid}
      registration={true}
    >
      
    </AuthForm>
  );
}

export default Register;

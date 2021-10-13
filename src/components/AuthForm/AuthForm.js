import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./AuthForm.css";

function AuthForm({
  onSubmit,
  title,
  // children,
  buttonText,
  afterText,
  link,
  linkText,
  registration,
  authMessage,
  // isValid,
}) {
//   const [name, setName] = React.useState("");
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");

  // const preloadedValues = {
  //   // name: {'' || name},
  //   email: "email",
  //   password: "pas"
  // }

  // function handleNameChange(evt) {
  //   setName(evt.target.value);
  // }

  // function handleEmailChange(evt) {
  //   setEmail(evt.target.value);
  // }

  // function handlePasswordChange(evt) {
  //   setPassword(evt.target.value);
  // }


  // function handleSubmitInputs (evt) {
  //   // evt.preventDefault();
  //   // console.log(evt);
  //   // if (name) {
  //   //   return 
  //     onSubmit(evt);
  // //   }
  // //   return onSubmit(password, email);
  // }


  // const handleSubmitInputs = (evt) => {
  //   // evt.preventDefault();
  //   // console.log(evt);
  //   if (name) {
  //     return onSubmit(password, email, name);
  //   }
  //   return onSubmit(password, email);
  // }

  // const onSubmitD = (data) => {
  //   console.log(data);
  //   // reset();
  // };

  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    // defaultValues: preloadedValues,
  });

  return (
    <article className="auth__page">
      <form className="auth" name="auth" onSubmit={handleSubmit((data) => onSubmit(data))} noValidate>
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
                // value={getValues("name") || ''}
                
                required
                // value={email || ''}
                // required
                // onChange={handleNameChange}
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
                  },
                })}
                // {setValue("name", "Bill")}
              />
              {errors.name && (
                <span className="auth__error">{errors.name.message}</span>
              )}
              {/* /> */}
              {/* <span className="auth__error"></span> */}
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
              // value={email || ''}
              required
              // onChange={handleEmailChange}
              // minLength="4"
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
              // value={password || ''}
              required
              // onChange={handlePasswordChange}
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
            {/* <span className="auth__error"></span> */}
          </div>
          {authMessage && (
              <span className="auth__message">{authMessage}</span>
            )}
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

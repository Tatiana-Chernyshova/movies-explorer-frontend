import React from "react";
import { Route } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Profile.css";

function Profile({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    // reset,
  } = useForm({
    mode: "onChange"
  });

  // const onSubmit = (data) => {
  //   console.log(data);
  //   reset();
  // };

  return (
    <Route path="/profile">
      <article className="profile__page">
        <form className="profile" name="profile" onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2 className="profile__heading">{`Привет, ${"Вла"}!`}</h2>
          <fieldset className="profile__input-container">
            <div className="profile__box">
              <label className="profile__label" htmlFor="name">
                Имя
              </label>
              <input
                type="text"
                className="profile__input"
                id="name"
                name="name"
                placeholder="Имя"
                // value={email || ''}
                // value="Владимир"
                // required
                // onChange={handleEmailChange}
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
                <span className="profile__error">{errors.name.message}</span>
              )}
            </div>
            <div className="profile__box">
              <label className="profile__label" htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                className="profile__input"
                id="email"
                name="email"
                placeholder="Email"
                // value={email || ''}
                // value="pochta@yandex.ru"
                // required
                // onChange={handleEmailChange}
                {...register("email", { required: "Это обязательное поле" ,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Неверный формат email",
                }})}
              />
              {errors.email && (
                <span className="profile__error">{errors.email.message}</span>
              )}
            </div>
            <div className="profile__buttons">
              <button className="profile__btn" 
              disabled={!isValid}
              >Редактировать</button>
              <button className="profile__btn profile__btn_red">
                Выйти из аккаунта
              </button>
            </div>
          </fieldset>
        </form>
      </article>
    </Route>
  );
}

export default Profile;

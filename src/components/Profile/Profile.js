import React from "react";
import { Route } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile({ onUpdateUser, onSignOut, authMessage }) {
  const {
    user: { name, email },
  } = React.useContext(CurrentUserContext);
  const preloadedValues = {
    name: name,
    email: email,
  };
  const {
    register,
    handleSubmit,
    control,
    	trigger,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: preloadedValues,
  });

  // console.log(	trigger())

  return (
    <Route path="/profile">
      <article className="profile__page">
        <form
          className="profile"
          name="profile"
          onSubmit={handleSubmit((data) => onUpdateUser(data))}
          noValidate
        >
          <h2 className="profile__heading">{`Привет, ${name}!`}</h2>
          <fieldset className="profile__input-container">
            <div className="profile__box">
              <label className="profile__label" htmlFor="name">
                Имя
              </label>

              <Controller
                control={control}
                name="name"
                render={() => (
                  <input
                    type="text"
                    className="profile__input"
                    id="name"
                    name="name"
                    placeholder="Имя"
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
                )}
              />

              {/* <input
                type="text"
                className="profile__input"
                id="name"
                name="name"
                placeholder="Имя"
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
              /> */}

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
                {...register("email", {
                  required: "Это обязательное поле",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Неверный формат email",
                  },
                })}
              />
              {errors.email && (
                <span className="profile__error">{errors.email.message}</span>
              )}
            </div>
            {authMessage && (
              <span className="profile__message">{authMessage}</span>
            )}
            <div className="profile__buttons">
              <button className="profile__btn" disabled={!isValid || !isDirty}>
                Редактировать
              </button>
              <button
                className="profile__btn profile__btn_red"
                onClick={onSignOut}
              >
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

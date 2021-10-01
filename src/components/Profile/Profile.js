import React from "react";
import { Route } from "react-router-dom";
import "./Profile.css";

function Profile({ onSubmit }) {
  return (
    <Route path="/profile">
      <article className="profile__page">
        <form className="profile" name="profile">
          <h2 className="profile__heading">Привет, Владимир!</h2>
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
                placeholder="Email"
                // value={email || ''}
                value="Владимир"
                required
                // onChange={handleEmailChange}
              />
              <span className="profile__error"></span>
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
                value="pochta@yandex.ru"
                required
                // onChange={handleEmailChange}
              />
              <span className="profile__error"></span>
            </div>
            <div className="profile__buttons">
              <button className="profile__btn">Редактировать</button>
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

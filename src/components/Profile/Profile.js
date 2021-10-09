import React from "react";
import { Route } from "react-router-dom";
import { useForm } from "react-hook-form";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import "./Profile.css";

function Profile({ onUpdateUser, userData, onSignOut }) {
  // const currentUser = React.useContext(CurrentUserContext);
  // const { name, email } = currentUser.user
  const { user: { name=50, email=60 } } = React.useContext(CurrentUserContext);
  
  // const { name, email } = currentUser
  // const [name, setName] = React.useState('');
  // console.log(name);
  

  const preloadedValues = {
    name: name,
    email: email
    // name: "name"
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    // reset,
  } = useForm({
    mode: "onChange",
    defaultValues: preloadedValues,
  });

  // const [currentUser, setCurrentUser]  = React.useState({ name: 'Алёша' });

  // const onSubmitD = (data) => {
  //   // console.log(data);
  //   // onUpdateUser(data);
  //   // reset();
  // };

  
//   React.useEffect(() => {
//     // setName(currentUser.user.name);
//     // setDescription(currentUser.about);
//     console.log(name);
//     // console.log(currentUser.user.name);
//   }, [currentUser]); 
//   // console.log(name)
// console.log(currentUser)
// console.log(userData)
// console.log(currentUser.user.email)

// console.log(name)
  return (
    <Route path="/profile">
      <article className="profile__page">
        <form className="profile" name="profile" 
        // onSubmit={handleSubmit(onSubmitD)}
        onSubmit={handleSubmit((data) => onUpdateUser(data))}
         noValidate>
          <h2 className="profile__heading">
            {/* {`Привет, ${name}!`} */}
            {/* {currentUser && currentUser.user.name} */}
            </h2>
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
                // value={currentUser.user.name || ''}
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
              <button className="profile__btn profile__btn_red" onClick={onSignOut}>
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

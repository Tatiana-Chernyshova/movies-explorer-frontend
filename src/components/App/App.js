// import React, { useState, useEffect } from "react";
import React, { useEffect } from "react";
import "./App.css";
// import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
// import { Route } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import api from "../../utils/MoviesApi.js";
import * as auth from "../../utils/MainApi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import ErrorPage from "../ErrorPage/ErrorPage";

import "../../vendor/normalize.css";
import "../../vendor/font.css";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  // const [currentUser, setCurrentUser] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState("Dkflbvbh");
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [token, setToken] = React.useState('');


  function handleLogin() {
    // setLoggedIn(true);
  }
  function handleIsBurgerMenuOpen() {
    setIsBurgerMenuOpen(true);
  }
  function closeAllPopups() {
    setIsBurgerMenuOpen(false);
  }

  function handleRegister(e) {
const {password, email, name} = e;
// console.log(password);
// console.log(email);
// console.log(name)

    auth.register(password, email, name)
        .then((res) => {
            // history.push('/singin');
            
            // setInfoTooltip({
            //     message: 'Вы успешно зарегистрировались!',
            //     image: infoTooltipSuccess
            // });
            // setInfoPopupOpen(true);
            console.log(res)
        })
        .catch((err) => {
          console.log(err)
            // setInfoTooltipFail();
            // setInfoPopupOpen(true);
        })
  }

  function handleLogin(e, token) {
    const {password, email} = e;
    // console.log(password);
    // console.log(email);
    // console.log(token);
    auth.login(password, email, token)
        .then((res) => {
          if (res) {
            localStorage.setItem('token', res.token)
            // setCurrentUserEmail(email);
            setLoggedIn(true);
            // history.push('/');
            // setInfoTooltip({
            //     message: 'Вы успешно авторизовались!',
            //     image: infoTooltipSuccess
            // });
            // setInfoPopupOpen(true);
        }
    })
    .catch(() => {
        // setInfoTooltipFail();
        // setInfoPopupOpen(true);
        })
  }

  function checkToken() {
    setToken(localStorage.getItem('token'));

    if (token) {
      // setToken(token);
      auth.getToken(token)
        .then(res => {
          // setCurrentUserEmail(res.email)
          setLoggedIn(true)
        })
        .catch(e => { console.log(e) }) 
    }
  }

  // function handleSignOut() {
  //   localStorage.removeItem('token')
  //   setLoggedIn(false);
  //   setCurrentUserEmail('');
  //   history.push('/signin');
  //   setToken("");
  // }

  React.useEffect(() => {
    if (loggedIn) {
      // history.push('/')
      // Promise.all([api.getUserData(), api.getCards()])
      // .then(([userData, cardsData]) => {
      //   setCurrentUser(userData);
      //   setCards(cardsData.reverse());
      // })
      // .catch(e => { console.log(e) })

      auth.getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(e => { console.log(e) })
    }
    
  // }, [loggedIn, history])
}, [loggedIn])

  React.useEffect(() => { 
    checkToken();
  }) 

  
  function allMovies() {
    api.getMovies()
      .then((moviesData) => {
        setMovies(moviesData);
    })
      .catch(e => { console.log(e) });
  }
  React.useEffect(() => {
    allMovies();
    // console.log(movies);
  }, 
  [isBurgerMenuOpen]
  )
// console.log(movies);

  useEffect(() => {});

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <div className="page__container">
        <Header
          isLoggin={loggedIn}
          onOpenBurger={handleIsBurgerMenuOpen}
          onCloseBurger={closeAllPopups}
          isBurgerOpen={isBurgerMenuOpen}
        />

        <Switch>
          <Route path="/signup">
            <Register
            onSubmit={handleRegister}
            />
          </Route>

          <Route path="/signin">
            <Login
            onSubmit={handleLogin}
            />
          </Route>

          <Route path="/profile">
            <Profile
            // onSubmit={handleLogin}
            userData={currentUser}
            />
          </Route>

          <Route path="/movies">
            <Movies
              movies={movies}
            // onSubmit={handleLogin}
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies
            // onSubmit={handleLogin}
            />
          </Route>

          <Route path="/error">
            <ErrorPage
            // onSubmit={handleRegister}
            />
          </Route>

          <Route path="/">
            <Main />
            <Footer />
          </Route>
        </Switch>

        <BurgerMenu isOpen={isBurgerMenuOpen} onCloseBurger={closeAllPopups}/>

        <Route path="/(movies|saved-movies)">
          <Footer />
        </Route>
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

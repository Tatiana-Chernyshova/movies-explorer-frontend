// import React, { useState, useEffect } from "react";
import React, { useEffect } from "react";
import "./App.css";
// import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
// import { Route } from "react-router-dom";
// import CurrentUserContext from "../../contexts/CurrentUserContext";
import api from "../../utils/MoviesApi.js";
// import * as api from "../../utils/api.js";
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
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);
  const [movies, setMovies] = React.useState([]);


  function handleLogin() {
    setLoggedIn(true);
  }
  function handleIsBurgerMenuOpen() {
    setIsBurgerMenuOpen(true);
  }
  function closeAllPopups() {
    setIsBurgerMenuOpen(false);
  }



  
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
            // onSubmit={handleRegister}
            />
          </Route>

          <Route path="/signin">
            <Login
            // onSubmit={handleLogin}
            />
          </Route>

          <Route path="/profile">
            <Profile
            // onSubmit={handleLogin}
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
  );
}

export default App;

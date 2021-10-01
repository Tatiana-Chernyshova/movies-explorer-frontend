import React, { useState, useEffect } from "react";
import "./App.css";
// import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
// import { Route } from "react-router-dom";
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

  function handleLogin() {
    setLoggedIn(true);
  }
  function handleIsBurgerMenuOpen() {
    setIsBurgerMenuOpen(true);
  }
  function closeAllPopups() {
    setIsBurgerMenuOpen(false);
  }
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

        <BurgerMenu isOpen={isBurgerMenuOpen} />

        <Route path="/(movies|saved-movies)">
          <Footer />
        </Route>
      </div>
    </div>
  );
}

export default App;

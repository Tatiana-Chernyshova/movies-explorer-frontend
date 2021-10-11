// import React, { useState, useEffect } from "react";
import React, { useEffect } from "react";
import "./App.css";
// import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Route, Switch, useHistory } from "react-router-dom";
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
  const [loggedIn, setLoggedIn] = React.useState(true);
  // const [currentUser, setCurrentUser] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const history = useHistory();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  // const [findMovies, setFindMovies] = React.useState([]);
  const [token, setToken] = React.useState("");
  // const [earch, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchMoviesResponse, setSearchMoviesResponse] = React.useState("");

  // function handleLogin() {
  //   // setLoggedIn(true);
  // }
  function handleIsBurgerMenuOpen() {
    setIsBurgerMenuOpen(true);
  }
  function closeAllPopups() {
    setIsBurgerMenuOpen(false);
  }
  function filterItems(search) {
    const movies = JSON.parse(localStorage.getItem("movies"));
    console.log(movies);
    return movies.filter(function (elem) {
      if (elem.country === search || elem.nameRU === search) {
        return true;
      } else {
        return false;
      }
    });
    // })
  }
  // filterItems(search)

  // function handleUpdateUser(el) {
  //   const {email, name} = el;
  //   auth.setUserData(el)
  //     .then(res => {
  //       setCurrentUser(res);
  //       closeAllPopups();
  //     })
  //     .catch(e => { console.log(e) })
  // }

  function handleUpdateUser(el) {
    const { email, name } = el;
    auth
      .setUserData(email, name)
      .then((res) => {
        console.log(res);
        setCurrentUser({ user: res });
        // closeAllPopups();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleRegister(e) {
    const { password, email, name } = e;
    auth
      .register(password, email, name)
      .then((res) => {
        history.push("/singin");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        // setInfoTooltipFail();
        // setInfoPopupOpen(true);
      });
  }

  function handleLogin(e, token) {
    const { password, email } = e;
    console.log(token);
    auth
      .login(password, email, token)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch(() => {
        // setInfoTooltipFail();
        // setInfoPopupOpen(true);
      });
  }

  function checkToken() {
    setToken(localStorage.getItem("token"));

    if (token) {
      setToken(token);
      auth
        .getToken(token)
        .then((res) => {
          // setCurrentUserEmail(res.email)
          setLoggedIn(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    // localStorage.removeItem('filteredMovies');
    localStorage.removeItem("allMovies");
    setLoggedIn(false);
    setCurrentUser({});
    history.push("/signin");
    setToken("");
    setSearchMoviesResponse("");
    setFindMovies([]);
    setMovies([]);
  }

  React.useEffect(() => {
    if (loggedIn) {
      // history.push('/movies')
      // Promise.all([api.getUserData(), api.getCards()])
      // .then(([userData, cardsData]) => {
      //   setCurrentUser(userData);
      //   setCards(cardsData.reverse());
      // })
      // .catch(e => { console.log(e) })
      // allMovies();
      auth
        .getUserData()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    // }, [loggedIn, history])
  }, [loggedIn]);

  React.useEffect(() => {
    checkToken();
  });

  function allMovies() {
    setIsLoading(true);
    api
      .getMovies()
      .then((moviesData) => {
        const allFilms = moviesData.map((obj) => {
          return {
            country: obj.country ? obj.country : "none",
            director: obj.director ? obj.director : "none",
            duration: obj.duration,
            year: obj.year ? obj.year : 0,
            description: obj.description ? obj.description : "none",
            image: obj.image ? obj.image : "none",
            trailerLink: obj.trailerLink,
            thumbnail: obj.thumbnail ? obj.thumbnail : "none",
            movieId: obj.movieId,
            nameRU: obj.nameRU ? obj.nameRU.trim() : obj.nameEN.trim(),
            nameEN: obj.nameEN ? obj.nameEN.trim() : obj.nameRU.trim(),
          };
        });
        setMovies(allFilms);
        localStorage.setItem("allMovies", JSON.stringify(allFilms));
      })
      .catch((e) => {
        setSearchMoviesResponse(
          `Во время запроса произошла ошибка. 
          Возможно, проблема с соединением или сервер недоступен. 
          Подождите немного и попробуйте ещё раз`
        );
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function searchMovies(movies, query) {
    // setSearchMoviesResponse('')
    const result = movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase()) ||
        movie.country.toLowerCase().includes(query.toLowerCase()) ||
        movie.description.toLowerCase().includes(query.toLowerCase())
      );
    });
    if (result.length === 0) {
      setSearchMoviesResponse("Ничего не найдено");
    }
    return result;
  }

  function selectShortMovies(movies) {
    const shortMovies = movies.filter(
        (movie) => movie.duration <= 40
    );
    return shortMovies;
}

  // const [findMovies, setFindMovies] = React.useState(
  //   JSON.parse(localStorage.getItem("findMovies"))
  // );
  const [findMovies, setFindMovies] = React.useState([]);

  function submitSearch(query) {
    if (!query) {
      localStorage.removeItem("findMovies")
      // setFindMovies([]);
      setSearchMoviesResponse("Нужно ввести ключевое слово");
      return
    }
    setSearchMoviesResponse("")
    allMovies();
    setTimeout(() => setIsLoading(false), 500);

    setFindMovies(searchMovies(movies, query));
    // localStorage.setItem("findMovies", JSON.stringify(findMovies));
    localStorage.setItem("findMovies", JSON.stringify(searchMovies(movies, query)));
    // if (query.length === 0) {
    //   setSearchMoviesResponse("");
    //   setFindMovies([]);
    //   console.log("PUSTO");
    // }
  }
//  console.log(searchMoviesResponse)
  function handeleClickLike(movie) {
    console.log(movie);
    // auth
    //   .createMovie({ movie })
    //   .then((userData) => {
    //     // setCurrentUser(userData);
    //     console.log(userData);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }
  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("allMovies"));
    // console.log("allMovies")
    if (movies) {
      setMovies(movies);
        const searchResult = JSON.parse(
            localStorage.getItem("findMovies")
        );
        if (searchResult) {
          // setFindMovies([]);
          setFindMovies(searchResult);
        }
    } else {
      allMovies();
      // setFindMovies([]);
    }
}, [loggedIn]);
  // useEffect(() => {
  //   // setFindMovies([]);
  //   localStorage.setItem("findMovies", JSON.stringify(findMovies));
  // }, [findMovies]);

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
              <Register onSubmit={handleRegister} />
            </Route>

            <Route path="/signin">
              <Login onSubmit={handleLogin} />
            </Route>

            <Route path="/profile">
              <Profile
                // onSubmit={handleLogin}
                userData={currentUser}
                onUpdateUser={handleUpdateUser}
                onSignOut={handleSignOut}
              />
            </Route>

            <Route path="/movies">
              <Movies
                findMovies={findMovies}
                // setSearch={setSearch}
                onSubmitSearch={submitSearch}
                isLoading={isLoading}
                handeleClickLike={handeleClickLike}
                searchMoviesResponse={searchMoviesResponse}
                selectShortMovies={selectShortMovies}
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

          <BurgerMenu
            isOpen={isBurgerMenuOpen}
            onCloseBurger={closeAllPopups}
          />

          <Route path="/(movies|saved-movies)">
            <Footer />
          </Route>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

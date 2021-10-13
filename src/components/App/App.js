// import React, { useState, useEffect } from "react";
import React, { useEffect } from "react";
import "./App.css";
// import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
// import { Route } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import api from "../../utils/MoviesApi.js";
import * as auth from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute";
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
  const [currentUser, setCurrentUser] = React.useState({});
  const history = useHistory();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [saveMovies, setSaveMovies] = React.useState([]);
  // const [findMovies, setFindMovies] = React.useState([]);
  const [token, setToken] = React.useState("");
  // const [earch, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchMoviesResponse, setSearchMoviesResponse] = React.useState("");
  const [findMovies, setFindMovies] = React.useState([]);
  // function handleLogin() {
  //   // setLoggedIn(true);
  // }
  function handleIsBurgerMenuOpen() {
    setIsBurgerMenuOpen(true);
  }
  function closeAllPopups() {
    setIsBurgerMenuOpen(false);
  }
  // function filterItems(search) {
  //   const movies = JSON.parse(localStorage.getItem("movies"));
  //   console.log(movies);
  //   return movies.filter(function (elem) {
  //     if (elem.country === search || elem.nameRU === search) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  //   // })
  // }
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
        setAuthMessage('Данные успешно изменены');
        setTimeout(() => setAuthMessage(''), 1000);
        
        // closeAllPopups();
      })
      .catch((err) => {
        if (err === 400 || err === 401) {
          setAuthMessage('Переданы некорректные данные при создании пользователя');
          setTimeout(() => setAuthMessage(''), 1000);
          // console.log(err);
        } else if (err === 409) {
          setAuthMessage('Данный email уже зарегистрирован');
          setTimeout(() => setAuthMessage(''), 1000);
          // console.log(err);
        } else {
          setAuthMessage('На сервере произошла ошибка')
          setTimeout(() => setAuthMessage(''), 1000);
          // console.log(err);
        }
      });
  }

  function handleRegister(e) {
    const { password, email, name } = e;
    auth
      .register(password, email, name)
      .then((res) => {
        // const user = {password, email}
        // history.push("/singin");
        // const { user } = res;
        // console.log(user);
        // console.log(email);
        // console.log(name);
        // console.log(user);
        handleLogin({ password, email }, token)
      })
      // .catch((err) => {
      //   console.log(err);
      //   // setInfoTooltipFail();
      //   // setInfoPopupOpen(true);
      // });
      .catch(err => {
        if (err === 400 || err === 401) {
          setAuthMessage('Переданы некорректные данные при создании пользователя');
          setTimeout(() => setAuthMessage(''), 1000);
          // console.log(err);
        } else if (err === 409) {
          setAuthMessage('Данный email уже зарегистрирован');
          setTimeout(() => setAuthMessage(''), 1000);
          // console.log(err);
        } else {
          setAuthMessage('На сервере произошла ошибка');
          setTimeout(() => setAuthMessage(''), 1000);
          // console.log(err);
        }
      })
  }

  function handleLogin({ password, email }, token) {
    // const { password, email } = e;
    // console.log(token);
    auth
      .login(password, email, token)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        if (err === 401) {
          setAuthMessage('Неправильные почта или пароль');
          setTimeout(() => setAuthMessage(''), 1000);
          // console.log(err);
        } else {
          setAuthMessage('На сервере произошла ошибка');
          setTimeout(() => setAuthMessage(''), 1000);
          // console.log(err);
        }
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
          // console.log(res);
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
    history.push("/");
    setToken("");
    setSearchMoviesResponse("");
    setFindMovies([]);
    setMovies([]);
    setSaveMovies([]);
    localStorage.removeItem("findMovies");
    localStorage.removeItem("saveMovies");
  }

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
            image: `https://api.nomoreparties.co${obj.image.url}`,
            trailer: obj.trailerLink ? obj.trailerLink : `https://www.youtube.com/`,
            nameRU: obj.nameRU ? obj.nameRU.trim() : obj.nameEN.trim(),
            nameEN: obj.nameEN ? obj.nameEN.trim() : obj.nameRU.trim(),
            thumbnail: `https://api.nomoreparties.co${obj.image.formats.thumbnail.url}`,
            movieId: obj.id,
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
    const shortMovies = movies.filter((movie) => movie.duration <= 40);
    return shortMovies;
  }

  // const [findMovies, setFindMovies] = React.useState(
  //   JSON.parse(localStorage.getItem("findMovies"))
  // );


  function submitSearch(query) {
    if (!query) {
      localStorage.removeItem("findMovies");
      // setFindMovies([]);
      setSearchMoviesResponse("Нужно ввести ключевое слово");
      return;
    }
    setSearchMoviesResponse("");
    allMovies();
    setTimeout(() => setIsLoading(false), 500);

    setFindMovies(searchMovies(movies, query));
    // localStorage.setItem("findMovies", JSON.stringify(findMovies));
    localStorage.setItem(
      "findMovies",
      JSON.stringify(searchMovies(movies, query))
    );
    // if (query.length === 0) {
    //   setSearchMoviesResponse("");
    //   setFindMovies([]);
    //   console.log("PUSTO");
    // }
  }

  function submitSaveSearch(query) {
    setTimeout(() => setIsLoading(false), 500);
    setSaveMovies(searchMovies(saveMovies, query));
  }

  function savedMovies() {
    auth
      .getMovies(token)
      .then((data) => {
        const { movie } = data;
        setSaveMovies(movie);
        localStorage.setItem("saveMovies", JSON.stringify(movie));
      })
      .catch((e) => {
        console.log(e);
        setSearchMoviesResponse(
          `Во время запроса произошла ошибка. 
          Возможно, проблема с соединением или сервер недоступен. 
          Подождите немного и попробуйте ещё раз`
        );
      });
  }

  function addSavedMovies(movie) {
    // console.log(movie);
    auth
      .createMovie(movie)
      .then((res) => {
        // const newSavedMovie = res.newMovie;
        setSaveMovies([...saveMovies, res]);
        // console.log(res);
        // console.log(newMovie);
        // setSaveMovies([...saveMovies, newMovie]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function removeSavedMovies(movie) {
    const movieId = saveMovies.find((el) => el.movieId === movie.movieId)._id;
    auth
      .deleteMovie(movieId)
      .then(() => {
        savedMovies();
        // console.log(res.message);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // requestAnswer
  const [authMessage, setAuthMessage] = React.useState("");


  function toggleMovieLike(movie, isLiked) {
    isLiked ? removeSavedMovies(movie) : addSavedMovies(movie);
  }

  function checkSavedMovie(movie) {
    return saveMovies.some(
      (film) => film.movieId === movie.movieId
      //   (film) => film.movieId === movie.movieId 
      // (film) => film.movieId === movie.movieId
      //   (film) => film.movieId === movie.movieId 
      // (film) => film.movieId === movie.movieId
      //   (film) => film.movieId === movie.movieId 
      // (film) => film.movieId === movie.movieId
    );
  }

  // handeleSavedMovie();
  // setSaveMovies(data);
  //       // setCurrentUser(userData);
  // console.log(saveMovies);
  //   useEffect(() => {
  //     const movies = JSON.parse(localStorage.getItem("allMovies"));
  //     // console.log("allMovies")
  //     if (movies) {
  //       setMovies(movies);
  //         const searchResult = JSON.parse(
  //             localStorage.getItem("findMovies")
  //         );
  //         if (searchResult) {
  //           // setFindMovies([]);
  //           setFindMovies(searchResult);
  //         }
  //     } else {
  //       allMovies();
  //       // setFindMovies([]);
  //     }
  // }, [loggedIn]);
  useEffect(() => {
    // const token = localStorage.getItem("jwt");
    // if (!token) {
    //     return;
    // } else {
    //     Promise.all([getUser(token), getFavoriteMovies()])
    //         .then(([userData, favoriteMovieData]) => {
    //             setCurrentUser({
    //                 ...currentUser,
    //                 name: userData.name,
    //                 email: userData.email,
    //             });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    } else {
      // savedMovies() {
      //   auth
      //     .getMovies
      // history.push("/movies");
      Promise.all([auth.getUserData(), savedMovies()])
        .then(([userData, savedMoviesData]) => {
          setCurrentUser(userData);
          // setCards(cardsData.reverse());
        })
        .catch((e) => {
          console.log(e);
        });
      // allMovies();
    }
    // auth
    // .getUserData()
    // .then((userData) => {
    //   setCurrentUser(userData);
    // })
    // .catch((e) => {
    //   console.log(e);
    // });
  }, [loggedIn]);

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

      const movies = JSON.parse(localStorage.getItem("allMovies"));
      // console.log("allMovies")
      if (movies) {
        savedMovies();
        setMovies(movies);
        const searchResult = JSON.parse(localStorage.getItem("findMovies"));
        if (searchResult) {
          // setFindMovies([]);
          setFindMovies(searchResult);
        }
      } else {
        allMovies();
        // setFindMovies([]);
      }
    }

    // }, [loggedIn, history])
  }, [loggedIn]);

  // React.useEffect(() => {
  //   // setAuthMessage('');
  // },[handleUpdateUser, handleLogin, handleRegister]);

  React.useEffect(() => {
    checkToken();
  });

  // useEffect(() => {
  //   // setFindMovies([]);
  //   localStorage.setItem("findMovies", JSON.stringify(findMovies));
  // }, [findMovies]);
  useEffect(() => { });

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
              {loggedIn ? <Redirect to='/movies' /> :
                <Register onSubmit={handleRegister} authMessage={authMessage} />
              }
            </Route>

            <Route path="/signin">
              {loggedIn ? <Redirect to='/movies' /> :
                <Login onSubmit={handleLogin} authMessage={authMessage} />
              }
            </Route>

            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              userData={currentUser}
              onUpdateUser={handleUpdateUser}
              onSignOut={handleSignOut}
              authMessage={authMessage}
            />

            {/* <Route path="/profile">
              <Profile
                // onSubmit={handleLogin}
                userData={currentUser}
                onUpdateUser={handleUpdateUser}
                onSignOut={handleSignOut}
              />
            </Route> */}

            {/* <Route path="/movies">
              <Movies
                movies={findMovies}
                // setSearch={setSearch}
                onSubmitSearch={submitSearch}
                isLoading={isLoading}
                toggleMovieLike={toggleMovieLike}
                checkSavedMovie={checkSavedMovie}
                searchMoviesResponse={searchMoviesResponse}
                selectShortMovies={selectShortMovies}


              // onSubmit={handleLogin}
              />
            </Route> */}

            <ProtectedRoute
              path="/movies"
              component={Movies}
              loggedIn={loggedIn}
              movies={findMovies}
              onSubmitSearch={submitSearch}
              isLoading={isLoading}
              toggleMovieLike={toggleMovieLike}
              checkSavedMovie={checkSavedMovie}
              searchMoviesResponse={searchMoviesResponse}
              selectShortMovies={selectShortMovies}
            />

            {/* <Route path="/saved-movies">
              <SavedMovies
                // onSubmit={handleLogin}
                // handeleSavedMovie={handeleSavedMovie}
                movies={saveMovies}
                onSubmitSearch={submitSaveSearch}
                isLoading={isLoading}
                toggleMovieLike={toggleMovieLike}
                checkSavedMovie={checkSavedMovie}
                searchMoviesResponse={searchMoviesResponse}
                selectShortMovies={selectShortMovies}

              />
            </Route> */}

            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
              movies={saveMovies}
              onSubmitSearch={submitSaveSearch}
              isLoading={isLoading}
              toggleMovieLike={toggleMovieLike}
              checkSavedMovie={checkSavedMovie}
              searchMoviesResponse={searchMoviesResponse}
              selectShortMovies={selectShortMovies}
            />

            {/* <Route path="/error">
              <ErrorPage
              // onSubmit={handleRegister}
              />
            </Route> */}

            <Route exact path="/">
              <Main />
              <Footer />
            </Route>
            {/* </Switch> */}
            <Route path="*">
              {loggedIn ? <ErrorPage /> : <Redirect to='/' />}
              {/* <ErrorPage /> */}
            </Route>


            <Route path="/(movies|saved-movies)">
              <Footer />
            </Route>
            {/* </Switch> */}
            {/* <Route path="*">
              <ErrorPage
              // onSubmit={handleRegister}
              />
            </Route> */}
            {/* <Route path="*">
              <ErrorPage />
            </Route> */}
          </Switch>
          <BurgerMenu
            isOpen={isBurgerMenuOpen}
            onCloseBurger={closeAllPopups}
          />
          {/* <Route>
            {loggedIn ? <Redirect to='*' /> : <Redirect to='/error' />}
          </Route> */}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

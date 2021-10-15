import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import "./App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import api from "../../utils/MoviesApi.js";
import {
  register,
  login,
  getToken,
  getUserData,
  setUserData,
  getMovies,
  createMovie,
  deleteMovie,
} from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
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
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  // const [saveMovies, setSaveMovies] = useState([]);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchMoviesResponse, setSearchMoviesResponse] = useState("");
  const [findMovies, setFindMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [saveFilteredMovies, setSaveFilteredMovies] = useState([]);
  const [authMessage, setAuthMessage] = useState("");

  function handleIsBurgerMenuOpen() {
    setIsBurgerMenuOpen(true);
  }
  function closeBurgerMenu() {
    setIsBurgerMenuOpen(false);
  }

  function handleRegister(e) {
    const { password, email, name } = e;
    register(password, email, name)
      .then((res) => {
        handleLogin({ password, email }, token);
      })
      .catch((err) => {
        if (err === 400 || err === 401) {
          setAuthMessage(
            "Переданы некорректные данные при создании пользователя"
          );
          setTimeout(() => setAuthMessage(""), 1000);
        } else if (err === 409) {
          setAuthMessage("Данный email уже зарегистрирован");
          setTimeout(() => setAuthMessage(""), 1000);
        } else {
          setAuthMessage("На сервере произошла ошибка");
          setTimeout(() => setAuthMessage(""), 1000);
        }
      });
  }

  function handleLogin({ password, email }, token) {
    login(password, email, token)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        if (err === 401) {
          setAuthMessage("Неправильные почта или пароль");
          setTimeout(() => setAuthMessage(""), 1000);
        } else {
          setAuthMessage("На сервере произошла ошибка");
          setTimeout(() => setAuthMessage(""), 1000);
        }
      });
  }
  function handleUpdateUser(el) {
    const { email, name } = el;
    setUserData(email, name)
      .then((res) => {
        setCurrentUser({ user: res });
        setAuthMessage("Данные успешно изменены");
        setTimeout(() => setAuthMessage(""), 1000);
      })
      .catch((err) => {
        if (err === 400 || err === 401) {
          setAuthMessage(
            "Переданы некорректные данные при создании пользователя"
          );
          setTimeout(() => setAuthMessage(""), 1000);
        } else if (err === 409) {
          setAuthMessage("Данный email уже зарегистрирован");
          setTimeout(() => setAuthMessage(""), 1000);
        } else {
          setAuthMessage("На сервере произошла ошибка");
          setTimeout(() => setAuthMessage(""), 1000);
        }
      });
  }

  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      getToken(token)
        .then((res) => {
          setLoggedIn(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  function handleSignOut() {
    setLoggedIn(false);
    history.push("/");
    localStorage.removeItem("token");
    localStorage.removeItem("allMovies");
    localStorage.removeItem("findMovies");
    localStorage.removeItem("saveMovies");
    setCurrentUser({});
    setToken("");
    setMovies([]);
    setFindMovies([]);
    setSaveMovies([]);
    setSearchMoviesResponse("");
  }

  // function allMovies() {
  //   setIsLoading(true);
  //   api
  //     .getMovies()
  //     .then((moviesData) => {
  //       const allFilms = moviesData.map((obj) => {
  //         return {
  //           country: obj.country ? obj.country : "none",
  //           director: obj.director ? obj.director : "none",
  //           duration: obj.duration,
  //           year: obj.year ? obj.year : 0,
  //           description: obj.description ? obj.description : "none",
  //           image: `https://api.nomoreparties.co${obj.image.url}`,
  //           trailer: obj.trailerLink
  //             ? obj.trailerLink
  //             : `https://www.youtube.com/`,
  //           nameRU: obj.nameRU ? obj.nameRU.trim() : obj.nameEN.trim(),
  //           nameEN: obj.nameEN ? obj.nameEN.trim() : obj.nameRU.trim(),
  //           thumbnail: `https://api.nomoreparties.co${obj.image.formats.thumbnail.url}`,
  //           movieId: obj.id,
  //         };
  //       });
  //       setMovies(allFilms);
  //       localStorage.setItem("allMovies", JSON.stringify(allFilms));
  //     })
  //     .catch((e) => {
  //       setSearchMoviesResponse(
  //         `Во время запроса произошла ошибка.
  //         Возможно, проблема с соединением или сервер недоступен.
  //         Подождите немного и попробуйте ещё раз`
  //       );
  //       console.log(e);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }

  function searchMovies(movies, query) {
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

  // function submitSearch(query) {
  //   if (!query) {
  //     localStorage.removeItem("findMovies");
  //     setSearchMoviesResponse("Нужно ввести ключевое слово");
  //     return;
  //   }
  //   setSearchMoviesResponse("");
  //   // allMovies();
  //   setTimeout(() => setIsLoading(false), 500);
  //   setFindMovies(searchMovies(movies, query));
  //   localStorage.setItem(
  //     "findMovies",
  //     JSON.stringify(searchMovies(movies, query))
  //   );
  // }

  function submitSearch(query) {
    if (query) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      if (movies) {
        setTimeout(() => setIsLoading(false), 500);
        setFindMovies(searchMovies(movies, query));
        localStorage.setItem(
          "findMovies",
          JSON.stringify(searchMovies(movies, query))
        );
      } else {
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
                trailer: obj.trailerLink
                  ? obj.trailerLink
                  : `https://www.youtube.com/`,
                nameRU: obj.nameRU ? obj.nameRU.trim() : obj.nameEN.trim(),
                nameEN: obj.nameEN ? obj.nameEN.trim() : obj.nameRU.trim(),
                thumbnail: `https://api.nomoreparties.co${obj.image.formats.thumbnail.url}`,
                movieId: obj.id,
              };
            });
            setMovies(allFilms);
            localStorage.setItem("allMovies", JSON.stringify(allFilms));
            setFindMovies(searchMovies(allFilms, query));
            localStorage.setItem(
              "findMovies",
              JSON.stringify(searchMovies(allFilms, query))
            );
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
    } else {
      console.log("NOTquery");
      localStorage.removeItem("findMovies");
      setSearchMoviesResponse("Нужно ввести ключевое слово");
      return;
    }
  }

  // function submitSearch(query) {
  //   if (query) {
  //     const movies = JSON.parse(localStorage.getItem("allMovies"));
  //     if (movies) {
  //     setTimeout(() => setIsLoading(false), 500);
  //     setFindMovies(searchMovies(movies, query));
  //     localStorage.setItem(
  //       "findMovies",
  //       JSON.stringify(searchMovies(movies, query))
  //     );
  //     }

  //       // allMovies();
  //     //   // const jjj = JSON.parse(localStorage.getItem("allMovies"));
  //     //   // setMovies(jjj);
  //     //   setTimeout(
  //     //     () => console.log(JSON.parse(localStorage.getItem("allMovies"))),
  //     //     1000
  //     //   );
  //     // }
  //     // savedMovies();

  //     // const moviesd = JSON.parse(localStorage.getItem("allMovies"));
  //     // setMovies(moviesd);
  //     // const searchResult = JSON.parse(localStorage.getItem("findMovies"));
  //     // if (searchResult) {
  //     //   setFindMovies(searchResult);
  //     // } else {
  //     // console.log("query");

  //     // }
  //     // }
  //     // else {
  //     // allMovies()
  //     // setSearchMoviesResponse("");

  //     else {
  //       setIsLoading(true);
  //       api
  //         .getMovies()
  //         .then((moviesData) => {
  //           const allFilms = moviesData.map((obj) => {
  //             return {
  //               country: obj.country ? obj.country : "none",
  //               director: obj.director ? obj.director : "none",
  //               duration: obj.duration,
  //               year: obj.year ? obj.year : 0,
  //               description: obj.description ? obj.description : "none",
  //               image: `https://api.nomoreparties.co${obj.image.url}`,
  //               trailer: obj.trailerLink
  //                 ? obj.trailerLink
  //                 : `https://www.youtube.com/`,
  //               nameRU: obj.nameRU ? obj.nameRU.trim() : obj.nameEN.trim(),
  //               nameEN: obj.nameEN ? obj.nameEN.trim() : obj.nameRU.trim(),
  //               thumbnail: `https://api.nomoreparties.co${obj.image.formats.thumbnail.url}`,
  //               movieId: obj.id,
  //             };
  //           });
  //           setMovies(allFilms);
  //           localStorage.setItem("allMovies", JSON.stringify(allFilms));
  //           // setFindMovies(searchMovies(movies, query));
  //           // localStorage.setItem(
  //           //   "findMovies",
  //           //   JSON.stringify(searchMovies(movies, query))
  //           // );
  //         })
  //         .catch((e) => {
  //           setSearchMoviesResponse(
  //             `Во время запроса произошла ошибка.
  //             Возможно, проблема с соединением или сервер недоступен.
  //             Подождите немного и попробуйте ещё раз`
  //           );
  //           console.log(e);
  //         })
  //         .finally(() => {
  //           setIsLoading(false);
  //         });
  //     // setTimeout(() => setIsLoading(false), 500);
  //     // console.log(movies);
  //     // setFindMovies(searchMovies(movies, query));
  //     // localStorage.setItem(
  //     //   "findMovies",
  //     //   JSON.stringify(searchMovies(movies, query))
  //     // );
  //     }
  //     // }

  //     // console.log("query");
  //     // setSearchMoviesResponse("");
  //     // // allMovies();
  //     // setTimeout(() => setIsLoading(false), 500);
  //     // setFindMovies(searchMovies(movies, query));
  //     // localStorage.setItem(
  //     //   "findMovies",
  //     //   JSON.stringify(searchMovies(movies, query))
  //     // );
  //   } else {
  //     console.log("NOTquery");
  //     localStorage.removeItem("findMovies");
  //     setSearchMoviesResponse("Нужно ввести ключевое слово");
  //     return;
  //   }
  // }

  // setSavedFilteredMovies
  function submitSaveSearch(query) {
    setTimeout(() => setIsLoading(false), 500);
    setSaveFilteredMovies(searchMovies(saveMovies, query));
  }

  function savedMovies() {
    getMovies(token)
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
    createMovie(movie)
      .then((res) => {
        setSaveMovies([...saveMovies, res]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function removeSavedMovies(movie) {
    const movieId = saveMovies.find((el) => el.movieId === movie.movieId)._id;
    deleteMovie(movieId)
      .then(() => {
        const newSavedMovies = saveMovies.filter(
          (deleteEl) => deleteEl._id !== movieId
        );
        setSaveMovies(newSavedMovies);
        localStorage.setItem("saveMovies", JSON.stringify(newSavedMovies));
        const newSavedMoviesFilter = saveFilteredMovies.filter(
          (deleteEl) => deleteEl._id !== movieId
        );
        setSaveFilteredMovies(newSavedMoviesFilter);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function toggleMovieLike(movie, isLiked) {
    isLiked ? removeSavedMovies(movie) : addSavedMovies(movie);
  }

  function checkSavedMovie(movie) {
    return saveMovies.some((film) => film.movieId === movie.movieId);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // console.log(token)
      return;
    } else {
      // getUserData()
      //   .then((userData) => {
      //     setCurrentUser(userData);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });

      Promise.all([getUserData(), savedMovies()])
        .then(([userData, savedMoviesData]) => {
          setCurrentUser(userData);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [loggedIn, history]);
  // console.log(findMovies);

  // useEffect(() => {
  //   if (loggedIn) {
  //     const movies = JSON.parse(localStorage.getItem("allMovies"));
  //     if (movies) {
  //       // savedMovies();
  //       setMovies(movies);
  //       const searchResult = JSON.parse(localStorage.getItem("findMovies"));
  //       if (searchResult) {
  //         setFindMovies(searchResult);
  //       }
  //     } else {
  //       allMovies();
  //     }
  //   }
  // }, [loggedIn]);

  // useEffect(() => {
  //   const saveFilms = JSON.parse(localStorage.getItem("saveMovies"));
  //   if (saveFilms) {
  //     setSaveMovies(JSON.parse(localStorage.getItem("saveMovies")));
  //   } return
  // }, [loggedIn]);
  useEffect(() => {
    const findFilms = JSON.parse(localStorage.getItem("findMovies"));
    if (findFilms) {
      setFindMovies(JSON.parse(localStorage.getItem("findMovies")));
    }
    return;
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header
            isLoggin={loggedIn}
            onOpenBurger={handleIsBurgerMenuOpen}
            onCloseBurger={closeBurgerMenu}
            isBurgerOpen={isBurgerMenuOpen}
          />

          <Switch>
            <Route path="/signup">
              {loggedIn ? (
                <Redirect to="/movies" />
              ) : (
                <Register onSubmit={handleRegister} authMessage={authMessage} />
              )}
            </Route>

            <Route path="/signin">
              {loggedIn ? (
                <Redirect to="/movies" />
              ) : (
                <Login onSubmit={handleLogin} authMessage={authMessage} />
              )}
            </Route>

            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              onUpdateUser={handleUpdateUser}
              onSignOut={handleSignOut}
              authMessage={authMessage}
            />

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

            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
              movies={saveMovies}
              saveFilteredMovies={saveFilteredMovies}
              onSubmitSearch={submitSaveSearch}
              isLoading={isLoading}
              toggleMovieLike={toggleMovieLike}
              checkSavedMovie={checkSavedMovie}
              searchMoviesResponse={searchMoviesResponse}
              selectShortMovies={selectShortMovies}
            />

            <Route exact path="/">
              <Main />
              <Footer />
            </Route>

            <Route path="*">{loggedIn && <ErrorPage />}</Route>
          </Switch>

          <Route path="/(movies|saved-movies)">
            <Footer />
          </Route>

          <BurgerMenu
            isOpen={isBurgerMenuOpen}
            onCloseBurger={closeBurgerMenu}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

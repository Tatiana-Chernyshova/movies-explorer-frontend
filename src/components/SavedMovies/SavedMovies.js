import "./SavedMovies.css";
import { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  movies,
  onSubmitSearch,
  isLoading,
  toggleMovieLike,
  checkSavedMovie,
  searchMoviesResponse,
  selectShortMovies,
  saveFilteredMovies,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [shortMovies, setShortMovies] = useState([]);

  useEffect(() => {
    if (isChecked) {
      setShortMovies(selectShortMovies(movies));
    }
  }, [isChecked, onSubmitSearch]);

  return (
    <>
      <SearchForm onSubmitSearch={onSubmitSearch} setIsChecked={setIsChecked} />
      {isLoading && <Preloader />}
      {searchMoviesResponse && (
        <p className="movies__response">{searchMoviesResponse}</p>
      )}
      {isChecked && movies.length !== 0 && shortMovies.length === 0 && (
        <p className="movies__response">Короткометражных фильмов не найдено</p>
      )}
      {!isLoading &&
        !searchMoviesResponse &&
        saveFilteredMovies.length === 0 && (
          <MoviesCardList
            movies={isChecked ? shortMovies : movies}
            isPageAllMovies={true}
            buttonLikeClass="card__like_delete"
            toggleMovieLike={toggleMovieLike}
            checkSavedMovie={checkSavedMovie}
          />
        )}
      {!isLoading &&
        !searchMoviesResponse &&
        saveFilteredMovies.length !== 0 && (
          <MoviesCardList
            movies={isChecked ? shortMovies : saveFilteredMovies}
            isPageAllMovies={true}
            buttonLikeClass="card__like_delete"
            toggleMovieLike={toggleMovieLike}
            checkSavedMovie={checkSavedMovie}
          />
        )}
    </>
  );
}

export default SavedMovies;

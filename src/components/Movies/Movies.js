import "./Movies.css";
import { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function Movies({
  movies,
  // TODO: 
  // setSearch,
  // getAllMovies,
  onSubmitSearch,
  isLoading,
  toggleMovieLike,
  searchMoviesResponse,
  selectShortMovies,
  checkSavedMovie,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [shortMovies, setShortMovies] = useState([]);

  useEffect(() => {
    if (isChecked) {
      setShortMovies(selectShortMovies(movies));
    }
  }, [isChecked, onSubmitSearch]);

  useEffect(() => {
  }, [toggleMovieLike]);

  return (
    <>
      <SearchForm
        onSubmitSearch={onSubmitSearch}
        setIsChecked={setIsChecked}
      />
      {isLoading && <Preloader />}
      {searchMoviesResponse && (
        <p className="movies__response">{searchMoviesResponse}</p>
      )}
      {isChecked && movies.length !== 0 && shortMovies.length === 0 && (
        <p className="movies__response">Короткометражных фильмов не найдено</p>
      )}
      {!isLoading && !searchMoviesResponse && (
        <MoviesCardList
          movies={isChecked ? shortMovies : movies}
          isPageAllMovies={true}
          toggleMovieLike={toggleMovieLike}
          checkSavedMovie={checkSavedMovie}
        />
      )}
    </>
  );
}

export default Movies;

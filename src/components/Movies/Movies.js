import "./Movies.css";
import { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function Movies({
  movies,
  setSearch,
  getAllMovies,
  onSubmitSearch,
  isLoading,
  toggleMovieLike,
  searchMoviesResponse,
  selectShortMovies,
  checkSavedMovie,
}) {
  // const [search, setSearch] = useState("");
  // function handleSearch(e) {
  //   setSearch(e);
  //   console.log(e);
  // }

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
        handleSearch={setSearch}
        getAllMovies={getAllMovies}
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
          // movies={isChecked ? shortMovies : movies}
          
          searchMoviesResponse={searchMoviesResponse}
          isPageAllMovies={true}
          toggleMovieLike={toggleMovieLike}
          checkSavedMovie={checkSavedMovie}
          // isLoading={isLoading}
          // search={search}
        />
      )}
    </>
  );
}

export default Movies;

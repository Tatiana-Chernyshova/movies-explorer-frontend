import "./Movies.css";
import { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function Movies({
  findMovies,
  setSearch,
  getAllMovies,
  onSubmitSearch,
  isLoading,
  handeleClickLike,
  searchMoviesResponse,
  selectShortMovies,
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
      setShortMovies(selectShortMovies(findMovies));
    }
  }, [isChecked, onSubmitSearch]);

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
      {isChecked && findMovies.length !== 0 && shortMovies.length === 0 && (
        <p className="movies__response">Короткометражных фильмов не найдено</p>
      )}
      {!isLoading && !searchMoviesResponse && (
        <MoviesCardList
          findMovies={isChecked ? shortMovies : findMovies}
          // movies={isChecked ? shortMovies : movies}
          handeleClickLike={handeleClickLike}
          searchMoviesResponse={searchMoviesResponse}
          // isLoading={isLoading}
          // search={search}
        />
      )}
      {/* )} */}
      {/* TODO: delere */}
      {/* <MoviesCardList /> */}
    </>
  );
}

export default Movies;

import "./SavedMovies.css";
import { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  movies,
  setSearch,
  getAllMovies,
  onSubmitSearch,
  isLoading,
  toggleMovieLike,
  checkSavedMovie,
  searchMoviesResponse,
  selectShortMovies,
  
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [shortMovies, setShortMovies] = useState([]);

  useEffect(() => {
    if (isChecked) {
      setShortMovies(selectShortMovies(movies));
    }
  }, [isChecked, onSubmitSearch]);

  return (
    // <>
    //   <SearchForm />
    //   <MoviesCardList
    //     buttonLikeClass="card__like_delete"
    //     saveMovies={saveMovies}
    //     isPageAllMovies={false}
    //   />
    // </>

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
          buttonLikeClass="card__like_delete"
          toggleMovieLike={toggleMovieLike}
          checkSavedMovie={checkSavedMovie}
          // isLoading={isLoading}
          // search={search}
        />
      )}
    </>
  );
}

export default SavedMovies;

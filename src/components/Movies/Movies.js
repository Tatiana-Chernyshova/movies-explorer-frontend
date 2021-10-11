import "./Movies.css";
import { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function Movies({
  findMovies,
  setSearch,
  getAllMovies,
  onSubmitSearch,
  isLoading,
  handeleClickLike
}) {
  // const [search, setSearch] = useState("");
  // function handleSearch(e) {
  //   setSearch(e);
  //   console.log(e);
  // }
  return (
    <>
      <SearchForm
        // movies={movies}
        handleSearch={setSearch}
        getAllMovies={getAllMovies}
        onSubmitSearch={onSubmitSearch}
      />
      {isLoading && <Preloader />}
      <MoviesCardList
        findMovies={findMovies}
        handeleClickLike={handeleClickLike}
        // isLoading={isLoading}
        // search={search}
      />
      {/* TODO: delere */}
      {/* <MoviesCardList /> */}
    </>
  );
}

export default Movies;

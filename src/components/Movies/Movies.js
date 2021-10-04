import "./Movies.css";
import { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies({ movies }) {
  const [search, setSearch] = useState("");
  function handleSearch(e) {
    setSearch(e);
  }
  return (
    <>
      <SearchForm movies={movies} handleSearch={handleSearch}/>
      <button></button>
      <MoviesCardList movies={movies} search={search} />
      {/* TODO: delere */}
      {/* <MoviesCardList /> */}
    </>
  );
}

export default Movies;

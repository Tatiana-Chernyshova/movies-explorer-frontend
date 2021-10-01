import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList />
      {/* TODO: delere */}
      {/* <MoviesCardList /> */}
    </>
  );
}

export default Movies;

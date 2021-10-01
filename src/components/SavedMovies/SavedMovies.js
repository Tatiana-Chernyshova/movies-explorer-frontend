import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList buttonLikeClass="card__like_delete" />
    </>
  );
}

export default SavedMovies;

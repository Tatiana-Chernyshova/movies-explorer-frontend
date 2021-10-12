import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ handeleSavedMovie }) {
  return (
    <>
      <SearchForm />
      {/* <MoviesCardList buttonLikeClass="card__like_delete" /> */}
      <button onClick={handeleSavedMovie}>ВСЕ ФИЛЬМЫ</button>
    </>
  );
}

export default SavedMovies;

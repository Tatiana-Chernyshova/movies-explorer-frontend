import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ buttonLikeClass }) {
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__box">
        <MoviesCard buttonLikeClass={buttonLikeClass}/>
        <MoviesCard buttonLikeClass={buttonLikeClass}/>
        <MoviesCard buttonLikeClass={buttonLikeClass}/>
        <MoviesCard buttonLikeClass={buttonLikeClass}/>
        <MoviesCard buttonLikeClass={buttonLikeClass}/>
      </div>
      <button
        type="submit"
        className="movies-card-list__submit"
        aria-label="movies-card-list__submit"
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;

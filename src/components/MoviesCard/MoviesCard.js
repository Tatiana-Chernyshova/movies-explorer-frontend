/* eslint-disable jsx-a11y/alt-text */
import "./MoviesCard.css";

function MoviesCard({
  buttonLikeClass,
  movie,
  toggleMovieLike,
  checkSavedMovie,
}) {
  const isLiked = checkSavedMovie(movie);
  let hour = Math.floor(movie.duration / 60);
  let minutes = ((movie.duration / 60 - hour) * 60).toFixed();

  const handleLikeClick = (e) => {
    e.stopPropagation();
    e.cancelBubble = true;
    toggleMovieLike(movie, isLiked);
  };

  const handleMovieClick = () => {
    let url = movie.trailer;
    window.open(url);
  };

  return (
    <div className="card__item" onClick={handleMovieClick}>
      <img className="card__image" src={movie.image} alt={movie.nameRU} />
      <div className="card__box">
        <h2 className="card__caption">{movie.nameRU}</h2>
        <p className="card__time">
          {`${hour}ч${minutes === 0 ? "" : ` ${minutes}м`}`}
        </p>
        <button
          className={`card__like ${
            buttonLikeClass
              ? buttonLikeClass
              : `card__like_disactive card__like_${isLiked && "active"}`
          }`}
          type="button"
          aria-label="Мне нравится"
          onClick={handleLikeClick}
        ></button>
      </div>
    </div>
  );
}

export default MoviesCard;

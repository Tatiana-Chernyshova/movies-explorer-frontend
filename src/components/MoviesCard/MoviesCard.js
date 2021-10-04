/* eslint-disable jsx-a11y/alt-text */
import "./MoviesCard.css";
import { useState } from "react";
// import film from "../../images/film.png";

function MoviesCard({ buttonLikeClass, movie }) {
  const [isActive, setActive] = useState(false);
  let hour = Math.floor(movie.duration / 60);
  let minutes = ((movie.duration / 60 - hour) * 60).toFixed();

  const handleLikeClick = (e) => {
    e.stopPropagation();
    e.cancelBubble = true;
    setActive(!isActive);
    // console.log(movie);
  };

  const handleMovieClick = () => {
    let url = movie.trailerLink;
    window.open(url);
  };





  return (
    <div className="card__item" 
    onClick={handleMovieClick}
>
      <img
        className="card__image"
        src={`https://api.nomoreparties.co${movie.image.url}`}
        alt={movie.image.name}
        // onClick={handleClick}
      />
      <div className="card__box">
        <h2 className="card__caption">
          {/* {card.name} */}
          {/* 33 слова о дизайне */}
          {movie.nameRU}
          {/* {movie.country} */}
          {/* {movie} */}
          {/* {movie.country} */}
        </h2>
        <p className="card__time">
          {/* 1ч 47м */}
          {`${hour}ч${minutes === 0 ? "" : ` ${minutes}м`}`}
        </p>
        <button
          className={`card__like ${
            buttonLikeClass
              ? buttonLikeClass
              : `card__like_disactive card__like_${isActive && "active"}`
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

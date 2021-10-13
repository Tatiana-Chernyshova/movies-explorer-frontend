/* eslint-disable jsx-a11y/alt-text */
import "./MoviesCard.css";
import { useState } from "react";
import film from "../../images/film.png";

function MoviesCard({ buttonLikeClass }) {
  const [isActive, setActive] = useState(false);

  const handleLikeClick = () => {
    setActive(!isActive);
  };

  return (
    <div className="card__item">
      <img
        className="card__image"
        src={film}
        // src={card.link}
        alt="Имя карточки"
        // alt={card.name}
        // onClick={handleClick}
      />
      <div className="card__box">
        <h2 className="card__caption">
          {/* {card.name} */}
          33 слова о дизайне
        </h2>
        <p className="card__time">1ч 47м</p>
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

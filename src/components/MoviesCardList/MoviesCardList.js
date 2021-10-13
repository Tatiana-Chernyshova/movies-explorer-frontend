import "./MoviesCardList.css";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  buttonLikeClass,
  movies,
  toggleMovieLike,
  checkSavedMovie,
  saveMovies,
  isPageAllMovies,
}) {
  const [moreCards, setMoreCards] = React.useState(3);
  const [startIndex, setStartIndex] = React.useState(0);
  const [renderMovies, setRenderMovies] = React.useState([]);

  const isMobile = useMediaQuery({ maxWidth: 320 });
  const isTablet = useMediaQuery({ maxWidth: 1279, minWidth: 321 });
  const isLaptop = useMediaQuery({ minWidth: 1280 });

  function getIndex() {
    if (isLaptop) {
      return { startIndex: 12, more: 3 };
    } else if (isTablet) {
      return { startIndex: 8, more: 2 };
    } else if (isMobile) {
      return { startIndex: 5, more: 2 };
    }
  }

  function renderMoreMovies() {
    const endIndex = Math.min(movies.length, startIndex + moreCards);
    const moreMovies = movies.slice(startIndex, endIndex);
    setRenderMovies([...renderMovies, ...moreMovies]);
    setStartIndex(endIndex);
  }

  function handleMoreMovies() {
    renderMoreMovies();
  }

  function handleResize() {
    const sumCards = getIndex();
    setMoreCards(sumCards.more);
  }

  useEffect(
    () => {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  );

  useEffect(() => {
    const sumCards = getIndex();
    setMoreCards(sumCards.more);
    const endIndex = Math.min(movies.length, sumCards.startIndex);
    setRenderMovies(movies.slice(0, endIndex));
    setStartIndex(endIndex);
  }, [movies]);

  useEffect(() => {
  }, [saveMovies]);

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__box">
        {isPageAllMovies && renderMovies.map((movie) => (
          <MoviesCard
            key={movie.movieId}
            movie={movie}
            toggleMovieLike={toggleMovieLike}
            checkSavedMovie={checkSavedMovie}
            buttonLikeClass={buttonLikeClass}
          />
        ))}
        {!isPageAllMovies && movies.map((movie) => (
          <MoviesCard
            key={movie.movieId}
            movie={movie}
            toggleMovieLike={toggleMovieLike}
            checkSavedMovie={checkSavedMovie}
            buttonLikeClass={buttonLikeClass}
          />
        ))}
      </div>

      {isPageAllMovies && startIndex < movies.length && (
        <button
          type="submit"
          className="movies-card-list__submit"
          aria-label="movies-card-list__submit"
          onClick={handleMoreMovies}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;

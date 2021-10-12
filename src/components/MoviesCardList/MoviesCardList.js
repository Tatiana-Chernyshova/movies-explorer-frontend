import "./MoviesCardList.css";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  buttonLikeClass,
  movies,
  search,
  toggleMovieLike,
  checkSavedMovie,
  saveMovies,
  isPageAllMovies,
  // isLoading,
  // searchMoviesResponse,
}) {
  const [moreCards, setMoreCards] = React.useState(3);
  // const [moviesShown, setMoviesShown] = React.useState([]);
  // const [disBtn, setDisBtn] = React.useState(false);
  // const findFilms = JSON.parse(localStorage.getItem("movies"));
  const [startIndex, setStartIndex] = React.useState(0);
  const [renderMovies, setRenderMovies] = React.useState([]);
  // const [windowSize, setWindowSize] = React.useState('');

  const isMobile = useMediaQuery({ maxWidth: 320 });
  const isTablet = useMediaQuery({ maxWidth: 1279, minWidth: 321 });
  const isLaptop = useMediaQuery({ minWidth: 1280 });

  // function handleWindowSize() {
  //   setWindowSize(window.innerWidth);
  //   console.log(windowSize);
  // }

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
    // console.log("more");
    renderMoreMovies();
  }

  function handleResize() {
    const sumCards = getIndex();
    setMoreCards(sumCards.more);
  }

  useEffect(
    () => {
      window.addEventListener("resize", handleResize);
      // handleWindowSize();
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    // , [windowSize]
  );

  useEffect(() => {
    const sumCards = getIndex();
    // console.log(sumCards);
    setMoreCards(sumCards.more);
    const endIndex = Math.min(movies.length, sumCards.startIndex);
    setRenderMovies(movies.slice(0, endIndex));
    setStartIndex(endIndex);
  }, [movies]);

  useEffect(() => {
  }, [saveMovies]);

  // useEffect(() => {}, [movies]);
  // console.log(movies.length);

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__box">
        {/* {searchMoviesResponse && <p>{searchMoviesResponse}</p>} */}
        {isPageAllMovies && renderMovies.map((movie) => (
          <MoviesCard
            key={movie.movieId}
            movie={movie}
            toggleMovieLike={toggleMovieLike}
            checkSavedMovie={checkSavedMovie}
            buttonLikeClass={buttonLikeClass}
            // onLikeClick={toggleMovieLike}
            // checkBookmarkStatus={checkBookmarkStatus}
          />
        ))}
        {/* {console.log(saveMovies)} */}
        {!isPageAllMovies && movies.map((movie) => (
          <MoviesCard
            key={movie.movieId}
            movie={movie}
            toggleMovieLike={toggleMovieLike}
            checkSavedMovie={checkSavedMovie}
            buttonLikeClass={buttonLikeClass}

            // onLikeClick={toggleMovieLike}
            // checkBookmarkStatus={checkBookmarkStatus}
          />
        ))}
      </div>

      {isPageAllMovies && startIndex < movies.length && (
        <button
          type="submit"
          className="movies-card-list__submit"
          aria-label="movies-card-list__submit"
          onClick={handleMoreMovies}
          isPageAllMovies={isPageAllMovies}
          // {isLastPage && disabled}
          // disabled={disBtn}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;

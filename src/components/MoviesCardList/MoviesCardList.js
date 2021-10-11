import "./MoviesCardList.css";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  buttonLikeClass,
  findMovies,
  search,
  handeleClickLike,
}) {
  const [moreCards, setMoreCards] = React.useState(3);
  // const [moviesShown, setMoviesShown] = React.useState([]);
  // const [disBtn, setDisBtn] = React.useState(false);
  // const findFilms = JSON.parse(localStorage.getItem("findMovies"));
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
    const endIndex = Math.min(findMovies.length, startIndex + moreCards);
    const moreMovies = findMovies.slice(startIndex, endIndex);
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
    const endIndex = Math.min(findMovies.length, sumCards.startIndex);
    setRenderMovies(findMovies.slice(0, endIndex));
    setStartIndex(endIndex);
  }, [findMovies]);

  // useEffect(() => {}, [findMovies]);
  // console.log(findMovies.length);

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__box">
        {/* {moviesShown.map((obj) => {
          return (
            <MoviesCard
              key={obj._id}
              movie={obj}
              // isSavedMoviePage={isSavedMoviePage} onSaveMovie={onSaveMovie} onUnSaveMovie={onUnSaveMovie} isSave={checkSavedMovie(savedMovies, movie)}
            />
          );
        })} */}
        {/* {isMobile ? (<p>Mobile</p>) : (<p>NOT Mobile</p>)} */}
        {/* {isTablet ? (<p>Tablet</p>) : (<p>NOT Tablet</p>)}
        {isLaptop ? (<p>Laptop</p>) : (<p>NOT Laptop</p>)} */}
        {/* {findMovies.map((obj) => (
          <MoviesCard
            movie={obj}
            key={obj.id}
            handeleClickLike={handeleClickLike}
            // olo={console.log(obj)}
          />
        ))} */}

        {renderMovies.map((movie) => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            // onLikeClick={toggleMovieLike}
            // checkBookmarkStatus={checkBookmarkStatus}
          />
        ))}
      </div>

      {startIndex < findMovies.length && (
        <button
          type="submit"
          className="movies-card-list__submit"
          aria-label="movies-card-list__submit"
          onClick={handleMoreMovies}
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

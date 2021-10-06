import "./MoviesCardList.css";
import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ buttonLikeClass, movies, search }) {
  const [more, setMore] = React.useState(3);
  const [moviesShown, setMoviesShown] = React.useState([]);
  const [disBtn, setDisBtn] = React.useState(false);
  function filterItems(query) {
    return movies.filter(function (elem) {
      if (elem.country === query || elem.nameRU === query) {
        return true;
      } else {
        return false;
      }
    });
    // })
  }

  // const olo = "Soul Power"
  const b = filterItems(search);

  // const showMoreMovies = () => {
  //   setMore((visible) => visible + 30);
  // };

  const disBtnMore = () => {
    // if (more >= movies.slice(0, more).length) {
    //   return setDisBtn(true);
    // }
    // return setDisBtn(true)
    const isLastPage = endIndex === moviesShown.length;
    setDisBtn(isLastPage);
  };

//   const startIndex = 0 * more;
//   const endIndex = startIndex + more;
//   const pageItems = movies.slice(startIndex, endIndex);
//   const isLastPage = pageItems.length !== more || endIndex === movies.length;
//   console.log(
//     `
// more ${more}
// startIndex ${startIndex}
// endIndex ${endIndex}
// isLastPage ${isLastPage}
// `
//   );
  function handleShowMoreMovies() {
    const startIndex = moviesShown.length;
    const endIndex = startIndex + more;
    const counter = movies.length - startIndex;
    
    setMore((visible) => visible + 30);
    if (counter > 0) {
      const newMovies = movies.slice(startIndex, endIndex);
      setMoviesShown([...moviesShown, ...newMovies]);
      // const isLastPage = endIndex === newMovies.length;
      // setDisBtn(isLastPage);
    }
  }

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__box">
        {/* {search && `${movies.map((obj) => (
          <MoviesCard
            movie={obj}
            
            
            // onCardClick={onCardClick}
            // onCardLike={onCardLike}
            // onCardDelete={onCardDelete}
            // key={obj._id}
          />
        ))}`} */}

        {moviesShown.map((obj) => {
          return (
            <MoviesCard
              key={obj._id}
              movie={obj}
              // isSavedMoviePage={isSavedMoviePage} onSaveMovie={onSaveMovie} onUnSaveMovie={onUnSaveMovie} isSave={checkSavedMovie(savedMovies, movie)}
            />
          );
        })}

        {/* {movies.slice(startIndex, endIndex).map(
          (obj) => (
            // {
            <MoviesCard
              movie={obj}
              key={obj.id}
              // olo={console.log(obj)}
            />
          )
          // }})}
          // }
        )} */}
        {/* {console.log(disBtn)} */}

        {/* {movies.map((obj) => (
          <MoviesCard
            movie={obj}
            key={obj.id}
            // olo={console.log(obj)}
          />
          
        ))}

arr.slice(1, 3) */}
        {/* 
{b.map((obj) => (
          <MoviesCard
            movie={obj}
            key={obj.id}
            // olo={console.log(obj)}
          />
          
        ))} */}

        {/* {console.log(movies)} */}
        {/* // movies.map((movie) => (
      //     <MoviesCard
      //     movie={movie} 
      //     // onCardClick={onCardClick}
      //     // onCardLike={onCardLike}
      //     // onCardDelete={onCardDelete}
      //     buttonLikeClass={buttonLikeClass}
      //     key={movie._id}
      //     />
      //   ) )
        // } */}
        {/* <MoviesCard buttonLikeClass={buttonLikeClass}/> */}
        {/* <MoviesCard buttonLikeClass={buttonLikeClass}/>
        <MoviesCard buttonLikeClass={buttonLikeClass}/>
        <MoviesCard buttonLikeClass={buttonLikeClass}/>
        <MoviesCard buttonLikeClass={buttonLikeClass}/> */}
      </div>
      <button
        type="submit"
        className="movies-card-list__submit"
        aria-label="movies-card-list__submit"
        onClick={handleShowMoreMovies}
        // {isLastPage && disabled}
        disabled={disBtn}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;

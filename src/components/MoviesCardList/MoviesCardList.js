import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ buttonLikeClass, movies, search }) {

  function filterItems(query) {
    return movies.filter(function(elem) {
      if (
        (elem.country === query)
      ||
      (elem.nameRU === query)
      ) {
        return true;
      } else {
        return false;
      }
    });
    // })
  }

  // const olo = "Soul Power"
  const b = filterItems(search);



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
        {movies.map((obj) => (
          <MoviesCard
            movie={obj}
            key={obj.id}
            // olo={console.log(obj)}
          />
          
        ))}
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
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;

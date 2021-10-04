import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import searchIcon from "../../images/icon__seach.svg";

function SearchForm({ setSearch, movies, handleSearch }) {
  const [film, setFilm] = React.useState("");

  function submit(e) {
    e.preventDefault();
    // console.log("submit seach")
    console.log(film)
    // setSearch(film);
    handleSearch(film);
  }

  function handleChangeName(e) {
    setFilm(e.target.value);
  }


  // const [searchData, setSearchData] = React.useState('');
  // const handleInputChange = (e) => {
  //   setSearchData(e.target.value);
  // };
  // console.log(searchData)

  return (
    <article className="search__page">
      <div className="search__box">
        <form className="search" name="search" onSubmit={submit}>
          <fieldset className="search__input-container">
            <img src={searchIcon} alt="Лупа" className="search__icon" />
            <input
              type="text"
              className="search__input"
              id="film"
              name="film"
              placeholder="Фильм"
              // value={email || ''}
              value={film || ""}
              required
              // onChange={handleEmailChange}
              // minLength="5"
              onChange={handleChangeName}
              // onChange={handleInputChange}
            />
            <span className="film-error search__input-error"></span>
            <button
              type="submit"
              className="search__submit"
              aria-label="search__submit"
            >
              Найти
            </button>
          </fieldset>
        </form>
        <FilterCheckbox />
      </div>
    </article>
  );
}

export default SearchForm;

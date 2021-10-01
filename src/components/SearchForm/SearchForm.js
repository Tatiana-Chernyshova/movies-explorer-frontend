import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import searchIcon from "../../images/icon__seach.svg";

function SearchForm() {
  const [name, setName] = React.useState("");

  function submit(e) {
    e.preventDefault();
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

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
              value={name || ""}
              required
              // onChange={handleEmailChange}
              minLength="5"
              onChange={handleChangeName}
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

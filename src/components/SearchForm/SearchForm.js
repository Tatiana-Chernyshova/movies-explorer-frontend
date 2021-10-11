import React from "react";
import { useForm } from "react-hook-form";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import searchIcon from "../../images/icon__seach.svg";

function SearchForm({ setSearch, movies, handleSearch, onSubmitSearch }) {
  // const [query, setQuery] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit"
  });

  function onSubmit(e) {
    // e.preventDefault();
    // console.log("submit seach")
    // console.log(query);
    // console.log(e.query);
    // setQuery(e);

    // setSearch(film);
    onSubmitSearch(e.query);
    // getAllMovies();

  }

  // function handleChangeQuery(e) {
  //   setQuery(e.target.value);
  // }


  // const [searchData, setSearchData] = React.useState('');
  // const handleInputChange = (e) => {
  //   setSearchData(e.target.value);
  // };
  // console.log(searchData)

  return (
    <article className="search__page">
      <div className="search__box">
        <form className="search" name="search" onSubmit={handleSubmit(onSubmit)} noValidate>
          <fieldset className="search__input-container">
            <img src={searchIcon} alt="Лупа" className="search__icon" />
            <input
              type="text"
              className="search__input"
              id="query"
              name="query"
              placeholder="Фильм"
              // value={email || ''}
              // value={film || ""}
              // required
              // onChange={handleEmailChange}
              // minLength="5"
              // onChange={handleChangeQuery}
              // onChange={handleInputChange}
              {...register("query", {
                required: "Нужно ввести ключевое слово",
                minLength: {
                  value: 2,
                  message: "Введите минимум 2 символа",
                },
                maxLength: {
                  value: 60,
                  message: "Максимальная длина - 60 символов",
                }
              })}
            />
            {errors.query && (
              <span className="query-error search__input-error">{errors.query.message}</span>
            )}
            {/* <span className="query-error search__input-error"></span> */}
            <button
              type="submit"
              className="search__submit"
              aria-label="search__submit"
              // disabled={!isValid}
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

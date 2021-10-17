import React from "react";
import { useForm } from "react-hook-form";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import searchIcon from "../../images/icon__seach.svg";

function SearchForm({
  onSubmitSearch,
  setIsChecked,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  function onSubmit(e) {
    onSubmitSearch(e.query);
  }

  return (
    <article className="search__page">
      <div className="search__box">
        <form
          className="search"
          name="search"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <fieldset className="search__input-container">
            <img src={searchIcon} alt="Лупа" className="search__icon" />
            <input
              type="text"
              className="search__input"
              id="query"
              name="query"
              placeholder="Фильм"
              {...register("query", {
                minLength: {
                  value: 2,
                  message: "Введите минимум 2 символа",
                },
                maxLength: {
                  value: 60,
                  message: "Максимальная длина - 60 символов",
                },
              })}
            />
            {errors.query && (
              <span className="query-error search__input-error">
                {errors.query.message}
              </span>
            )}
            <button
              type="submit"
              className="search__submit"
              aria-label="search__submit"
            >
              Найти
            </button>
          </fieldset>
        </form>
        <FilterCheckbox setIsChecked={setIsChecked} />
      </div>
    </article>
  );
}

export default SearchForm;

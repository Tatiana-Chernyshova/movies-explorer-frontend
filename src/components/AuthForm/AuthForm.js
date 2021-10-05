import React from "react";
import { Link } from "react-router-dom";
import "./AuthForm.css";

function AuthForm({
  onSubmit,
  title,
  children,
  buttonText,
  afterText,
  link,
  linkText,
  isValid
}) {
  return (
    <article className="auth__page">
      <form className="auth" name="auth" onSubmit={onSubmit} noValidate>
        <h2 className="auth__heading">{title}</h2>
        <fieldset className="auth__input-container">
          {children}
          <button
            type="submit"
            className="auth__submit"
            aria-label="auth__submit"
            disabled={!isValid}
          >
            {buttonText}
          </button>
          <div className="auth__after">
            <p className="auth__text">{afterText}</p>
            <Link to={link} className="auth__link">
              {linkText}
            </Link>
          </div>
        </fieldset>
      </form>
    </article>
  );
}

export default AuthForm;

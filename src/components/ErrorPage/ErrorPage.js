import "./ErrorPage.css";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <section className="error">
      <h1 className="error__title">404</h1>
      <h2 className="error__subtitle">Страница не найдена</h2>
      <Link className="error__link" to="/">
        Назад
      </Link>
    </section>
  );
}

export default ErrorPage;

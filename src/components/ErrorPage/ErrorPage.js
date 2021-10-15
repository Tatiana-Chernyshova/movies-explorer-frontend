import "./ErrorPage.css";
import { Link, useHistory } from "react-router-dom";

function ErrorPage() {
  const history = useHistory();

  function goBack() {
    history.goBack();
  }

  return (
    <section className="error">
      <h1 className="error__title">404</h1>
      <h2 className="error__subtitle">Страница не найдена</h2>
      <Link className="error__link" to="/" onClick={goBack}>
        Назад
      </Link>
    </section>
  );
}

export default ErrorPage;

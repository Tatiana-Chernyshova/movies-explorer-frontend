import "./Accessibility.css";
import { Link } from "react-router-dom";

function Accessibility() {
  return (
    <section className="accessibility">
      <ul className="accessibility__links">
        <li>
          <Link className="accessibility__link" to="/signup">
            Регистрация
          </Link>
        </li>
        <li>
          <Link
            className="accessibility__link accessibility__link_black"
            to="/signin"
          >
            Войти
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Accessibility;

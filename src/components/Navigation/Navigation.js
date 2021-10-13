import "./Navigation.css";
import { NavLink } from "react-router-dom";

function Navigation({ isMobile }) {
  return (
    <section className={`navigation navigation_${isMobile && "mobile"}`}>
      <ul className="navigation__links navigation__links_mobile">
        <li>
          <NavLink
            className="navigation__link"
            activeClassName="navigation__link_active"
            to="/movies"
          >
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            className="navigation__link"
            activeClassName="navigation__link_active"
            to="/saved-movies"
          >
            Сохраненные фильмы
          </NavLink>
        </li>
      </ul>
    </section>
  );
}

export default Navigation;

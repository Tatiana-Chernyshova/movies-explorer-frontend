import "./BurgerMenu.css";
import { NavLink } from "react-router-dom";
import NavigationAccount from "../NavigationAccount/NavigationAccount";

function BurgerMenu({ isOpen }) {
  return (
    <section className={`burger-menu burger-menu_${isOpen && "active"}`}>
      <div className="burger-menu__popup">
        <section className={`burger-menu__box menu`}>
          <ul className="menu__links">
            <li>
              <NavLink
                className="menu__link"
                activeClassName="menu__link_active"
                exact
                to="/"
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                className="menu__link"
                activeClassName="menu__link_active"
                to="/movies"
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                className="menu__link"
                activeClassName="menu__link_active"
                to="/saved-movies"
              >
                Сохраненные фильмы
              </NavLink>
            </li>
          </ul>
        </section>
        <NavigationAccount />
      </div>
    </section>
  );
}

export default BurgerMenu;

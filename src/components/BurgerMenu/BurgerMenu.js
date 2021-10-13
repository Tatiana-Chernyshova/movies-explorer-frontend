import "./BurgerMenu.css";
import { NavLink } from "react-router-dom";
import NavigationAccount from "../NavigationAccount/NavigationAccount";

function BurgerMenu({ isOpen, onCloseBurger }) {
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
                onClick={onCloseBurger}
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                className="menu__link"
                activeClassName="menu__link_active"
                to="/movies"
                onClick={onCloseBurger}
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                className="menu__link"
                activeClassName="menu__link_active"
                to="/saved-movies"
                onClick={onCloseBurger}
              >
                Сохраненные фильмы
              </NavLink>
            </li>
          </ul>
        </section>
        <NavigationAccount onCloseBurger={onCloseBurger}/>
      </div>
    </section>
  );
}

export default BurgerMenu;

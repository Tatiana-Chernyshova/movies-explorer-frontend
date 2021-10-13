import "./Header.css";
import { Route, Switch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import headerLogo from "../../images/header-logo.svg";
import Navigation from "../Navigation/Navigation";
import NavigationAccount from "../NavigationAccount/NavigationAccount";
import BurgerButton from "../BurgerButton/BurgerButton";
import Accessibility from "../Accessibility/Accessibility";

function Header({ isLoggin, onOpenBurger, onCloseBurger, isBurgerOpen }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <Switch>
      <Route path="/(signup|signin)">
        <header className="header header_auth">
          <a className="header__link" href="/" rel="noreferrer">
            <img
              src={headerLogo}
              alt="Логотип Movies"
              className="header__logo"
            />
          </a>
        </header>
      </Route>
      <Route path="/(|movies|saved-movies|profile)">
        <header className={`header header_${isLoggin && "login"}`}>
          <a className="header__link" href="/" rel="noreferrer">
            <img
              src={headerLogo}
              alt="Логотип Movies"
              className="header__logo"
            />
          </a>
          {isLoggin ? (
            <>
              {isMobile ? (
                <>
                  {isBurgerOpen ? (
                    <BurgerButton
                      onClick={onCloseBurger}
                      isOpen={isBurgerOpen}
                    />
                  ) : (
                    <BurgerButton
                      onClick={onOpenBurger}
                      isOpen={isBurgerOpen}
                    />
                  )}
                </>
              ) : (
                <>
                  <Navigation isMobile={isMobile} />
                  <NavigationAccount />
                </>
              )}
            </>
          ) : (
            <Accessibility />
          )}
        </header>
      </Route>
      <Route path="*"></Route>
    </Switch>
  );
}

export default Header;

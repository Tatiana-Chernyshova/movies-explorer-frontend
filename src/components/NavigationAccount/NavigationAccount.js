import "./NavigationAccount.css";
import { Link } from "react-router-dom";
import accountIcon from "../../images/icon__account.svg";

function NavigationAccount() {
  return (
    <Link className="navigation__account account__box" to="/profile">
      <img src={accountIcon} alt="Иконка аккаунта" className="account__icon" />
      <p className="account__text">Аккаунт</p>
    </Link>
  );
}

export default NavigationAccount;

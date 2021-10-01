import "./BurgerButton.css";
import burgerIcon from "../../images/icon__burger.svg";
import burgerClose from "../../images/icon__burger_close.svg";

function BurgerButton({ onClick, isOpen }) {
  return (
    <button
      className={`navigation__burger burger__btn burger__btn_${
        isOpen && "close"
      }`}
      onClick={onClick}
    >
      {isOpen && (
        <img 
          src={burgerClose} 
          alt="Иконка меню" 
          className="burger__icon" 
        />
      )}
      {!isOpen && (
        <img
          src={burgerIcon}
          alt="Иконка закрытия меню"
          className="burger__icon"
        />
      )}
    </button>
  );
}

export default BurgerButton;

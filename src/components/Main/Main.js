import "./Main.css";
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

function Main() {
  return (
    <main className="main">
      {/* компонент с вёрсткой баннера страницы «О проекте». */}
      <Promo />
      {/* NavTab — компонент с навигацией по странице «О проекте». */}
      <NavTab />
      {/*компонент с описанием дипломного проекта.*/}
      <AboutProject />
      {/*компонент с использованными технологиями.*/}
      <Techs />
      {/* компонент с информацией о студенте.*/}
      <AboutMe />
      {/* компонент со ссылками на другие проекты.  */}
      <Portfolio />
    </main>
  );
}

export default Main;

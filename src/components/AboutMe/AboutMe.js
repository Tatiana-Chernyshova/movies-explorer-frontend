import "./AboutMe.css";
import avatar from "../../images/avatar.jpeg";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__component">Студент</h2>
      <div className="about-me__box">
        <div className="about-me__text-box">
          <h3 className="about-me__name">Татьяна</h3>
          <p className="about-me__profession">Инженер, 28 лет</p>
          <p className="about-me__about">
            Мой муж работает курьером в Яндекс.Еда. Год назад проходил конкурс на
            возможность обучения профессии веб-разработчика в Яндекс.Практикуме.
            И вот нам выпал счастливый билет.
          </p>
          <span className="about-me__about">
            Так же, я закончила СПбГУКиТ по специальности инженер систем кино и
            телевидения.
          </span>
        </div>
        <ul className="about-me__links">
          <li className="about-me__item">
            <a
              className="about-me__link"
              href="https://ru-ru.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </li>
          <li className="about-me__item">
            <a
              className="about-me__link"
              href="https://github.com/Vladimir-Chernyshov"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
        <img src={avatar} alt="Моя фотография" className="about-me__avatar" />
      </div>
    </section>
  );
}

export default AboutMe;

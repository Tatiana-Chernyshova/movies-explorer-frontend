import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__about">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__box">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li>
            <a
              className="footer__link"
              href="https://practicum.yandex.ru/profile/web/"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              href="https://ru-ru.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

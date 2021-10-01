import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__component">О проекте</h2>
      <div className="about-project__items">
        <article className="about-project__item">
          <h3 className="about-project__title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </article>
        <article className="about-project__item">
          <h3 className="about-project__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </div>
      <div className="about-project__graphic">
        <h3 className="about-project__text about-project__text_black">
          1 неделя
        </h3>
        <h3 className="about-project__text about-project__text_grey">
          4 недели
        </h3>
        <p className="about-project__text about-project__text_tech">
          Back-end
        </p>
        <p className="about-project__text about-project__text_tech">
          Front-end
        </p>
      </div>
    </section>
  );
}

export default AboutProject;

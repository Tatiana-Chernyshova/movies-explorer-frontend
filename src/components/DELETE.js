import "./App.css";

import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  // TODO: delete
  // TODO: delete
  // console.log(watch());

  // console.log(errors.name)


 { 
  "country": "США, Германия, Великобритания, Нидерланды, Бельгия, Франция",
  "description": "Невероятная история любви Дженезиса Пи-Орриджа и его жены Леди Джей, вместе с ним игравшей в группе Psychic TV, — история, которая вряд ли сообщает что-то новое о природе индастриала, но определенно — о природе человека вообще и о природе Пи-Орриджа в частности. Нью-йоркская художница французского происхождения Мари Лозье задумала и начала снимать этот фильм семь лет тому назад — ходила в гости в их квартиру в Нью-Йорке, снимала Дженезиса, стоящего за плитой, и Джей с пучками петрушки и котом на шестнадцатимиллиметровую камеру, одевала их в дурацкие костюмы, ездила с Psychic TV в тур и следила за тем, как любовь заставляет человека отказаться от собственной личности, раствориться в другом человеке и стать одним целым с возлюбленным, используя метод сut-up Уилльяма Берроуза; когда Леди Джей умерла в 2007 году, Дженезис сделал ее татуировку почти во всю руку и до сих пор говорит «мы» вместо «я».",
  "director": "Мари Лозье",
  "duration": 65,
  "image": "https://api.nomoreparties.co/uploads/ballad_of_genesis_and_lady_jaye_10c27afa96.jpeg",
  "movieId": 11,
  "nameEN": "The Ballad of Genesis and Lady Jaye",
  "nameRU": "Баллада о Дженезисе и Леди Джей",
  "thumbnail": "https://api.nomoreparties.co/uploads/thumbnail_ballad_of_genesis_and_lady_jaye_10c27afa96.jpeg",
  "trailer": "https://www.youtube.com/watch?v=d8BX2FDrogo",
  "year": "2011"
}

const getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movie) => {
    res.status(200)
      .send({ movie });
  })
  .catch((err) => {
    next(err);
  });

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const { _id } = req.user;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: _id,
  })

    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new Error400('Переданы некорректные данные при создании фильма'),
        );
      }
      next(err);
    });
};




  return (
    <div className="container pt-5">
      <div className="row justify-content-sm-center pt-5">
        <div className="col-sm-6 shadow round pb-3">
          <h1 className="text-center pt-3 text-secondary">Example Form</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="col-form-label">Name:</label>
              <input
                type="text"
                className={`form-control ${errors.name && "invalid"}`}
                {...register("name", { required: "Name is Required" })}
                onKeyUp={() => {
                  trigger("name");
                }}
              />
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label">Age:</label>
              <input
                type="text"
                className={`form-control ${errors.age && "invalid"}`}
                {...register("age", {
                  required: "Age is Required",
                  min: {
                    value: 13,
                    message: "Minimum Required age is 13",
                  },
                  max: {
                    value: 65,
                    message: "Maximum allowed age is 65",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Only numbers are allowed",
                  }
                })}
                onKeyUp={() => {
                  trigger("age");
                }}
              />
              {errors.age && (
                <small className="text-danger">{errors.age.message}</small>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label">Email:</label>
              <input
                type="text"
                className={`form-control ${errors.email && "invalid"}`}
                {...register("email", { required: "Email is Required" ,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                }})}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label">Phone:</label>
              <input
                type="text"
                className={`form-control ${errors.phone && "invalid"}`}
                {...register("phone", { required: "Phone is Required",
                pattern: {
                  value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                  message: "Invalid phone no",
                },
               })}
               onKeyUp={() => {
                trigger("phone");
              }}
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone.message}</small>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label">Message:</label>
              <textarea
                className={`form-control ${errors.message && "invalid"}`}
                {...register("message", { required: "Message is Required",
                minLength: {
                  value: 10,
                  message: "Minimum Required length is 10",
                },
                maxLength: {
                  value: 50,
                  message: "Maximum allowed length is 50 ",
                }
               })}
               onKeyUp={() => {
                trigger("message");
              }}
              ></textarea>
              {errors.message && (
                <small className="text-danger">{errors.message.message}</small>
              )}
            </div>
            <input
              type="submit"
              className="btn btn-primary my-3"
              value="Send message"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
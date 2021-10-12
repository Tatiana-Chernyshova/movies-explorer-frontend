// export const BASE_URL = "https://api.cherduk-movies.nomoredomains.club";

export const register = (password, email, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
      name: name,
    }),
  }).then((result) => checkResponse(result));
};

export const login = (password, email, token) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password, email }),
  }).then((result) => checkResponse(result));
};

export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((result) => checkResponse(result));
};

export const getUserData = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((result) => checkResponse(result));
};

export const setUserData = (email, name) => {
  return fetch(`${BASE_URL}/users/me`, {
    // mode: 'no-cors',
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    // credentials: "include",
    body: JSON.stringify({ email, name }),
  }).then((result) => checkResponse(result));
};
export const BASE_URL = "https://api.cherduk-movies.nomoredomains.club";

export const createMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    // mode: 'no-cors',
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    credentials: "include",
    body: JSON.stringify(
      movie
    ),
  }).then((result) => checkResponse(result));
};

export const getMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
    // mode: 'no-cors',
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      // authorization: `Bearer ${token}`,
    },
    credentials: "include",
    // body: JSON.stringify({
    //   movie,
    // }),
  }).then((result) => checkResponse(result));
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

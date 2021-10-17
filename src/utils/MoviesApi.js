export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

class MoviesApi {
  constructor({ address, headers }) {
    this._address = address;
    this._headers = headers;
  }

  getMovies() {
    return fetch(`${this._address}`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
  
    
  _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

}

const api = new MoviesApi({
  address: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api;

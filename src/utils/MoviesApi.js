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
    // console.log(res.json());
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
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
})

export default api;




// export const getMovies = () => {
//   return fetch(`${BASE_URL}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       // 'authorization': `Bearer ${token}`,
//     }
//   })
//   .then(result => checkResponse(result));
// };

// function checkResponse(res) {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(`Ошибка: ${res.status}`);
// }
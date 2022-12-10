export class Api {
  constructor(baseUrl, authorization) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }


    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  setProfileInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
  }

  sendProfileInfo(name, status) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: status
      })
    })
  }

  initialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
  }

  sendCard(name, link) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}`,
      {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        }
      })
  }

  putLike(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`,
      {
        method: 'PUT',
        headers: {
          authorization: this._authorization
        }
      })
  }

  delLike(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`,
      {
        method: 'DELETE',
        headers: {
          authorization: this._authorization
        }
      })
  }

  changeAvatar(src) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: src
      })
    })
  }
}

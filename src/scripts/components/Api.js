import { renderLoading } from "../../pages/index.js";

export class Api {
  constructor(baseUrl, authorization) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
  }

  setProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }


        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  sendProfileInfo(name, status) {
    return fetch(`${this._baseUrl}/users/me`, {
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }


        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .finally(() => {
        renderLoading(false)
      })
  }

  initialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }


        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  sendCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }


        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .finally(() => {
        renderLoading(false)
      })
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`,
      {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }


        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  putLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`,
      {
        method: 'PUT',
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }


        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  delLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`,
      {
        method: 'DELETE',
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }


        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  changeAvatar(src) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: src
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }


        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .finally(() => {
        renderLoading(false)
      })
  }
}

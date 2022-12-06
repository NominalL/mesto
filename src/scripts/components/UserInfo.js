export class UserInfo {
  constructor(name, status) {
    this._name = document.querySelector(name);
    this._status = document.querySelector(status);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      status: this._status.textContent,
    };
    return userInfo;
  }

  setUserInfo(inputItems) {
    this._name.textContent = inputItems["name-input"];

    this._status.textContent = inputItems["status-input"];

    fetch('https://mesto.nomoreparties.co/v1/cohort-55/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'eca7d056-7701-4d08-8699-65b7e7c67df3',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputItems["name-input"],
        about: inputItems["status-input"]
      })
    });
  }
}

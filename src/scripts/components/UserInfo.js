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

  setUserInfo(name, status) {
    this._name.textContent = name;

    this._status.textContent = status;
  }
}

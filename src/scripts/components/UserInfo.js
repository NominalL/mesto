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
  }
}

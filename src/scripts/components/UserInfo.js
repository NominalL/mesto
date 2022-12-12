export class UserInfo {
  constructor(name, status, avatar) {
    this._name = document.querySelector(name);
    this._status = document.querySelector(status);
    this._avatar = document.querySelector(avatar);
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

  setUserAvatar(link) {
    this._avatar.src = link;
  }

  setUserId(id) {
    this.userId = id;
  }
}


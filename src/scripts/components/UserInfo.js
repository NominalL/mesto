import { api } from "../../pages/index.js";

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

  setUserInfo(inputItems) {
    this._name.textContent = inputItems["name-input"];

    this._status.textContent = inputItems["status-input"];

    api.sendProfileInfo(inputItems["name-input"], inputItems["status-input"])
      .catch((err) => {
        console.log(err);
      });
  }

  setUserAvatar(inputItem) {
    this._avatar.src = inputItem["avatar-src-input"];

    api.changeAvatar(inputItem["avatar-src-input"])
      .catch((err) => {
        console.log(err);
      });
  }
}

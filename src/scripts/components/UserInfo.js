export class UserInfo {
  constructor(name, status, avatar, { handleSendProfileInfo, handleChangeAvatar }) {
    this._name = document.querySelector(name);
    this._status = document.querySelector(status);
    this._avatar = document.querySelector(avatar);
    this._handleChangeAvatar = handleChangeAvatar;
    this._handleSendProfileInfo = handleSendProfileInfo;
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

    this._handleSendProfileInfo(inputItems["name-input"], inputItems["status-input"]);
  }

  setUserAvatar(inputItem) {
    this._avatar.src = inputItem["avatar-src-input"];

    this._handleChangeAvatar(inputItem["avatar-src-input"]);
  }
}

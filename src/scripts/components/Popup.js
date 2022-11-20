export default class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
    this._popupCloseButton = this._popup.querySelector(".popup__close");
  }

  _addEventEsc() {
    document.addEventListener("keydown", this._handleEscClose);
  }

  _removeEventEsc() {
    document.removeEventListener("keydown", this._handleEscClose);
  }

  open() {
    this._popup.classList.add("popup_opened");

    this._addEventEsc();
  }

  close() {
    this._popup.classList.remove("popup_opened");

    this._removeEventEsc();
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _closeOvelayClickCallback(e) {
    if (e.target === this._popup) {
      this.close();
    }
  }

  _closeOvelayClick() {
    this._popup.addEventListener("mousedown", (e) => {
      this._closeOvelayClickCallback(e);
    });
  }

  _closeButtonClick() {
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });
  }

  setEventListener() {
    this._closeOvelayClick();
    this._closeButtonClick();
  }
}

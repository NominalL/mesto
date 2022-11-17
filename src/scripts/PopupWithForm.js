import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submit, validation }, popup) {
    super(popup);
    this._popup = document.querySelector(popup);
    this._submit = submit;
    this._validation = validation;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._popupSubmitButton = this._popup.querySelector(
      ".popup__submit-button"
    );
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    const inputValues = this._inputList.forEach((item) => {
      return item.value;
    });
    return inputValues;
  }

  open() {
    super.open();

    this._validation();
  }

  close() {
    super.close();

    this._validation();
  }

  _submitPopupForm() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._submit();
    });
  }

  setEventListener() {
    super.setEventListener();

    this._submitPopupForm();
  }
}

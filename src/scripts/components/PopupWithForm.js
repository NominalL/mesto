import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submit }, popup) {
    super(popup);
    this._popup = document.querySelector(popup);
    this._submit = submit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._formValues = {};
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      this._formValues[input.id] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();

    this._popupForm.reset();
  }

  _submitPopupForm() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._submit(this._getInputValues());
    });
  }

  setEventListener() {
    super.setEventListener();

    this._submitPopupForm();
  }
}

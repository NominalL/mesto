import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submit, reset }, popup) {
    super(popup);
    this._popup = document.querySelector(popup);
    this._submit = submit;
    this._reset = reset;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._popupSubmitButton = this._popup.querySelector(
      ".popup__submit-button"
    );
    this._inputList = this._popup.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const _formValues = {};
    this._inputList.forEach((input) => {
      _formValues[input.id] = input.value;
    });
    return _formValues;
  }

  resetForm() {
    this._reset(this._inputList);
  }

  close() {
    super.close();

    this._reset(this._inputList);
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

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submit, resetInputValue }, popup) {
    super(popup);
    this._popup = document.querySelector(popup);
    this._submit = submit;
    this._resetInputValue = resetInputValue;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._popupSubmitButton = this._popup.querySelector(
      ".popup__submit-button"
    );
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._formValues = {};
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      this._formValues[input.id] = input.value;
    });
    return this._formValues;
  }

  resetForm() {
    this._resetInputValue(this._inputList);
  }

  close() {
    super.close();

    this._resetInputValue(this._inputList);
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

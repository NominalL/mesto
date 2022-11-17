export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    this._buttonElement = formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._settings.inputErrorClass);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorActiveClass);
  }

  hideInputError(inputElement) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._settings.inputErrorClass);

    errorElement.classList.remove(this._settings.errorActiveClass);

    errorElement.textContent = "";
  }

  enableButton() {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled", "disabled");
  }

  disableButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "disabled");
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

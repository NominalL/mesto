export class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
    this.inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    this.buttonElement = formElement.querySelector(
      this.settings.submitButtonSelector
    );
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError(inputElement, errorMessage, settings) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(settings.inputErrorClass);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorActiveClass);
  }

  _hideInputError(inputElement, settings) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(settings.inputErrorClass);

    errorElement.classList.remove(settings.errorActiveClass);

    errorElement.textContent = "";
  }

  _enableButton(buttonElement, settings) {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "disabled");
  }

  _disableButton(buttonElement, settings) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
        this.settings
      );
    } else {
      this._hideInputError(inputElement, this.settings);
    }
  }

  _toggleButtonState(inputList, buttonElement, settings) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement, settings);
    } else {
      this._enableButton(buttonElement, settings);
    }
  }

  _setEventListeners(formElement, settings) {
    this._toggleButtonState(this.inputList, this.buttonElement, settings);
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(this.inputList, this.buttonElement, settings);
      });
    });
  }

  enableValidation() {
    this._setEventListeners(this.formElement, this.settings);
  }
}

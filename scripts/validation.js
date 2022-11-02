const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorActiveClass: "popup__input-error-active",
};
class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(
        inputElement,
        inputElement.validationMessage,
        this.settings
      );
    } else {
      hideInputError(inputElement, this.settings);
    }
  }

  _toggleButtonState(inputList, buttonElement, settings) {
    if (this._hasInvalidInput(inputList)) {
      disableButton(buttonElement, settings);
    } else {
      enableButton(buttonElement, settings);
    }
  }

  _setEventListeners(formElement, settings) {
    const inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      this.settings.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement, settings);
      });
    });
  }

  enableValidation(settings, formElement) {
    this._setEventListeners(formElement, settings);
  }
}

function showInputError(inputElement, errorMessage, settings) {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(settings.inputErrorClass);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorActiveClass);
}

function hideInputError(inputElement, settings) {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(settings.inputErrorClass);

  errorElement.classList.remove(settings.errorActiveClass);

  errorElement.textContent = "";
}

function enableButton(buttonElement, settings) {
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.removeAttribute("disabled", "disabled");
}

function disableButton(buttonElement, settings) {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute("disabled", "disabled");
}

const formList = Array.from(document.querySelectorAll(settings.formSelector));

formList.forEach((formElement) => {
  const validation = new FormValidator(settings, formElement);
  validation.enableValidation(validation.settings, validation.formElement);
});

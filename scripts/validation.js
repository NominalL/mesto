const setting = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorActiveClass: "popup__input-error-active",
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function showInputError(inputElement, errorMessage, setting) {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(setting.inputErrorClass);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(setting.errorActiveClass);
}

function hideInputError(inputElement, setting) {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(setting.inputErrorClass);

  errorElement.classList.remove(setting.errorActiveClass);

  errorElement.textContent = "";
}

function isValid(inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, setting);
  } else {
    hideInputError(inputElement, setting);
  }
}

const toggleButtonState = (inputList, buttonElement, setting) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, setting);
  } else {
    enableButton(buttonElement, setting);
  }
};

const setEventListeners = (formElement, setting) => {
  const inputList = Array.from(
    formElement.querySelectorAll(setting.inputSelector)
  );
  const buttonElement = formElement.querySelector(setting.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, setting);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(inputElement);
      toggleButtonState(inputList, buttonElement, setting);
    });
  });
};

const enableValidation = (setting) => {
  const formList = Array.from(document.querySelectorAll(setting.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, setting);
  });
};

enableValidation(setting);

function enableButton(buttonElement, setting) {
  buttonElement.classList.remove(setting.inactiveButtonClass);
  buttonElement.removeAttribute("disabled", "disabled");
}

function disableButton(buttonElement, setting) {
  buttonElement.classList.add(setting.inactiveButtonClass);
  buttonElement.setAttribute("disabled", "disabled");
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function showInputError(inputElement, errorMessage) {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__input_type_error');

  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error-active');
}

function hideInputError(inputElement) {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__input_type_error');

  errorElement.classList.remove('popup__input-error-active');

  errorElement.textContent = '';
}

function isValid(inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage);
  }
  else {
    hideInputError(inputElement);
  }
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-button_inactive');
    buttonElement.setAttribute("disabled", "disabled");
  }
  else {
    buttonElement.classList.remove('popup__submit-button_inactive');
    buttonElement.removeAttribute("disabled", "disabled");
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      isValid(inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();

function enableButton(formElement) {
  const buttonElement = formElement.querySelector('.popup__submit-button');

  buttonElement.classList.remove('popup__submit-button_inactive');
  buttonElement.removeAttribute("disabled", "disabled");
}

function disableButton(formElement) {
  const buttonElement = formElement.querySelector('.popup__submit-button');

  buttonElement.classList.add('popup__submit-button_inactive');
  buttonElement.setAttribute("disabled", "disabled");
}

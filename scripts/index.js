let profileEditButton = document.querySelector('.profile__edit-button');
let form = document.querySelector('.popup');
let formClose = form.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let formName = document.querySelector('.popup__input_name');
let formStatus = document.querySelector('.popup__input_status');
let formSubmitButton = document.querySelector('.popup__form')

function popupOpen() {
  formName.value = profileName.textContent;
  formStatus.value = profileStatus.textContent;

  form.classList.add('popup_opened');
}

function popupClose() {
  form.classList.remove('popup_opened');
}

function formSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = formName.value;
  profileStatus.textContent = formStatus.value;
  popupClose();
}

formSubmitButton.addEventListener('submit', formSubmit);

profileEditButton.addEventListener('click', popupOpen);

formClose.addEventListener('click', popupClose);

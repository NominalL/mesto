let profileEditButton = document.querySelector('.profile__edit-button');
let form = document.querySelector('.form');
let formClose = form.querySelector('.form__close');

function popupOpen() {
  form.classList.add('popup-open');
}

function popupClose() {
  form.classList.remove('popup-open');
}

profileEditButton.addEventListener('click', popupOpen);

formClose.addEventListener('click', popupClose);

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let formName = document.querySelector('.form__name');
let formStatus = document.querySelector('.form__status');
let formSubmitButton = document.querySelector('.form__info')

function formSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = formName.value;
  profileStatus.textContent = formStatus.value;
  popupClose();
}
formSubmitButton.addEventListener('submit', formSubmit);

let like = document.querySelectorAll('.element__like');

like.forEach(element => element.addEventListener('click', e => {
  e.target.classList.toggle('element__like-active');
}
))

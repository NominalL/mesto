const profileEditButton = document.querySelector('.profile__edit-button');
const form = document.querySelector('#popup__profile');
const formClose = form.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const formName = form.querySelector('.popup__input_name');
const formStatus = form.querySelector('.popup__input_status');
const formSubmitButton = form.querySelector('.popup__form');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const templateCard = document.querySelector('#element');
const templateH2 = templateCard.content.querySelector('.element__name');
const templateImg = templateCard.content.querySelector('.element__image');
const elements = document.querySelector('.elements');
let card;
const popupAdd = document.querySelector('#popup__add');
const addButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const popupAddButton = popupAdd.querySelector('.popup__submit-button');
const popupAddInputName = popupAdd.querySelector('.popup__input_card-name');
const popupAddInputSrc = popupAdd.querySelector('.popup__input_card-src');
let like;
let cardDelButton;
const popupCard = document.querySelector('.popup-card');
const popupCardImage = popupCard.querySelector('.popup-card__image');
const popupCardCloseButton = popupCard.querySelector('.popup-card__close');
const popupCardCaption = popupCard.querySelector('.popup-card__caption');
let elementImg;
let elementName;

for (let i = 0; i < initialCards.length; i++) {
  templateH2.textContent = initialCards[i].name;
  templateImg.src = initialCards[i].link;
  card = templateCard.content.cloneNode(true);
  elements.append(card);
  like = elements.querySelectorAll('.element__like');
  cardDelButton = elements.querySelectorAll('.element__trash');
  elementImg = elements.querySelectorAll('.element__image');
}

like.forEach(element => element.addEventListener('click', e => {
  e.target.classList.toggle('element__like_active');
}))

cardDelButton.forEach(element => element.addEventListener('click', e => {
  e.target.closest('.element').remove();
}))

elementImg.forEach(element => element.addEventListener('click', e => {
  popupCardOpen();
  popupCardImage.src = e.target.src;
  popupCardCaption.textContent = e.target.closest('.element').querySelector('.element__name').textContent;
}));

function popupAddSubmit(evt) {
  evt.preventDefault();

  templateH2.textContent = popupAddInputName.value;
  templateImg.src = popupAddInputSrc.value;
  card = templateCard.content.cloneNode(true);
  elements.prepend(card);
  like = elements.querySelector('.element__like').addEventListener('click', e => {
    e.target.classList.toggle('element__like_active');
  });
  cardDelButton = elements.querySelector('.element__trash').addEventListener('click', e => {
    e.target.closest('.element').remove();
  });
  elementImg = elements.querySelector('.element__image').addEventListener('click', e => {
    popupCardOpen();
    popupCardImage.src = e.target.src;
    popupCardCaption.textContent = e.target.closest('.element').querySelector('.element__name').textContent;
  });
  popupAddClose()
}

function popupAddOpen() {
  popupAdd.classList.add('popup_opened');
}

function popupAddClose() {
  popupAdd.classList.remove('popup_opened');
}

function popupProfileOpen() {
  formName.value = profileName.textContent;
  formStatus.value = profileStatus.textContent;

  form.classList.add('popup_opened');
}

function popupProfileClose() {
  form.classList.remove('popup_opened');
}

function formSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = formName.value;
  profileStatus.textContent = formStatus.value;
  popupProfileClose();
}

function popupCardOpen() {
  popupCard.classList.add('popup-card__opened');
}

function popupCardClose() {
  popupCard.classList.remove('popup-card__opened');
}

formSubmitButton.addEventListener('submit', formSubmit);

profileEditButton.addEventListener('click', popupProfileOpen);

formClose.addEventListener('click', popupProfileClose);

addButton.addEventListener('click', popupAddOpen);

popupAddCloseButton.addEventListener('click', popupAddClose);

popupAddButton.addEventListener('click', popupAddSubmit);

popupCardCloseButton.addEventListener('click', popupCardClose);

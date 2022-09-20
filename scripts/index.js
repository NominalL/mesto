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
const elementH2 = templateCard.content.querySelector('.element__name');
const elementImg = templateCard.content.querySelector('.element__image');
const elements = document.querySelector('.elements');
let card;
const popupCard = document.querySelector('#popup__card');
const addButton = document.querySelector('.profile__add-button');
const popupCardCloseButton = popupCard.querySelector('.popup__close');
const popupCardButton = popupCard.querySelector('.popup__submit-button');
const popupCardInputName = popupCard.querySelector('.popup__input_card-name');
const popupCardInputSrc = popupCard.querySelector('.popup__input_card-src');
let like;

for (let i = 0; i < initialCards.length; i++) {
  elementH2.textContent = initialCards[i].name;
  elementImg.src = initialCards[i].link;
  card = templateCard.content.cloneNode(true);
  elements.append(card);
  like = elements.querySelectorAll('.element__like');
}

like.forEach(element => element.addEventListener('click', e => {
  e.target.classList.toggle('element__like_active');
}))

function popupCardSubmit(evt) {
  evt.preventDefault();

  elementH2.textContent = popupCardInputName.value;
  elementImg.src = popupCardInputSrc.value;
  card = templateCard.content.cloneNode(true);
  elements.prepend(card);
  like = elements.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
    popupCardClose()
  }

function popupCardOpen() {
      popupCard.classList.add('popup_opened');
    }

function popupCardClose() {
      popupCard.classList.remove('popup_opened');
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

formSubmitButton.addEventListener('submit', formSubmit);

  profileEditButton.addEventListener('click', popupProfileOpen);

  formClose.addEventListener('click', popupProfileClose);

  addButton.addEventListener('click', popupCardOpen);

  popupCardCloseButton.addEventListener('click', popupCardClose);

  popupCardButton.addEventListener('click', popupCardSubmit);

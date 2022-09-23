const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('#popup__profile');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const popupProfileName = popupProfile.querySelector('.popup__input_name');
const popupProfileStatus = popupProfile.querySelector('.popup__input_status');
const popupProfileSubmitButton = popupProfile.querySelector('.popup__form');
const templateCard = document.querySelector('#element');
const templateH2 = templateCard.content.querySelector('.element__name');
const templateImg = templateCard.content.querySelector('.element__image');
const elements = document.querySelector('.elements');
const popupAdd = document.querySelector('#popup__add');
const buttonAdd = document.querySelector('.profile__add-button');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const popupAddButton = popupAdd.querySelector('.popup__form');
const popupAddInputName = popupAdd.querySelector('.popup__input_card-name');
const popupAddInputSrc = popupAdd.querySelector('.popup__input_card-src');
const popupCard = document.querySelector('.popup-card');
const popupCardImage = popupCard.querySelector('.popup-card__image');
const popupCardCloseButton = popupCard.querySelector('.popup-card__close');
const popupCardCaption = popupCard.querySelector('.popup-card__caption');

for (let i = 0; i < initialCards.length; i++) {
  renderCard(initialCards[i].name, initialCards[i].link);
}

function renderCard(name, image) {
  elements.prepend(createCard(name, image));
}

function createCard(name, image) {
  templateH2.textContent = name;
  templateImg.src = image;
  templateImg.alt = templateH2.textContent;
  const card = templateCard.content.cloneNode(true);
  card.querySelector('.element__like').addEventListener('click', e => {
    e.target.classList.toggle('element__like_active');
  });
  card.querySelector('.element__trash').addEventListener('click', e => {
    e.target.closest('.element').remove();
  });
  card.querySelector('.element__image').addEventListener('click', e => {
    openPopupCard();
    popupCardImage.src = e.target.src;
    popupCardCaption.textContent = e.target.closest('.element').querySelector('.element__name').textContent;
  });
  return card;
}

function submitPopupAdd(evt) {
  evt.preventDefault();

  renderCard(popupAddInputName.value, popupAddInputSrc.value);
  closePopupAdd();
}

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
}

function openPopupProfile() {
  popupProfileName.value = profileName.textContent;
  popupProfileStatus.value = profileStatus.textContent;

  popupProfile.classList.add('popup_opened');
}

function closePopupProfile() {
  popupProfile.classList.remove('popup_opened');
}

function submitPopupProfile(evt) {
  evt.preventDefault();

  profileName.textContent = popupProfileName.value;
  profileStatus.textContent = popupProfileStatus.value;
  closePopupProfile();
}

function openPopupCard() {
  popupCard.classList.add('popup-card__opened');
}

function closePopupCard() {
  popupCard.classList.remove('popup-card__opened');
}

popupProfileSubmitButton.addEventListener('submit', submitPopupProfile);

profileEditButton.addEventListener('click', openPopupProfile);

popupProfileCloseButton.addEventListener('click', closePopupProfile);

buttonAdd.addEventListener('click', openPopupAdd);

popupAddCloseButton.addEventListener('click', closePopupAdd);

popupAddButton.addEventListener('submit', submitPopupAdd);

popupCardCloseButton.addEventListener('click', closePopupCard);

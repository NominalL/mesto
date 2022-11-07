import { FormValidator } from "./FormValidator.js";

import { Card } from "./Card.js";

import { initialCards } from "./initialCards.js";

import { settings } from "./settings.js";

const profileEditButton = document.querySelector(".profile__edit-button");

const popupProfile = document.querySelector("#popup__profile");

const popupProfileButton = popupProfile.querySelector(".popup__submit-button");

const popupProfileCloseButton = popupProfile.querySelector(".popup__close");

const profileName = document.querySelector(".profile__name");

const profileStatus = document.querySelector(".profile__status");

const popupProfileName = popupProfile.querySelector(".popup__input_name");

const popupProfileStatus = popupProfile.querySelector(".popup__input_status");

const popupProfileForm = popupProfile.querySelector(".popup__form");

const elements = document.querySelector(".elements");

const popupAdd = document.querySelector("#popup__add");

const popupAddButton = popupAdd.querySelector(".popup__submit-button");

const buttonAdd = document.querySelector(".profile__add-button");

const popupAddCloseButton = popupAdd.querySelector(".popup__close");

const popupAddForm = popupAdd.querySelector(".popup__form");

const popupAddInputName = popupAdd.querySelector(".popup__input_card-name");

const popupAddInputSrc = popupAdd.querySelector(".popup__input_card-src");

const popupCard = document.querySelector("#popup-card");

const popupCardCaption = popupCard.querySelector(".popup__caption-card");

const popupCardImage = popupCard.querySelector(".popup__image-card");

const popupCardCloseButton = popupCard.querySelector(".popup__close");

const profileValidation = new FormValidator(settings, popupProfileForm);
const newCardValidation = new FormValidator(settings, popupAddForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();

for (let i = 0; i < initialCards.length; i++) {
  renderCardPrepend(
    initialCards[i].name,
    initialCards[i].link,
    "#element",
    handleOpenPopupCard
  );
}

function createCard(name, image, templateCard, handleOpenPopupCard) {
  const card = new Card(name, image, templateCard, handleOpenPopupCard);
  return card.createCard();
}

function renderCardPrepend(name, image, templateCard, handleOpenPopupCard) {
  elements.prepend(createCard(name, image, templateCard, handleOpenPopupCard));
}

function openPopup(popup) {
  popup.classList.add("popup_opened");

  addEventEsc();
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  removeEventEsc();
}

function submitPopupAdd(evt) {
  evt.preventDefault();
  renderCardPrepend(
    popupAddInputName.value,
    popupAddInputSrc.value,
    "#element",
    handleOpenPopupCard
  );

  closePopupAdd();
}

function openPopupAdd() {
  popupAddInputName.value = "";

  popupAddInputSrc.value = "";

  newCardValidation.disableButton(popupAddButton);

  newCardValidation.hideInputError(popupAddInputName);

  newCardValidation.hideInputError(popupAddInputSrc);

  openPopup(popupAdd);
}

function closePopupAdd() {
  closePopup(popupAdd);
}

function openPopupProfile() {
  popupProfileName.value = profileName.textContent;

  popupProfileStatus.value = profileStatus.textContent;

  profileValidation.enableButton(popupProfileButton);

  profileValidation.hideInputError(popupProfileName);

  profileValidation.hideInputError(popupProfileStatus);

  openPopup(popupProfile);
}

function closePopupProfile() {
  closePopup(popupProfile);
}

function submitPopupProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;

  profileStatus.textContent = popupProfileStatus.value;

  closePopupProfile();
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function addEventEsc() {
  document.addEventListener("keydown", closePopupEsc);
}

function removeEventEsc() {
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupCard() {
  closePopup(popupCard);
}

function handleOpenPopupCard(name, image) {
  popupCardImage.src = image;
  popupCardImage.alt = name;
  popupCardCaption.textContent = name;

  openPopup(popupCard);
}

popupCardCloseButton.addEventListener("click", closePopupCard);

popupProfileForm.addEventListener("submit", submitPopupProfile);

profileEditButton.addEventListener("click", openPopupProfile);

popupProfileCloseButton.addEventListener("click", closePopupProfile);

buttonAdd.addEventListener("click", openPopupAdd);

popupAddCloseButton.addEventListener("click", closePopupAdd);

popupAddForm.addEventListener("submit", submitPopupAdd);

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", function (e) {
    if (e.target === popup) {
      closePopup(popup);
    }
  });
});

import { FormValidator } from "./validation.js";

import { Card } from "./cards.js";

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

const popupCardCloseButton = popupCard.querySelector(".popup__close");

const profileValidation = new FormValidator(settings, popupProfileForm);
const newCardValidation = new FormValidator(settings, popupAddForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();

for (let i = 0; i < initialCards.length; i++) {
  renderCardPrepend(initialCards[i].name, initialCards[i].link, "#element");
}

function createCard(name, image, templateCard) {
  const card = new Card(name, image, templateCard);
  return card.createCard();
}

function renderCardPrepend(name, image, templateCard) {
  elements.prepend(createCard(name, image, templateCard));
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
    "#element"
  );

  closePopupAdd();
}

function openPopupAdd() {
  popupAddInputName.value = "";

  popupAddInputSrc.value = "";

  disableButton(popupAddButton, settings);

  hideInputError(popupAddInputName, settings);

  hideInputError(popupAddInputSrc, settings);

  openPopup(popupAdd);
}

function closePopupAdd() {
  closePopup(popupAdd);
}

function openPopupProfile() {
  popupProfileName.value = profileName.textContent;

  popupProfileStatus.value = profileStatus.textContent;

  enableButton(popupProfileButton, settings);

  hideInputError(popupProfileName, settings);

  hideInputError(popupProfileStatus, settings);

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
popupCardCloseButton.addEventListener("click", closePopupCard);

popupProfileForm.addEventListener("submit", submitPopupProfile);

profileEditButton.addEventListener("click", openPopupProfile);

popupProfileCloseButton.addEventListener("click", closePopupProfile);

buttonAdd.addEventListener("click", openPopupAdd);

popupAddCloseButton.addEventListener("click", closePopupAdd);

popupAddForm.addEventListener("submit", submitPopupAdd);

[popupAdd, popupProfile, popupCard].forEach((p) => {
  p.addEventListener("click", function (e) {
    if (e.target === p) {
      closePopup(p);
    }
  });
});

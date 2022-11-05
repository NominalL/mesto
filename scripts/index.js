import {
  FormValidator,
  settings,
  hideInputError,
  enableButton,
  disableButton,
} from "./validation.js";

import { Card } from "./cards.js";

import { initialCards } from "./initialCards.js"

const profileEditButton = document.querySelector(".profile__edit-button");

const popupProfile = document.querySelector("#popup__profile");

const popupProfileButton = popupProfile.querySelector(".popup__submit-button");

const popupProfileCloseButton = popupProfile.querySelector(".popup__close");

const profileName = document.querySelector(".profile__name");

const profileStatus = document.querySelector(".profile__status");

const popupProfileName = popupProfile.querySelector(".popup__input_name");

const popupProfileStatus = popupProfile.querySelector(".popup__input_status");

const popupProfileSubmitButton = popupProfile.querySelector(".popup__form");

const elements = document.querySelector(".elements");

const popupAdd = document.querySelector("#popup__add");

const popupAddButton = popupAdd.querySelector(".popup__submit-button");

const buttonAdd = document.querySelector(".profile__add-button");

const popupAddCloseButton = popupAdd.querySelector(".popup__close");

const popupAddSubmitButton = popupAdd.querySelector(".popup__form");

const popupAddInputName = popupAdd.querySelector(".popup__input_card-name");

const popupAddInputSrc = popupAdd.querySelector(".popup__input_card-src");

const popupCard = document.querySelector("#popup-card");

const popupCardCloseButton = popupCard.querySelector(".popup__close");

const formList = Array.from(document.querySelectorAll(settings.formSelector));

formList.forEach((formElement) => {
  const validation = new FormValidator(settings, formElement);
  validation.enableValidation(validation.settings, validation.formElement);
});

for (let i = 0; i < initialCards.length; i++) {
  renderCard(initialCards[i].name, initialCards[i].link, "#element");
}

function renderCard(name, image, templateCard) {
  const card = new Card(name, image, templateCard);
  elements.prepend(card.createCard());
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
  renderCard(popupAddInputName.value, popupAddInputSrc.value, "#element");

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

popupCardCloseButton.addEventListener("click", closePopupCard);

popupProfileSubmitButton.addEventListener("submit", submitPopupProfile);

profileEditButton.addEventListener("click", openPopupProfile);

popupProfileCloseButton.addEventListener("click", closePopupProfile);

buttonAdd.addEventListener("click", openPopupAdd);

popupAddCloseButton.addEventListener("click", closePopupAdd);

popupAddSubmitButton.addEventListener("submit", submitPopupAdd);

[popupAdd, popupProfile, popupCard].forEach((p) => {
  p.addEventListener("click", function (e) {
    if (e.target === p) {
      closePopup(p);
    }
  });
});

export const popupCard = document.querySelector("#popup-card");

export const profileName = document.querySelector(".profile__name");

export const profileStatus = document.querySelector(".profile__status");

export const profileAvatar = document.querySelector(".profile__avatar");

export const popupCardCaption = popupCard.querySelector(".popup__caption-card");

export const popupCardImage = popupCard.querySelector(".popup__image-card");

export const likeCounter = document.querySelector(".element__counter");

export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);

export const popupProfile = document.querySelector("#popup__profile");

export const popupProfileButton = popupProfile.querySelector(
  ".popup__submit-button"
);

export const popupProfileName =
  popupProfile.querySelector(".popup__input_name");

export const popupProfileStatus = popupProfile.querySelector(
  ".popup__input_status"
);

export const popupProfileForm = popupProfile.querySelector(".popup__form");

export const popupAdd = document.querySelector("#popup__add");

export const popupAddButton = popupAdd.querySelector(".popup__submit-button");

export const buttonAdd = document.querySelector(".profile__add-button");

export const popupAddForm = popupAdd.querySelector(".popup__form");

export const popupAddInputName = popupAdd.querySelector(
  ".popup__input_card-name"
);

export const popupAddInputSrc = popupAdd.querySelector(
  ".popup__input_card-src"
);

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorActiveClass: "popup__input-error-active",
};

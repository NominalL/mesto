import "../pages/index.css";

import {
  popupProfileForm,
  popupAddForm,
  profileEditButton,
  buttonAdd,
  popupAddInputName,
  popupAddInputSrc,
  popupAddButton,
  popupProfileName,
  popupProfileStatus,
  popupProfileButton,
} from "./constants.js";

import { FormValidator } from "./FormValidator.js";

import { Card } from "./Card.js";

import { initialCards } from "./initialCards.js";

import { settings } from "./settings.js";

import Section from "./Section.js";

import PopupWithForm from "./PopupWithForm.js";

import PopupWithImage from "./PopupWithImage.js";

import { UserInfo } from "./UserInfo.js";

const profileValidation = new FormValidator(settings, popupProfileForm);
const newCardValidation = new FormValidator(settings, popupAddForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();

const sectionCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, "#element", {
        handleOpenPopupCard: (name, image) => {
          const popupCardWithImage = new PopupWithImage(
            "#popup-card",
            image,
            name
          );

          popupCardWithImage.setEventListener();
          popupCardWithImage.open();
        },
      });
      const cardElement = card.createCard();
      sectionCard.addItem(cardElement);
    },
  },
  ".elements"
);

sectionCard.renderCard();

const popupAddWithForm = new PopupWithForm(
  {
    submit: () => {
      const inputItems = [
        {
          name: popupAddInputName.value,
          link: popupAddInputSrc.value,
        },
      ];

      const sectionCard = new Section(
        {
          items: inputItems,
          renderer: (item) => {
            const card = new Card(item.name, item.link, "#element", {
              handleOpenPopupCard: (name, image) => {
                const popupCardWithImage = new PopupWithImage(
                  "#popup-card",
                  image,
                  name
                );

                popupCardWithImage.setEventListener();
                popupCardWithImage.open();
              },
            });
            const cardElement = card.createCard();
            sectionCard.addItem(cardElement);
          },
        },
        ".elements"
      );

      sectionCard.renderCard();

      popupAddWithForm.close();
    },
    validation: () => {
      popupAddInputName.value = "";

      popupAddInputSrc.value = "";

      newCardValidation.disableButton(popupAddButton);

      newCardValidation.hideInputError(popupAddInputName);

      newCardValidation.hideInputError(popupAddInputSrc);
    },
  },
  "#popup__add"
);

popupAddWithForm.setEventListener();

const info = new UserInfo(".profile__name", ".profile__status");

const popupProfileWithForm = new PopupWithForm(
  {
    submit: () => {
      info.setUserInfo(popupProfileName.value, popupProfileStatus.value);

      popupProfileWithForm.close();
    },
    validation: () => {
      popupProfileName.value = info.getUserInfo().name;

      popupProfileStatus.value = info.getUserInfo().status;

      profileValidation.enableButton(popupProfileButton);

      profileValidation.hideInputError(popupProfileName);

      profileValidation.hideInputError(popupProfileStatus);
    },
  },
  "#popup__profile"
);

popupProfileWithForm.setEventListener();

profileEditButton.addEventListener("click", () => {
  popupProfileWithForm.open();
});

buttonAdd.addEventListener("click", () => {
  popupAddWithForm.open();
});

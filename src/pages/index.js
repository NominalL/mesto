import "./index.css"

import {
  popupProfileForm,
  popupAddForm,
  profileEditButton,
  buttonAdd,
  popupAddInputName,
  popupAddInputSrc,
  popupProfileName,
  popupProfileStatus,
  initialCards,
  settings,
} from "../scripts/utils/constants.js";

import { FormValidator } from "../scripts/components/FormValidator.js";

import { Card } from "../scripts/components/Card.js";

import Section from "../scripts/components/Section.js";

import PopupWithForm from "../scripts/components/PopupWithForm.js";

import PopupWithImage from "../scripts/components/PopupWithImage.js";

import { UserInfo } from "../scripts/components/UserInfo.js";

export const profileValidation = new FormValidator(settings, popupProfileForm);
export const newCardValidation = new FormValidator(settings, popupAddForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();

const popupCardWithImage = new PopupWithImage("#popup-card");

const sectionCard = new Section(
  {
    items: initialCards,
    renderer: (items) => {
      items.forEach((item) => {
        createClassCard(item.name, item.link);
      });
    },
  },
  ".elements"
);

sectionCard.renderCards();

const popupAddWithForm = new PopupWithForm(
  {
    submit: (inputItems) => {
      const sectionCard = new Section(
        {
          items: inputItems,
          renderer: (input) => {
            createClassCard(input["card-name-input"], input["card-src-input"]);
          },
        },
        ".elements"
      );

      sectionCard.renderCards();

      popupAddWithForm.close();
    },
    reset: (inputList) => {
      popupAddInputName.value = "";

      popupAddInputSrc.value = "";

      newCardValidation.resetValidation(inputList);
    },
  },
  "#popup__add"
);

popupAddWithForm.resetForm();
popupAddWithForm.setEventListener();

const info = new UserInfo(".profile__name", ".profile__status");

const popupProfileWithForm = new PopupWithForm(
  {
    submit: () => {
      info.setUserInfo(popupProfileName.value, popupProfileStatus.value);

      popupProfileWithForm.close();
    },
    reset: (inputlist) => {
      popupProfileName.value = info.getUserInfo().name;

      popupProfileStatus.value = info.getUserInfo().status;

      profileValidation.resetValidation(inputlist);
    },
  },
  "#popup__profile"
);

popupProfileWithForm.resetForm();
popupProfileWithForm.setEventListener();

function createClassCard(name, link) {
  const card = new Card(name, link, "#element", {
    handleOpenPopupCard: (name, image) => {
      popupCardWithImage.setEventListener();
      popupCardWithImage.open(name, image);
    },
  });
  const cardElement = card.createCard();
  sectionCard.addItem(cardElement);
}

profileEditButton.addEventListener("click", () => {
  popupProfileWithForm.open();
});

buttonAdd.addEventListener("click", () => {
  popupAddWithForm.open();
});

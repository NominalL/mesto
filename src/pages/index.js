//import "./index.css";

import {
  popupProfileForm,
  popupAddForm,
  profileEditButton,
  buttonAdd,
  popupProfileName,
  popupProfileStatus,
  settings,
  profileName,
  profileStatus,
  profileAvatar,
} from "../scripts/utils/constants.js";

import { FormValidator } from "../scripts/components/FormValidator.js";

import { Card } from "../scripts/components/Card.js";

import Section from "../scripts/components/Section.js";

import PopupWithForm from "../scripts/components/PopupWithForm.js";

import PopupWithImage from "../scripts/components/PopupWithImage.js";

import { UserInfo } from "../scripts/components/UserInfo.js";
import PopupWithDelCard from "../scripts/components/PopupWithDelCard.js";

const profileValidation = new FormValidator(settings, popupProfileForm);
const newCardValidation = new FormValidator(settings, popupAddForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();

const popupCardWithImage = new PopupWithImage("#popup-card");

const popupAddWithForm = new PopupWithForm(
  {
    submit: (inputItems) => {
      const sectionCard = new Section(
        {
          items: inputItems,
          renderer: (items) => {
            sectionCard.addItemPrepend(createClassCard(items["card-name-input"], items["card-src-input"], 0, '5bdf4960f51a4bfdb2402408'));
            fetch('https://mesto.nomoreparties.co/v1/cohort-55/cards', {
              method: 'POST',
              headers: {
                authorization: 'eca7d056-7701-4d08-8699-65b7e7c67df3',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: items["card-name-input"],
                link: items["card-src-input"]
              })
            })
          },
        },
        ".elements"
      );
      sectionCard.renderCards();
      popupAddWithForm.close();
    },
  },
  "#popup__add"
);

popupAddWithForm.setEventListener();

const popupWithDelCard = new PopupWithDelCard("#popup__del");

const info = new UserInfo(".profile__name", ".profile__status");

const popupProfileWithForm = new PopupWithForm(
  {
    submit: (inputItems) => {
      info.setUserInfo(inputItems);

      popupProfileWithForm.close();
    },
  },
  "#popup__profile"
);

popupProfileWithForm.setEventListener();

function createClassCard(name, link, likes, userId, cardId) {
  const card = new Card(name, link, likes, "#element", userId, {
    handleOpenPopupCard: (name, image) => {
      popupCardWithImage.setEventListener();
      popupCardWithImage.open(name, image);
    },
    handleOpenPopupDelCard: (card) => {
      popupWithDelCard.setEventListener(card, cardId);
      popupWithDelCard.open();
    }
  });
  const cardElement = card.createCard();

  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  popupProfileName.value = info.getUserInfo().name;

  popupProfileStatus.value = info.getUserInfo().status;

  profileValidation.resetValidation();

  popupProfileWithForm.open();
});

buttonAdd.addEventListener("click", () => {
  newCardValidation.resetValidation();

  popupAddWithForm.open();
});

fetch('https://nomoreparties.co/v1/cohort-55/users/me', {
  headers: {
    authorization: 'eca7d056-7701-4d08-8699-65b7e7c67df3'
  }
})
  .then(res => res.json())
  .then((res) => {
    profileName.textContent = res.name;
    profileStatus.textContent = res.about;
    profileAvatar.src = res.avatar;
  })

fetch('https://mesto.nomoreparties.co/v1/cohort-55/cards', {
  headers: {
    authorization: 'eca7d056-7701-4d08-8699-65b7e7c67df3'
  }
})
  .then(res => res.json())
  .then((res) => {
    const sectionCard = new Section(
      {
        items: res,
        renderer: (items) => {
          items.forEach((item) => {
            sectionCard.addItemAppend(createClassCard(item.name, item.link, item.likes.length, item.owner._id, item._id));
          });
        },
      },
      ".elements"
    );

    sectionCard.renderCards();
  })



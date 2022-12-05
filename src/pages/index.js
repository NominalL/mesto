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
  likeCounter
} from "../scripts/utils/constants.js";

import { FormValidator } from "../scripts/components/FormValidator.js";

import { Card } from "../scripts/components/Card.js";

import Section from "../scripts/components/Section.js";

import PopupWithForm from "../scripts/components/PopupWithForm.js";

import PopupWithImage from "../scripts/components/PopupWithImage.js";

import { UserInfo } from "../scripts/components/UserInfo.js";

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
            sectionCard.addItemPrepend(createClassCard(items["card-name-input"], items["card-src-input"], 0));
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

function createClassCard(name, link, likes) {
  const card = new Card(name, link, likes, "#element", {
    handleOpenPopupCard: (name, image) => {
      popupCardWithImage.setEventListener();
      popupCardWithImage.open(name, image);
    },
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
            sectionCard.addItemAppend(createClassCard(item.name, item.link, item.likes.length));
          });
        },
      },
      ".elements"
    );

    sectionCard.renderCards();
  })

fetch('https://mesto.nomoreparties.co/v1/cohort-55/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'eca7d056-7701-4d08-8699-65b7e7c67df3',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Картавцев Никита',
    about: 'Жеский программист'
  })
});


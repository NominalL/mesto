import "./index.css";

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
  popupAvatarAdd,
  profileAvatarOverlay,
  popupProfileButton,
  popupAddButton,
  popupAvatarAddButton
} from "../scripts/utils/constants.js";

import { FormValidator } from "../scripts/components/FormValidator.js";

import { Card } from "../scripts/components/Card.js";

import Section from "../scripts/components/Section.js";

import PopupWithForm from "../scripts/components/PopupWithForm.js";

import PopupWithImage from "../scripts/components/PopupWithImage.js";

import { UserInfo } from "../scripts/components/UserInfo.js";

import PopupWithDelCard from "../scripts/components/PopupWithDelCard.js";

import { Api } from "../scripts/components/Api.js";

export const api = new Api('https://nomoreparties.co/v1/cohort-55', 'eca7d056-7701-4d08-8699-65b7e7c67df3');

const profileValidation = new FormValidator(settings, popupProfileForm);
const newCardValidation = new FormValidator(settings, popupAddForm);
const popupAvatarAddValidation = new FormValidator(settings, popupAvatarAdd);
profileValidation.enableValidation();
newCardValidation.enableValidation();
popupAvatarAddValidation.enableValidation();

const popupCardWithImage = new PopupWithImage("#popup-card");

const popupAddWithForm = new PopupWithForm(
  {
    submit: (inputItems) => {
      renderLoading(true);
      const sectionCard = new Section(
        {
          items: inputItems,
          renderer: (items) => {
            api.sendCard(items["card-name-input"], items["card-src-input"])
              .then((res) => {
                sectionCard.addItemPrepend(createClassCard(res.name, res.link, res.owner._id, res._id, res.likes));
              })
              .catch((err) => {
                console.log(err);
              });
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

const info = new UserInfo(".profile__name", ".profile__status", ".profile__avatar");

const popupProfileWithForm = new PopupWithForm(
  {
    submit: (inputItems) => {
      renderLoading(true);

      info.setUserInfo(inputItems);

      popupProfileWithForm.close();
    },
  },
  "#popup__profile"
);

popupProfileWithForm.setEventListener();

const popupAvatarEddWithForm = new PopupWithForm(
  {
    submit: (inputItem) => {
      renderLoading(true);

      info.setUserAvatar(inputItem);

      popupAvatarEddWithForm.close();
    }
  },
  "#popup__avatar-add"
)

popupAvatarEddWithForm.setEventListener()

function createClassCard(name, link, userId, cardId, likes) {
  const card = new Card(name, link, "#element", userId, cardId, likes, {
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

export function renderLoading(isLoading) {
  if (isLoading) {
    popupProfileButton.textContent = "Сохранение...";
    popupAddButton.textContent = "Создание...";
    popupAvatarAddButton.textContent = "Сохранение...";
  }
  else {
    popupProfileButton.textContent = "Сохранить";
    popupAddButton.textContent = "Создать";
    popupAvatarAddButton.textContent = "Сохранить";
  }
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

profileAvatarOverlay.addEventListener("click", () => {
  popupAvatarAddValidation.resetValidation();

  popupAvatarEddWithForm.open();
})


api.setProfileInfo()
  .then((res) => {
    profileName.textContent = res.name;
    profileStatus.textContent = res.about;
    profileAvatar.src = res.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

api.initialCards()
  .then((res) => {
    const sectionCard = new Section(
      {
        items: res,
        renderer: (items) => {
          items.forEach((item) => {
            sectionCard.addItemAppend(createClassCard(item.name, item.link, item.owner._id, item._id, item.likes));
          });
        },
      },
      ".elements"
    );

    sectionCard.renderCards();
  })
  .catch((err) => {
    console.log(err);
  });




import "./index.css";

import {
  profileEditButton,
  buttonAdd,
  popupProfileName,
  popupProfileStatus,
  settings,
  profileAvatarOverlay,
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

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

const popupCardWithImage = new PopupWithImage("#popup-card");

popupCardWithImage.setEventListener();

const sectionCard = new Section(
  {
    renderer: (item) => {
      const card = new Card(item.name, item.link, "#element", item.owner._id, item._id, item.likes, info.userId, {
        handleOpenPopupCard: (name, image) => {
          popupCardWithImage.open(name, image);
        },
        handleOpenPopupDelCard: (card) => {
          popupWithDelCard.open(card, item._id);
        },
        handlePutLike: (card) => {
          api.putLike(item._id)
            .then((res) => {
              card.toggleLike(res.likes.length);
            })
            .catch((err) => {
              console.log(err);
            });
        },
        handleDelLike: (card) => {
          api.delLike(item._id)
            .then((res) => {
              card.toggleLike(res.likes.length);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
      const cardElement = card.createCard();

      return cardElement;
    },
  },
  ".elements"
);

const popupAddWithForm = new PopupWithForm(
  {
    submit: (item) => {
      popupAddWithForm.renderLoading(true, "Создание...");

      api.sendCard(item["card-name-input"], item["card-src-input"])
        .then((res) => {
          sectionCard.addItemPrepend(res);

          popupAddWithForm.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupAddWithForm.renderLoading(false)
        });
    },
  },
  "#popup__add"
);

popupAddWithForm.setEventListener();

const popupWithDelCard = new PopupWithDelCard("#popup__del", {
  handleDelCard: (id, card) => {
    api.deleteCard(id)
      .then(() => {
        card.remove();
        card = null;
        popupWithDelCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

popupWithDelCard.setEventListener();

const info = new UserInfo(".profile__name", ".profile__status", ".profile__avatar");

const popupProfileWithForm = new PopupWithForm(
  {
    submit: (inputItems) => {
      popupProfileWithForm.renderLoading(true);

      api.sendProfileInfo(inputItems["name-input"], inputItems["status-input"])
        .then(() => {
          info.setUserInfo(inputItems["name-input"], inputItems["status-input"]);

          popupProfileWithForm.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupProfileWithForm.renderLoading(false)
        })
    },
  },
  "#popup__profile"
);

popupProfileWithForm.setEventListener();

const popupAvatarEddWithForm = new PopupWithForm(
  {
    submit: (inputItem) => {
      popupAvatarEddWithForm.renderLoading(true);

      api.changeAvatar(inputItem["avatar-src-input"])
        .then(() => {
          info.setUserAvatar(inputItem["avatar-src-input"]);

          popupAvatarEddWithForm.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupAvatarEddWithForm.renderLoading(false)
        })
    }
  },
  "#popup__avatar-add"
)

popupAvatarEddWithForm.setEventListener()

profileEditButton.addEventListener("click", () => {
  const { name, status } = info.getUserInfo()
  popupProfileName.value = name;

  popupProfileStatus.value = status;

  formValidators['profile-popup'].resetValidation();

  popupProfileWithForm.open();
});

buttonAdd.addEventListener("click", () => {
  formValidators['add-card-popup'].resetValidation();

  popupAddWithForm.open();
});

profileAvatarOverlay.addEventListener("click", () => {
  formValidators['avatar-popup'].resetValidation();

  popupAvatarEddWithForm.open();
})

Promise.all([api.setProfileInfo(), api.initialCards()])
  .then(([user, cards]) => {
    info.setUserProfileInfo(user.name, user.about, user.avatar, user._id)

    cards.forEach((card) => {
      sectionCard.addItem(card);
    })
  })
  .catch((err) => {
    console.log(err);
  });






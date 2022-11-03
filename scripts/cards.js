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

const popupCard = document.querySelector("#popup-card");

const popupCardCaption = popupCard.querySelector(".popup__caption-card");

const popupCardImage = popupCard.querySelector(".popup__image-card");

const popupCardCloseButton = popupCard.querySelector(".popup__close");

export class Card {
  constructor(name, image, templateCard) {
    this._name = name;
    this._image = image;
    this._templateCard = templateCard;
    this._templateName =
      this._templateCard.content.querySelector(".element__name");
    this._templateImg =
      this._templateCard.content.querySelector(".element__image");
  }

  _createTemplateCard() {
    this._templateName.textContent = this._name;

    this._templateImg.src = this._image;

    this._templateImg.alt = this._name.textContent;

    const card = this._templateCard.content.cloneNode(true);

    return card;
  }

  _toggleLikeCardEvent(card) {
    card.querySelector(".element__like").addEventListener("click", (e) => {
      e.target.classList.toggle("element__like_active");
    });
  }

  _deleteCardEvent(card) {
    card.querySelector(".element__trash").addEventListener("click", (e) => {
      e.target.closest(".element").remove();
    });
  }

  _openPopupCardEvent(card) {
    card.querySelector(".element__image").addEventListener("click", (e) => {
      openPopupCard();

      popupCardImage.src = e.target.src;

      popupCardCaption.textContent = e.target

        .closest(".element")

        .querySelector(".element__name").textContent;
    });
  }

  createCard() {
    const card = this._createTemplateCard();
    this._toggleLikeCardEvent(card);

    this._deleteCardEvent(card);

    this._openPopupCardEvent(card);

    return card;
  }
}

function openPopupCard() {
  openPopup(popupCard);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");

  addEventEsc();
}

function addEventEsc() {
  document.addEventListener("keydown", closePopupEsc);
}

function removeEventEsc() {
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  removeEventEsc();
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

popupCard.addEventListener("click", function (e) {
  if (e.target === popupCard) {
    closePopup(popupCard);
  }
});

function closePopupCard() {
  closePopup(popupCard);
}

popupCardCloseButton.addEventListener("click", closePopupCard);

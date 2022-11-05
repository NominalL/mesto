const popupCard = document.querySelector("#popup-card");

const popupCardCaption = popupCard.querySelector(".popup__caption-card");

const popupCardImage = popupCard.querySelector(".popup__image-card");

export class Card {
  constructor(name, image, templateCard) {
    this._name = name;
    this._image = image;
    this._templateCard = templateCard;
  }

  _createTemplateCard() {
    const card = document
      .querySelector(this._templateCard)
      .content.cloneNode(true);

    card.querySelector(".element__name").textContent = this._name;

    card.querySelector(".element__image").src = this._image;

    card.querySelector(".element__image").alt = this._name.textContent;

    return card;
  }

  _toggleLikeCardEventCallback(e) {
    e.target.classList.toggle("element__like_active");
  }

  _toggleLikeCardEvent(card) {
    card.querySelector(".element__like").addEventListener("click", (e) => {
      this._toggleLikeCardEventCallback(e);
    });
  }

  _deleteCardEventCallback(e) {
    e.target.closest(".element").remove();
  }

  _deleteCardEvent(card) {
    card.querySelector(".element__trash").addEventListener("click", (e) => {
      this._deleteCardEventCallback(e);
    });
  }

  _addEventEsc() {
    document.addEventListener("keydown", this._closePopupEsc);
  }

  _removeEventEsc() {
    document.removeEventListener("keydown", this._closePopupEsc);
  }

  _closePopupEsc(evt) {
    if (evt.key === "Escape") {
      popupCard.classList.remove("popup_opened");

      this._removeEventEsc;
    }
  }

  _openPopupCardEventCallback() {
    popupCard.classList.add("popup_opened");

    this._addEventEsc();

    popupCardImage.src = this._image;

    popupCardCaption.textContent = this._name;
  }

  _openPopupCardEvent(card) {
    card.querySelector(".element__image").addEventListener("click", () => {
      this._openPopupCardEventCallback();
    });
  }

  _setEventListenersCard(card) {
    this._toggleLikeCardEvent(card);

    this._deleteCardEvent(card);

    this._openPopupCardEvent(card);
  }

  createCard() {
    const card = this._createTemplateCard();

    this._setEventListenersCard(card);

    return card;
  }
}

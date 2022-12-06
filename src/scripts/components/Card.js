export class Card {
  constructor(name, image, counter, templateCard, id, { handleOpenPopupCard, handleOpenPopupDelCard }) {
    this._name = name;
    this._image = image;
    this._id = id;
    this._counterValue = counter;
    this._handleOpenPopupCard = handleOpenPopupCard;
    this._handleOpenPopupDelCard = handleOpenPopupDelCard;
    this._templateCard = document.querySelector(templateCard).content;
    this._popupDelCard = document.querySelector("#popup__del");
  }

  _createTemplateCard() {
    this._card = this._templateCard.querySelector(".element").cloneNode(true);

    this._cardName = this._card.querySelector(".element__name");

    this._cardImage = this._card.querySelector(".element__image");

    this._cardLike = this._card.querySelector(".element__like");

    this._cardLikeCounter = this._card.querySelector(".element__counter");

    this._cardTrash = this._card.querySelector(".element__trash");

    if (this._id != '5bdf4960f51a4bfdb2402408') {
      this._cardTrash.remove();
    }

    this._cardName.textContent = this._name;

    this._cardImage.src = this._image;

    this._cardImage.alt = this._name;

    this._cardLikeCounter.textContent = this._counterValue;
  }

  _toggleLikeCardEventCallback() {
    this._cardLike.classList.toggle("element__like_active");
  }

  _deleteCardEventCallback() {
    this._card.remove();
    this._card = null;
  }

  _setEventListenersCard() {
    this._cardLike.addEventListener("click", () => {
      this._toggleLikeCardEventCallback();
    });

    if (this._id === '5bdf4960f51a4bfdb2402408') {
      this._cardTrash
        .addEventListener("click", () => {
          this._handleOpenPopupDelCard(this._card);
        });
    }


    this._cardImage.addEventListener("click", () => {
      this._handleOpenPopupCard(this._name, this._image);
    });
  }

  createCard() {
    this._createTemplateCard();

    this._setEventListenersCard();

    return this._card;
  }
}

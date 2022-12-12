export class Card {
  constructor(name, image, templateCard, creatorId, cardId, likes, userId, { handleOpenPopupCard, handleOpenPopupDelCard, handlePutLike, handleDelLike }) {
    this._name = name;
    this._image = image;
    this._creatorId = creatorId;
    this._userId = userId;
    this._cardId = cardId;
    this._likes = likes;
    this._handleOpenPopupCard = handleOpenPopupCard;
    this._handleOpenPopupDelCard = handleOpenPopupDelCard;
    this._handlePutLike = handlePutLike;
    this._handleDelLike = handleDelLike;
    this._templateCard = document.querySelector(templateCard).content;
  }

  _createTemplateCard() {
    this._card = this._templateCard.querySelector(".element").cloneNode(true);

    this._cardName = this._card.querySelector(".element__name");

    this._cardImage = this._card.querySelector(".element__image");

    this._cardLike = this._card.querySelector(".element__like");

    this._cardLikeCounter = this._card.querySelector(".element__counter");

    this._cardTrash = this._card.querySelector(".element__trash");

    if (this._creatorId != this._userId) {
      this._cardTrash.remove();
    }

    this._likes.forEach((creator) => {
      if (creator._id === this._userId) {
        this._cardLike.classList.add("element__like_active");
      }
    })

    this._cardName.textContent = this._name;

    this._cardImage.src = this._image;

    this._cardImage.alt = this._name;

    this._cardLikeCounter.textContent = this._likes.length;
  }

  _toggleLikeCardEventCallback() {
    if (this._cardLike.classList.contains("element__like_active")) {
      this._handleDelLike(this._cardLike, this._cardLikeCounter);
    } else {
      this._handlePutLike(this._cardLike, this._cardLikeCounter);
    }
  }

  _setEventListenersCard() {
    this._cardLike.addEventListener("click", () => {
      this._toggleLikeCardEventCallback();
    });

    if (this._creatorId === this._userId) {
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

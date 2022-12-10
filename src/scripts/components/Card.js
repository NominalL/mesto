export class Card {
  constructor(name, image, templateCard, userId, cardId, likes, { handleOpenPopupCard, handleOpenPopupDelCard, handlePutLike, handleDelLike }) {
    this._name = name;
    this._image = image;
    this._userId = userId;
    this._cardId = cardId;
    this._likes = likes;
    this._handleOpenPopupCard = handleOpenPopupCard;
    this._handleOpenPopupDelCard = handleOpenPopupDelCard;
    this._handlePutLike = handlePutLike;
    this._handleDelLike = handleDelLike;
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

    if (this._userId != '5bdf4960f51a4bfdb2402408') {
      this._cardTrash.remove();
    }

    this._likes.forEach((user) => {
      if (user._id === '5bdf4960f51a4bfdb2402408') {
        this._cardLike.classList.add("element__like_active");
      }
    })

    this._cardName.textContent = this._name;

    this._cardImage.src = this._image;

    this._cardImage.alt = this._name;

    this._cardLikeCounter.textContent = this._likes.length;
  }

  _toggleLikeCardEventCallback() {
    this._cardLike.classList.toggle("element__like_active");

    this._cardLikeCounter.textContent++;

    if (!this._cardLike.classList.contains("element__like_active")) {
      this._handleDelLike();

      if (this._likes.length === 0) { this._cardLikeCounter.textContent = this._likes.length }
      else { this._cardLikeCounter.textContent = this._likes.length - 1; }

    } else {
      this._handlePutLike();
    }
  }

  _setEventListenersCard() {
    this._cardLike.addEventListener("click", () => {
      this._toggleLikeCardEventCallback();
    });

    if (this._userId === '5bdf4960f51a4bfdb2402408') {
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

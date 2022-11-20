export class Card {
  constructor(name, image, templateCard, { handleOpenPopupCard }) {
    this._name = name;
    this._image = image;
    this._handleOpenPopupCard = handleOpenPopupCard;
    this._templateCard = document.querySelector(templateCard).content;
  }

  _createTemplateCard() {
    this._card = this._templateCard.querySelector(".element").cloneNode(true);

    this._cardName = this._card.querySelector(".element__name");

    this._cardImage = this._card.querySelector(".element__image");

    this._cardLike = this._card.querySelector(".element__like");

    this._cardTrash = this._card.querySelector(".element__trash");

    this._cardName.textContent = this._name;

    this._cardImage.src = this._image;

    this._cardImage.alt = this._name;
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

    this._card
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._deleteCardEventCallback();
      });

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

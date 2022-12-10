import Popup from "./Popup.js";

export default class PopupWithDelCard extends Popup {
  constructor(popup, { handleDelCard }) {
    super(popup);
    this._popup = document.querySelector(popup);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._handleDelCard = handleDelCard;
  }

  close() {
    super.close()

    this._popupForm.removeEventListener("submit", this._submit)
  }

  _handleSubmit(card, id) {
    card.remove();
    card = null;

    this._handleDelCard(id);

    this.close()
  }

  _submitPopupForm(card, id) {
    this._popupForm.addEventListener("submit", this._submit = (evt) => {
      evt.preventDefault();

      this._handleSubmit(card, id);
    });
  }

  setEventListener(card, id) {
    super.setEventListener();

    this._submitPopupForm(card, id);
  }
}


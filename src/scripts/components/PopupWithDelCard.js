import Popup from "./Popup.js";

export default class PopupWithDelCard extends Popup {
  constructor(popup, { handleDelCard }) {
    super(popup);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._handleDelCard = handleDelCard;
  }

  open(card, id) {
    super.open();

    this._submitPopupForm(card, id);
  }

  close() {
    super.close()

    this._popupForm.removeEventListener("submit", this._submit)
  }

  _handleSubmit(card, id) {
    this._handleDelCard(id, card);
  }

  _submitPopupForm(card, id) {
    this._popupForm.addEventListener("submit", this._submit = (evt) => {
      evt.preventDefault();

      this._handleSubmit(card, id);
    });
  }

  setEventListener() {
    super.setEventListener();
  }
}


import Popup from "./Popup.js";

export default class PopupWithDelCard extends Popup {
  constructor(popup, { handleDelCard }) {
    super(popup);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._handleDelCard = handleDelCard;
  }

  open(card, id) {
    super.open();

    this._card = card;
    this._id = id;
  }

  _handleSubmit() {
    this._handleDelCard(this._id, this._card);
  }

  _submitPopupForm() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleSubmit();
    });
  }

  setEventListener() {
    super.setEventListener();

    this._submitPopupForm();
  }
}


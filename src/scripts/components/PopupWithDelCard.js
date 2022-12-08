import Popup from "./Popup.js";
import { api } from "../../pages/index.js";

export default class PopupWithDelCard extends Popup {
  constructor(popup) {
    super(popup);
    this._popup = document.querySelector(popup);
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  _handleSubmit(card, id) {
    card.remove();
    card = null;

    api.deleteCard(id)
      .catch((err) => {
        console.log(err);
      });

    super.close()
  }

  _submitPopupForm(card, id) {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleSubmit(card, id);
    });
  }

  setEventListener(card, id) {
    super.setEventListener();

    this._submitPopupForm(card, id);
  }
}

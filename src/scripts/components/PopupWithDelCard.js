import Popup from "./Popup.js";

export default class PopupWithDelCard extends Popup {
  constructor(popup) {
    super(popup);
    this._popup = document.querySelector(popup);
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  _handleSubmit(card, id) {
    card.remove();
    card = null;

    fetch(`https://mesto.nomoreparties.co/v1/cohort-55/cards/${id}`,
      {
        method: 'DELETE',
        headers: {
          authorization: 'eca7d056-7701-4d08-8699-65b7e7c67df3'
        }
      })

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

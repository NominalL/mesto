import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._name = document.querySelector(".popup__caption-card");
    this._image = document.querySelector(".popup__image-card");
  }

  open(name, image) {
    super.open();

    this._name.src = image;
    this._name.alt = name;
    this._image.textContent = name;
  }
}

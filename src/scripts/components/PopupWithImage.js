import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._name = this._popup.querySelector(".popup__caption-card");
    this._image = this._popup.querySelector(".popup__image-card");
  }

  open(name, image) {
    super.open();

    this._image.src = image;
    this._image.alt = name;
    this._name.textContent = name;
  }
}

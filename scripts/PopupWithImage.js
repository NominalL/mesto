import Popup from "./Popup.js";
import {
  popupCardImage,
  popupCardCaption,
} from "./constants.js";

export default class PopupWithImage extends Popup {
  constructor(popup, image, name) {
    super(popup);
    this._image = image;
    this._name = name;
  }

  open() {
    super.open();

    popupCardImage.src = this._image;
    popupCardImage.alt = this._name;
    popupCardCaption.textContent = this._name;
  }
}

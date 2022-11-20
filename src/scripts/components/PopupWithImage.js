import Popup from "./Popup.js";
import { popupCardImage, popupCardCaption } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open(name, image) {
    super.open();

    popupCardImage.src = image;
    popupCardImage.alt = name;
    popupCardCaption.textContent = name;
  }
}

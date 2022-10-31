const profileEditButton = document.querySelector(".profile__edit-button");

const popupProfile = document.querySelector("#popup__profile");

const popupProfileContainer = popupProfile.querySelector(".popup__container");

const popupProfileButton = popupProfile.querySelector(".popup__submit-button");

const popupProfileCloseButton = popupProfile.querySelector(".popup__close");

const profileName = document.querySelector(".profile__name");

const profileStatus = document.querySelector(".profile__status");

const popupProfileName = popupProfile.querySelector(".popup__input_name");

const popupProfileStatus = popupProfile.querySelector(".popup__input_status");

const popupProfileSubmitButton = popupProfile.querySelector(".popup__form");

const templateCard = document.querySelector("#element");

const templateName = templateCard.content.querySelector(".element__name");

const templateImg = templateCard.content.querySelector(".element__image");

const elements = document.querySelector(".elements");

const popupAdd = document.querySelector("#popup__add");

const popupAddContainer = popupAdd.querySelector(".popup__container");

const popupAddButton = popupAdd.querySelector(".popup__submit-button");

const buttonAdd = document.querySelector(".profile__add-button");

const popupAddCloseButton = popupAdd.querySelector(".popup__close");

const popupAddSubmitButton = popupAdd.querySelector(".popup__form");

const popupAddInputName = popupAdd.querySelector(".popup__input_card-name");

const popupAddInputSrc = popupAdd.querySelector(".popup__input_card-src");

const popupCard = document.querySelector("#popup-card");

const popupCardContainer = popupCard.querySelector(".popup__content-card");

const popupCardImage = popupCard.querySelector(".popup__image-card");

const popupCardCloseButton = popupCard.querySelector(".popup__close");

const popupCardCaption = popupCard.querySelector(".popup__caption-card");

class Card {
  constructor(name, image, templateCard) {
    this._name = name;
    this._image = image;
    this._templateCard = templateCard;
    this._templateName =
      this._templateCard.content.querySelector(".element__name");
    this._templateImg =
      this._templateCard.content.querySelector(".element__image");
  }

  _createTemplateCard() {
    this._templateName.textContent = this._name;

    this._templateImg.src = this._image;

    this._templateImg.alt = templateName.textContent;

    const card = this._templateCard.content.cloneNode(true);

    return card;
  }

  _toggleLikeCardEvent(card) {
    card.querySelector(".element__like").addEventListener("click", (e) => {
      e.target.classList.toggle("element__like_active");
    });
  }

  _deleteCardEvent(card) {
    card.querySelector(".element__trash").addEventListener("click", (e) => {
      e.target.closest(".element").remove();
    });
  }

  _openPopupCardEvent(card) {
    card.querySelector(".element__image").addEventListener("click", (e) => {
      openPopupCard();

      popupCardImage.src = e.target.src;

      popupCardCaption.textContent = e.target

        .closest(".element")

        .querySelector(".element__name").textContent;
    });
  }

  createCard() {
    const card = this._createTemplateCard();
    this._toggleLikeCardEvent(card);

    this._deleteCardEvent(card);

    this._openPopupCardEvent(card);

    return card;
  }
}

for (let i = 0; i < initialCards.length; i++) {
  renderCard(initialCards[i].name, initialCards[i].link, templateCard);
}

function renderCard(name, image, templateCard) {
  const card = new Card(name, image, templateCard);
  elements.prepend(card.createCard());
}

function openPopup(popup) {
  popup.classList.add("popup_opened");

  addEventEsc();
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  removeEventEsc();
}

function submitPopupAdd() {
  renderCard(popupAddInputName.value, popupAddInputSrc.value, templateCard);

  closePopupAdd();
}

function openPopupAdd() {
  popupAddInputName.value = "";

  popupAddInputSrc.value = "";

  disableButton(popupAddButton, settings);

  hideInputError(popupAddInputName, settings);

  hideInputError(popupAddInputSrc, settings);

  openPopup(popupAdd);
}

function closePopupAdd() {
  closePopup(popupAdd);
}

function openPopupProfile() {
  popupProfileName.value = profileName.textContent;

  popupProfileStatus.value = profileStatus.textContent;

  enableButton(popupProfileButton, settings);

  hideInputError(popupProfileName, settings);

  hideInputError(popupProfileStatus, settings);

  openPopup(popupProfile);
}

function closePopupProfile() {
  closePopup(popupProfile);
}

function submitPopupProfile() {
  profileName.textContent = popupProfileName.value;

  profileStatus.textContent = popupProfileStatus.value;

  closePopupProfile();
}

function openPopupCard() {
  openPopup(popupCard);
}

function closePopupCard() {
  closePopup(popupCard);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function addEventEsc() {
  document.addEventListener("keydown", closePopupEsc);
}

function removeEventEsc() {
  document.removeEventListener("keydown", closePopupEsc);
}

popupProfileSubmitButton.addEventListener("submit", submitPopupProfile);

profileEditButton.addEventListener("click", openPopupProfile);

popupProfileCloseButton.addEventListener("click", closePopupProfile);

buttonAdd.addEventListener("click", openPopupAdd);

popupAddCloseButton.addEventListener("click", closePopupAdd);

popupAddSubmitButton.addEventListener("submit", submitPopupAdd);

popupCardCloseButton.addEventListener("click", closePopupCard);

[popupAdd, popupCard, popupProfile].forEach((p) => {
  p.addEventListener("click", function (e) {
    if (e.target === p) {
      closePopup(p);
    }
  });
});

const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector("#popup__profile");
const popupProfileButton = popupProfile.querySelector(".popup__submit-button");
const popupProfileOvelay = popupProfile.querySelector(".popup__overlay");
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
const popupAddButton = popupAdd.querySelector(".popup__submit-button");
const popupAddOverlay = popupAdd.querySelector(".popup__overlay");
const buttonAdd = document.querySelector(".profile__add-button");
const popupAddCloseButton = popupAdd.querySelector(".popup__close");
const popupAddSubmitButton = popupAdd.querySelector(".popup__form");
const popupAddInputName = popupAdd.querySelector(".popup__input_card-name");
const popupAddInputSrc = popupAdd.querySelector(".popup__input_card-src");
const popupCard = document.querySelector(".popup-card");
const popupCardOverlay = popupCard.querySelector(".popup-card__overlay");
const popupCardImage = popupCard.querySelector(".popup-card__image");
const popupCardCloseButton = popupCard.querySelector(".popup-card__close");
const popupCardCaption = popupCard.querySelector(".popup-card__caption");

for (let i = 0; i < initialCards.length; i++) {
  renderCard(initialCards[i].name, initialCards[i].link);
}

function renderCard(name, image) {
  elements.prepend(createCard(name, image));
}

function createCard(name, image) {
  templateName.textContent = name;
  templateImg.src = image;
  templateImg.alt = templateName.textContent;
  const card = templateCard.content.cloneNode(true);
  card.querySelector(".element__like").addEventListener("click", (e) => {
    e.target.classList.toggle("element__like_active");
  });
  card.querySelector(".element__trash").addEventListener("click", (e) => {
    e.target.closest(".element").remove();
  });
  card.querySelector(".element__image").addEventListener("click", (e) => {
    openPopupCard();
    popupCardImage.src = e.target.src;
    popupCardCaption.textContent = e.target
      .closest(".element")
      .querySelector(".element__name").textContent;
  });
  return card;
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function submitPopupAdd() {
  renderCard(popupAddInputName.value, popupAddInputSrc.value);
  closePopupAdd();
}

function openPopupAdd() {
  popupAddInputName.value = "";
  popupAddInputSrc.value = "";
  disableButton(popupAddButton, setting);

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
      closePopupAdd();
    }
  });

  openPopup(popupAdd);
}

function closePopupAdd() {
  document.removeEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
      closePopupAdd();
    }
  });

  closePopup(popupAdd);
}

function openPopupProfile() {
  popupProfileName.value = profileName.textContent;
  popupProfileStatus.value = profileStatus.textContent;

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
      closePopupProfile();
    }
  });

  openPopup(popupProfile);
  enableButton(popupProfileButton, setting);
}

function closePopupProfile() {
  document.removeEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
      closePopupProfile();
    }
  });

  closePopup(popupProfile);
}

function submitPopupProfile() {
  profileName.textContent = popupProfileName.value;
  profileStatus.textContent = popupProfileStatus.value;
  closePopupProfile();
}

function openPopupCard() {
  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
      closePopupCard();
    }
  });

  popupCard.classList.add("popup-card__opened");
}

function closePopupCard() {
  document.removeEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
      closePopupCard();
    }
  });

  popupCard.classList.remove("popup-card__opened");
}

document.addEventListener("keydown", function (e) {
  if (e.keyCode === 27) {
    closePopupProfile();
    closePopupAdd();
    closePopupCard();
  }
});

popupProfileSubmitButton.addEventListener("submit", submitPopupProfile);

profileEditButton.addEventListener("click", openPopupProfile);

popupProfileCloseButton.addEventListener("click", closePopupProfile);

popupProfileOvelay.addEventListener("click", closePopupProfile);

buttonAdd.addEventListener("click", openPopupAdd);

popupAddCloseButton.addEventListener("click", closePopupAdd);

popupAddOverlay.addEventListener("click", closePopupAdd);

popupAddSubmitButton.addEventListener("submit", submitPopupAdd);

popupCardCloseButton.addEventListener("click", closePopupCard);

popupCardOverlay.addEventListener("click", closePopupCard);

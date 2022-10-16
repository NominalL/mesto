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
  addEventEsc();
}

function closePopup() {
  document.querySelector(".popup_opened").classList.remove("popup_opened");
  removeEventEsc();
}

function submitPopupAdd() {
  renderCard(popupAddInputName.value, popupAddInputSrc.value);
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
  closePopup();
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
  closePopup();
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
  closePopup();
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup();
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

popupAdd.addEventListener("click", function (e) {
  if (e.target === popupAdd) {
    closePopupAdd();
  }
});

popupCard.addEventListener("click", function (e) {
  if (e.target === popupCard) {
    closePopupCard();
  }
});

popupProfile.addEventListener("click", function (e) {
  if (e.target === popupProfile) {
    closePopupProfile();
  }
});

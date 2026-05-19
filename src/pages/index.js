// imports
import Api from "../utils/Api.js";
import "./index.css";
import {
  enableValidation,
  resetValidation,
  settings,
} from "../scripts/validation.js";

// Selections

//avatar modal

const avatarModal = document.querySelector("#avatar-modal");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarForm = document.forms["avatarForm"];
const avatarInput = avatarModal.querySelector("#avatar-input");
const profileAvatar = document.querySelector(".profile__avatar");
const profileAvatarBtn = document.querySelector(".profile__avatar-btn");

// delete modal

const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteCancelBtn = deleteModal.querySelector(".modal__cancel-btn");
const deleteConfirmBtn = deleteModal.querySelector(".modal__save-btn");

// edit profile modal

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const profileUserName = document.querySelector(".profile__user-name");
const profileUserInfo = document.querySelector(".profile__user-info");
const modalForm = document.forms["editProfileForm"];
const modalInputName = editProfileModal.querySelector("#profile-name-input");
const modalInputInfo = editProfileModal.querySelector(
  "#profile-description-input",
);

// new post modal

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const modalPostForm = document.forms["newPostForm"];
const postImageInput = newPostModal.querySelector("#post-image-input");
const newPostCaptionInput = newPostModal.querySelector(
  "#new-post-caption-input",
);
const modalButton = newPostModal.querySelector(".modal__save-btn");

// preview image modal

const previewModal = document.querySelector("#preview-modal");
const previewCloseBtn = previewModal.querySelector(
  ".modal__close-btn_type_preview",
);
const previewCaption = previewModal.querySelector(".modal__caption");
const previewImage = previewModal.querySelector(".modal__image");

// Card template

const cardTemplate = document.querySelector("#card__template");

// Cards list

const cardsList = document.querySelector(".cards__list");

// Variables

let selectedCard;
let selectedCardId;

// instantiations and module method calls

const api = new Api("https://around-api.en.tripleten-services.com/v1", {
  authorization: "06da3ea9-7ded-4d0e-bfec-2391d370b0b0",
  "Content-Type": "application/json",
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    profileUserName.textContent = user.name;
    profileUserInfo.textContent = user.about;
    profileAvatar.src = user.avatar;

    cards.forEach((item) => {
      const cardEl = getCardElement(item);
      cardsList.append(cardEl);
    });
  })
  .catch(console.error);

// card creation function

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__text");
  const cardImage = cardElement.querySelector(".card__image");
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  const likeBtn = cardElement.querySelector(".card__btn");
  if (data.isLiked) {
    likeBtn.classList.add("card__btn_liked");
  }
  likeBtn.addEventListener("click", () => {
    const isLiked = likeBtn.classList.contains("card__btn_liked");
    const action = isLiked ? api.dislikeCard(data._id) : api.likeCard(data._id);

    action
      .then(() => {
        likeBtn.classList.toggle("card__btn_liked");
      })
      .catch(console.error);
  });
  const deleteBtn = cardElement.querySelector(".card__delete-btn");
  deleteBtn.addEventListener("click", () => {
    handleDeleteCard(cardElement, data);
  });

  cardImage.addEventListener("click", () => {
    previewCaption.textContent = data.name;
    previewImage.src = data.link;
    previewImage.alt = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

// Functions

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  renderLoading(true, submitBtn);
  api
    .editUserInfo({ name: modalInputName.value, about: modalInputInfo.value })
    .then((user) => {
      profileUserName.textContent = user.name;
      profileUserInfo.textContent = user.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => renderLoading(false, submitBtn));
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  renderLoading(true, submitBtn);
  api
    .addCard({ name: newPostCaptionInput.value, link: postImageInput.value })
    .then((card) => {
      const cardEl = getCardElement(card);
      cardsList.prepend(cardEl);
      modalPostForm.reset();
      resetValidation(modalPostForm, settings);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => renderLoading(false, submitBtn));
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

function handleDeleteSubmit() {
  renderLoading(true, deleteConfirmBtn, "Delete");
  api
    .removeCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => renderLoading(false, deleteConfirmBtn, "Delete"));
}

function renderLoading(isLoading, button, defaultText = "Save") {
  button.textContent = isLoading
    ? defaultText === "Delete"
      ? "Deleting..."
      : "Saving..."
    : defaultText;
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  renderLoading(true, submitBtn);
  api
    .updateAvatar(avatarInput.value)
    .then((user) => {
      profileAvatar.src = user.avatar;
      avatarForm.reset();
      resetValidation();
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => renderLoading(false, submitBtn));
}

// Listeners

editProfileBtn.addEventListener("click", function () {
  modalInputName.value = profileUserName.textContent;
  modalInputInfo.value = profileUserInfo.textContent;
  resetValidation(modalForm, settings);
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", () => {
  closeModal(newPostModal);
});

previewCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

modalForm.addEventListener("submit", handleProfileFormSubmit);

modalPostForm.addEventListener("submit", handleNewPostFormSubmit);

deleteModalCloseBtn.addEventListener("click", () => closeModal(deleteModal));

deleteCancelBtn.addEventListener("click", () => closeModal(deleteModal));

deleteConfirmBtn.addEventListener("click", handleDeleteSubmit);

profileAvatarBtn.addEventListener("click", () => openModal(avatarModal));

avatarModalCloseBtn.addEventListener("click", () => closeModal(avatarModal));

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Close modal by clicking the overlay

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

enableValidation(settings);

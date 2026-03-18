// Cards
const initialCards = [
  {
    name: "val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// Selections

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const profileUserName = document.querySelector(".profile__user-name");
const profileUserInfo = document.querySelector(".profile__user-info");
const modalForm = editProfileModal.querySelector(".modal__form");
const modalInputName = editProfileModal.querySelector("#profile-name-input");
const modalInputInfo = editProfileModal.querySelector(
  "#profile-description-input",
);

const modalPostForm = newPostModal.querySelector(".modal__form");
const postImageInput = newPostModal.querySelector("#post-image-input");
const newPostCaptionInput = newPostModal.querySelector(
  "#new-post-caption-input",
);

const previewModal = document.querySelector("#preview-modal");
const previewCloseBtn = previewModal.querySelector(
  ".modal__close_btn-type-preview",
);
const previewCaption = previewModal.querySelector(".modal__caption");
const previewImage = previewModal.querySelector(".modal__image");

const cardTemplate = document.querySelector("#card__template");

//card template

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
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__btn_liked");
  });
  const deleteBtn = cardElement.querySelector(".card__delete-btn");
  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    previewCaption.textContent = data.name;
    previewImage.src = data.link;
    previewImage.alt = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

//cardslist

const cardsList = document.querySelector(".cards__list");

// Functions

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUserName.textContent = modalInputName.value;
  profileUserInfo.textContent = modalInputInfo.value;
  closeModal(editProfileModal);
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  const newPostValues = {
    name: newPostCaptionInput.value,
    link: postImageInput.value,
  };
  const cardEl = getCardElement(newPostValues);
  cardsList.prepend(cardEl);
  closeModal(newPostModal);
  modalPostForm.reset();
}

// listeners

editProfileBtn.addEventListener("click", function () {
  modalInputName.value = profileUserName.textContent;
  modalInputInfo.value = profileUserInfo.textContent;
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

initialCards.forEach(function (item) {
  const cardEl = getCardElement(item);
  cardsList.append(cardEl);
});

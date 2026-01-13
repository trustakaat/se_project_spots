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
  "#profile-description-input"
);

const modalPostForm = newPostModal.querySelector(".modal__form");
const postImageInput = newPostModal.querySelector("#post-image-input");
const newPostCaptionInput = newPostModal.querySelector(
  "#new-post-caption-input"
);

// Functions

function openModal(o) {
  o.classList.add("modal_is-opened");
}

function closeModal(c) {
  c.classList.remove("modal_is-opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUserName.textContent = modalInputName.value;
  profileUserInfo.textContent = modalInputInfo.value;
  closeModal(editProfileModal);
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  console.log(postImageInput.value);
  console.log(newPostCaptionInput.value);
  closeModal(newPostModal);
}

// listeners

editProfileBtn.addEventListener("click", function () {
  modalInputName.value = profileUserName.textContent;
  modalInputInfo.value = profileUserInfo.textContent;
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

modalForm.addEventListener("submit", handleProfileFormSubmit);

modalPostForm.addEventListener("submit", handleNewPostFormSubmit);

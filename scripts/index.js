const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModel = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModel.querySelector(".modal__close-btn");

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

editProfileBtn.addEventListener("click", function () {
  editProfileModel.classList.toggle("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModel.classList.toggle("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.toggle("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.toggle("modal_is-opened");
});

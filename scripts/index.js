// Переменные
let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_category_name');
let jobInput = formElement.querySelector('.popup__input_category_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

// Функции
function popupOpener() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
}
function popupCloser() {
    popup.classList.remove('popup_opened');
}
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    popupCloser();
}
// Слушатели событий

openPopup.addEventListener('click', popupOpener);
closePopup.addEventListener('click', popupCloser);
formElement.addEventListener('submit', formSubmitHandler);

// Переменные

// Попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupShow = document.querySelector('.popup_type_show');

// Формы
const formElementEdit = document.querySelector('.popup__form_type_edit');
const nameInput = formElementEdit.querySelector('.popup__input_category_name');
const jobInput = formElementEdit.querySelector('.popup__input_category_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const formElementAdd = document.querySelector('.popup__form_type_add');
const placeInput = formElementAdd.querySelector('.popup__input_category_place');
const linkInput = formElementAdd.querySelector('.popup__input_category_link');

// Карточки
const template = document.querySelector('#template').content;
const places = document.querySelector('.places');

 // Функции
 // Создание и добавление карточек
function createCard(image, title) {
    const placeElement = template.querySelector('.place').cloneNode(true);
    
    places.prepend(placeElement);
    placeElement.querySelector('.place__image').src = image;
    placeElement.querySelector('.place__title').textContent = title;
    const likeButton = placeElement.querySelector('.place__like-button');
    likeButton.addEventListener('click', function placeLiker() {
        likeButton.classList.toggle('button_active')});
    const deleteButton = placeElement.querySelector('.place__delete-button');
    deleteButton.addEventListener('click', function placeDeleter () {
        placeElement.remove();
    });
    placeElement.querySelector('.place__image').addEventListener('click', function() {
        togglePopup(popupShow);
        popupShow.querySelector('.popup__image').src = image;
        popupShow.querySelector('.popup__description').textContent = title;
    });
    renderCard(placeElement, places);
    return placeElement;
};
initialCards.forEach(function (element) {
    createCard(element.link, element.name); 
});
function renderCard(item, container) {
    container.prepend(item);
} 
// Попапы
function togglePopup(element) { 
    element.classList.toggle('popup_opened');
};
//Формы
function submitFormEdit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(popupEdit);
};
function submitFormAdd (evt) {
    evt.preventDefault();
    createCard(linkInput.value, placeInput.value);
    togglePopup(popupAdd);
    formElementAdd.reset();
};

// Слушатели событий
popupEditOpenButton.addEventListener('click', function () {
    togglePopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});
popupAddOpenButton.addEventListener('click', function () {
    togglePopup(popupAdd);
});
popupEdit.querySelector('.popup__close').addEventListener('click', function() {
    togglePopup(popupEdit);
});
popupAdd.querySelector('.popup__close').addEventListener('click', function() {
    togglePopup(popupAdd);
});
popupShow.querySelector('.popup__close').addEventListener('click', function() {
    togglePopup(popupShow);
});
formElementEdit.addEventListener('submit', submitFormEdit);
formElementAdd.addEventListener('submit', submitFormAdd);

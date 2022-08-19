// Переменные

// Попапы
const popupEdit = document.querySelector('.popup-edit');
const openEditPopup = document.querySelector('.profile__edit-button');
const popupAdd = document.querySelector('.popup-add');
const openAddPopup = document.querySelector('.profile__add-button');
const popupShow = document.querySelector('.popup-show');

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

// Массивы
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

 // Функции
 // Создание карточек
function createPlace(image, title) {
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
        popupOpener(popupShow);
        popupShow.querySelector('.popup__image').src = image;
        popupShow.querySelector('.popup__description').textContent = title;
    });
};
initialCards.forEach(function (element) {
    createPlace(element.link, element.name); 
});
// Попапы
function popupOpener(element) { 
    element.classList.toggle('popup_opened');
};
//Формы
function formSubmitEdit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupOpener(popupEdit);
};
function formSubmitAdd (evt) {
    evt.preventDefault();
    createPlace(linkInput.value, placeInput.value);
    popupOpener(popupAdd);
    formElementAdd.reset();
};

// Слушатели событий
openEditPopup.addEventListener('click', function () {
    popupOpener(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});
openAddPopup.addEventListener('click', function () {
    popupOpener(popupAdd);
});
popupEdit.querySelector('.popup__close').addEventListener('click', function() {
    popupOpener(popupEdit);
});
popupAdd.querySelector('.popup__close').addEventListener('click', function() {
    popupOpener(popupAdd);
});
popupShow.querySelector('.popup__close').addEventListener('click', function() {
    popupOpener(popupShow);
});
formElementEdit.addEventListener('submit', formSubmitEdit);
formElementAdd.addEventListener('submit', formSubmitAdd);

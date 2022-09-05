
// Переменные

// Попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupShow = document.querySelector('.popup_type_show');

// Формы и инпуты
const formElementEdit = document.querySelector('.popup__form_type_edit');
const nameInput = formElementEdit.querySelector('#name-input');
const jobInput = formElementEdit.querySelector('#job-input');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const formElementAdd = document.querySelector('.popup__form_type_add');
const placeInput = formElementAdd.querySelector('#place-input');
const linkInput = formElementAdd.querySelector('#link-input');

// Карточки
const template = document.querySelector('#template').content;
const places = document.querySelector('.places');

 // Функции
 // Создание и добавление карточек
function createCard(image, title) {
    const placeElement = template.querySelector('.place').cloneNode(true);   
    const placeElementImage = placeElement.querySelector('.place__image')
    placeElementImage.src = image;
    placeElementImage.setAttribute('alt', `Фотография: ${title}`);
    placeElement.querySelector('.place__title').textContent = title;
    placeElement.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('place__like-button')) {
            placeElement.querySelector('.place__like-button').classList.toggle('button_active');
        } else if (evt.target.classList.contains('place__delete-button')) {
            placeElement.remove();
        } else if (evt.target.classList.contains('place__image')) {
            openPopup(popupShow);
            const popupShowImage = popupShow.querySelector('.popup__image')
            popupShowImage.src = image;
            popupShowImage.setAttribute('alt', `Фотография: ${title}`);
            popupShow.querySelector('.popup__description').textContent = title;
        }
    })
    return placeElement;
};
initialCards.forEach(function (element) {
    const card = createCard(element.link, element.name); 
    renderCard(card, places);
});
function renderCard(card, places) {
    places.prepend(card);
} 
// Попапы
function openPopup(element) { 
    element.classList.add('popup_opened');
    closePopupByClick(element);
    closePopupOnEsc(element);
};
function closePopup(element) { 
    element.classList.remove('popup_opened');
    element.removeEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            closePopup(element);
        }
    })
    document.removeEventListener('keydown', function(evt) {
        if (evt.key == "Escape") {
        closePopup(element);
        }
    })
    if (element.querySelector('.popup__form')) {
    const form = element.querySelector('.popup__form');
    const button = element.querySelector('.popup__button');
    disableValidation(form, button, configObject)
    }
};
//Формы

const configObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
enableValidation(configObject);

function submitFormEdit () {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
};
function submitFormAdd () {
    const card = createCard(linkInput.value, placeInput.value);
    renderCard(card, places);
    closePopup(popupAdd);
    formElementAdd.reset();
};

// Слушатели событий
popupEditOpenButton.addEventListener('click', function () {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});
popupAddOpenButton.addEventListener('click', function () {
    openPopup(popupAdd);
});

const closePopupByClick = (popup) => {
    popup.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    })
}
const closePopupOnEsc = (popup) => {  
    document.addEventListener('keydown', function(evt) {
        if (evt.key == "Escape") {
            closePopup(popup);
        }
    })
}
formElementEdit.addEventListener('submit', submitFormEdit);
formElementAdd.addEventListener('submit', submitFormAdd);


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
    placeElement.querySelector('.place__image').src = image;
    placeElement.querySelector('.place__title').textContent = title;
    const buttonLike = placeElement.querySelector('.place__like-button');
    buttonLike.addEventListener('click', function likePlace () {
        buttonLike.classList.toggle('button_active');
    });
    const buttonDelete = placeElement.querySelector('.place__delete-button');
    buttonDelete.addEventListener('click', function deletePlace () {
        placeElement.remove();
    });
    placeElement.querySelector('.place__image').addEventListener('click', function() {
        openPopup(popupShow);
        popupShow.querySelector('.popup__image').src = image;
        popupShow.querySelector('.popup__description').textContent = title;
        setClosingEventListeners(popupShow)
    });
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
};
function closePopup(element) { 
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', function(evt) {
        if (evt.key == "Escape") {
        closePopup(element);
        }
    })
    const config = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    }
    const form = element.querySelector('.popup__form')
    const input = element.querySelector('.popup__input')
    const inputs = Array.from(form.querySelectorAll('.popup__input'))
    const button = element.querySelector('.popup__button')
    goToValidationDefault(form, input, inputs, button, config);
};
//Формы
function submitFormEdit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
};
function submitFormAdd (evt) {
    evt.preventDefault();
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
    setClosingEventListeners(popupEdit)
});
popupAddOpenButton.addEventListener('click', function () {
    openPopup(popupAdd);
    setClosingEventListeners(popupAdd)
});

function setClosingEventListeners(popup) {
    popup.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    })
    document.addEventListener('keydown', function(evt) {
        if (evt.key == "Escape") {
        closePopup(popup);
        }
    })
}

formElementEdit.addEventListener('submit', submitFormEdit);
formElementAdd.addEventListener('submit', submitFormAdd);

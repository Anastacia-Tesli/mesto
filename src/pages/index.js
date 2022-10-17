import './index.css';
import { 
    initialCards, 
    placesSelector,
    popupEditSelector,
    popupAddSelector,
    popupShowSelector,
    popupEditOpenButton, 
    popupAddOpenButton, 
    formElementEdit, 
    formElementAdd, 
    nameInput, 
    jobInput, 
    configObject } from "../scripts/utils/constatnts.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Popup from "../scripts/components/Popup.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";

// Рендеринг карточек 

const createCard = (item) => {
    const card = new Card(item, '#template', handleCardClick);
    const cardElement = card.generateCard();
    cardsSection.addItems(cardElement);
}

const cardsSection = new Section({
    items: initialCards,
    renderer: (item) => {
        createCard(item)
    }
  },
  placesSelector
);
cardsSection.renderItems();

// Валидация

const formEditValidated = new FormValidator(configObject, formElementEdit);
const formAddValidated = new FormValidator(configObject, formElementAdd);
formEditValidated.enableValidation();
formAddValidated.enableValidation();

// Открытие попапов

// Попап с изображением
const popupWithImage = new PopupWithImage(popupShowSelector)
function handleCardClick(image, title) {
    popupWithImage.open(image, title);
}
popupWithImage.setEventListeners()
// Попап изменения профиля
const userInfo = new UserInfo({
    nameSelector: '.profile__name', 
    jobSelector: '.profile__job'
})
const popupEdit = new PopupWithForm({
    popupSelector: popupEditSelector,
    handleSubmit: (formData) => {
        userInfo.setUserInfo(formData);
    }
});
popupEdit.setEventListeners();
popupEditOpenButton.addEventListener('click', () => {
    formEditValidated.disableValidation();
    const profileInfo = userInfo.getUserInfo();
    nameInput.value = profileInfo.user;
    jobInput.value = profileInfo.job;
    popupEdit.open();
});
// Попап добавления карточки
const popupAdd = new PopupWithForm({
    popupSelector: popupAddSelector,
    handleSubmit: (formData) => {
        createCard(formData);
    }
});
popupAdd.setEventListeners();
popupAddOpenButton.addEventListener('click', () => {
    formAddValidated.disableValidation();
    popupAdd.open();
});

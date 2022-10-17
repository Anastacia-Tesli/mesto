//import './index.css';
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

const cardsSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#template', handleCardClick);
        const cardElement = card.generateCard();
        cardsSection.addItems(cardElement);
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

function handleCardClick(image, title) {
    const popupWithImage = new PopupWithImage({image, title}, popupShowSelector)
    popupWithImage.open();
}
popupEditOpenButton.addEventListener('click', () => {
    const popupEdit = new PopupWithForm({
        popupSelector: popupEditSelector,
        handleSubmit: (formData) => {
            userInfo.setUserInfo(formData);
        }
    })
    formEditValidated.disableValidation();
    popupEdit.open();
    const userInfo = new UserInfo({
        nameSelector: '.profile__name', 
        jobSelector: '.profile__job'
    })
    const profileInfo = userInfo.getUserInfo();
    nameInput.value = profileInfo.user
    jobInput.value = profileInfo.job
});
popupAddOpenButton.addEventListener('click', () => {
    const popupAdd = new PopupWithForm({
        popupSelector: popupAddSelector,
        handleSubmit: (formData) => {
            const card = new Card(formData, '#template', handleCardClick);
            const cardElement = card.generateCard();
            cardsSection.addItems(cardElement);
        }
    });
    formAddValidated.disableValidation();
    popupAdd.open();
});

import './index.css';
import {
    placesSelector,
    popupPicSelector,
    popupEditSelector,
    popupAddSelector,
    popupShowSelector,
    popupPicOpenButton,
    popupEditOpenButton, 
    popupAddOpenButton, 
    formElementPic,
    formElementEdit, 
    formElementAdd,
    picInput,
    nameInput, 
    jobInput, 
    configObject, 
    popupConfirmSelector} from "../scripts/utils/constatnts.js";
import Card from "../scripts/components/Card.js";
import Api from "../scripts/components/Api.js";
import Section from "../scripts/components/Section.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Popup from "../scripts/components/Popup.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
import UserInfo from "../scripts/components/UserInfo.js";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
    headers: {
      authorization: '0e26ece0-9983-4f1f-b710-b6f03d354c92',
      'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo({
    nameSelector: '.profile__name', 
    jobSelector: '.profile__job',
    picSelector: '.profile__avatar'
})
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([data, cards]) => {
    userInfo.setUserInfo(data)
    userInfo.setUserPic(data)
    userInfo.setUserId(data)
    cards.reverse();
    cardsSection.renderItems(cards)
})
.catch((err) => {
    console.log(`Ошибка: ${err}`);
})
// Рендеринг карточек 

const createCard = (item) => {
    const card = new Card(item, '#template', handleCardClick, handleDeleteClick, handlePutLike, handleDeleteLike, userInfo.getUserId.bind(userInfo));
    const cardElement = card.generateCard();
    return cardElement
}
const cardsSection = new Section({
    renderer: (item) => {
        cardsSection.addItems(createCard(item));
    }
  },
 placesSelector
);

function handlePutLike(number, id) {
    api.putLike(id)
    .then((res) => {
        number.textContent = res.likes.length
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
}
function handleDeleteLike(number, id) {
    api.deleteLike(id)
    .then((res) => {
        number.textContent = res.likes.length
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
}


// Валидация
const formPicValidated = new FormValidator(configObject, formElementPic);
const formEditValidated = new FormValidator(configObject, formElementEdit);
const formAddValidated = new FormValidator(configObject, formElementAdd);
formPicValidated.enableValidation();
formEditValidated.enableValidation();
formAddValidated.enableValidation();

// Открытие попапов

// Попап с изображением
const popupWithImage = new PopupWithImage(popupShowSelector)
function handleCardClick(image, title) {
    popupWithImage.open(image, title);
}
popupWithImage.setEventListeners();

// Попап при удалении карточки
const popupConfirmation = new PopupWithConfirmation(popupConfirmSelector, handleConfirmClick)
function handleDeleteClick(card, cardId) {
    popupConfirmation.open(card, cardId);
}
popupConfirmation.setEventListeners();
function handleConfirmClick(cardId) {
    api.deleteCard(cardId)
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
}


// Попап изменения фото профиля

const popupPic = new PopupWithForm({
    popupSelector: popupPicSelector,
    handleSubmit: (formData) => {
        popupPic.loading(true); 
        api.editAvatar(formData)
        .then((formData) => {
            userInfo.setUserPic(formData)
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupPic.loading(false);
        }); 
    }
})
popupPic.setEventListeners();
popupPicOpenButton.addEventListener('click', () => {
    formPicValidated.disableValidation();
    picInput.value = userInfo.getUserPic();
    popupPic.open();
})

// Попап изменения информации профиля

const popupEdit = new PopupWithForm({
    popupSelector: popupEditSelector,
    handleSubmit: (formData) => {
        popupEdit.loading(true); 
        api.editProfile(formData)
        .then((formData) => {
            userInfo.setUserInfo(formData)
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupEdit.loading(false);
        }); 
    }
});
popupEdit.setEventListeners();
popupEditOpenButton.addEventListener('click', () => {
    formEditValidated.disableValidation();
    const profileInfo = userInfo.getUserInfo();
    nameInput.value = profileInfo.name;
    jobInput.value = profileInfo.about;
    popupEdit.open();
});
// Попап добавления карточки
const popupAdd = new PopupWithForm({
    popupSelector: popupAddSelector,
    handleSubmit: (formData) => {
        popupAdd.loading(true); 
        api.addCard(formData)
        .then((formData) => {
            cardsSection.addItems(createCard(formData))
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupAdd.loading(false);
        });
        
    }
});
popupAdd.setEventListeners();
popupAddOpenButton.addEventListener('click', () => {
    formAddValidated.disableValidation();
    popupAdd.open();
});

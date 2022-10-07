import { openPopup } from "./index.js";
export class Card {
    constructor(data, templateSelector) {
        this._image = data.link;
        this._title = data.name;
        this._templateSelector = templateSelector;
    }
    _getTemplate() {
        const template = document.querySelector(this._templateSelector).content;
        const placeElement = template.querySelector('.place').cloneNode(true);
        return placeElement;
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.place__image').src = this._image;
        this._element.querySelector('.place__image').setAttribute('alt', `Фотография: ${this._title}`);
        this._element.querySelector('.place__title').textContent = this._title;
        return this._element;
    }
    _handleLikeClick() {
        this._element.querySelector('.place__like-button').classList.toggle('button_active');
    }
    _handleDeleteClick() {
        this._element.remove();
    }
    _handleImageClick() {
        const popupShow = document.querySelector('.popup_type_show');
        openPopup(popupShow);
        const popupShowImage = popupShow.querySelector('.popup__image')
        popupShowImage.src = this._image;
        popupShowImage.setAttribute('alt', `Фотография: ${this._title}`);
        popupShow.querySelector('.popup__description').textContent = this._title;
    }
    _setEventListeners() {
        this._element.querySelector('.place__like-button').addEventListener('click', () => {
            this._handleLikeClick();
        })
        this._element.querySelector('.place__delete-button').addEventListener('click', () => {
            this._handleDeleteClick();
        })
        this._element.querySelector('.place__image').addEventListener('click', () => {
            this._handleImageClick();
        })
    }
}

// Массив карточек
export const initialCards = [
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

export const defaultCards = initialCards.forEach((element) => {
  const card = new Card(element, '#template');
  const cardElement = card.generateCard();
  document.querySelector('.places').prepend(cardElement);
});

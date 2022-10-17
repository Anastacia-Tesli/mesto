export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._imageLink = data.link;
        this._title = data.name;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        const template = document.querySelector(this._templateSelector).content;
        const cardElement = template.querySelector('.place').cloneNode(true);
        return cardElement;
    }
    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.place__image');
        this._setEventListeners();
        this._image.src = this._imageLink;
        this._image.setAttribute('alt', `Фотография: ${this._title}`);
        this._element.querySelector('.place__title').textContent = this._title;
        return this._element;
    }
    _handleLikeClick(likeButton) {
        likeButton.classList.toggle('button_active');
    }
    _handleDeleteClick() {
        this._element.remove();
        this._element = null;
    }
    _setEventListeners() {
        this._element.querySelector('.place__like-button').addEventListener('click', (evt) => {
            this._handleLikeClick(evt.target);
        })
        this._element.querySelector('.place__delete-button').addEventListener('click', () => {
            this._handleDeleteClick();
        })
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._imageLink, this._title);
        })
    }
}

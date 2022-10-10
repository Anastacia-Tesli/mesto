export class Card {
    constructor(data, templateSelector, handleOpenPopup) {
        this._imageLink = data.link;
        this._title = data.name;
        this._templateSelector = templateSelector;
        this._handleOpenPopup = handleOpenPopup;
    }
    _getTemplate() {
        const template = document.querySelector(this._templateSelector).content;
        const placeElement = template.querySelector('.place').cloneNode(true);
        return placeElement;
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
    }
    _handleImageClick() {
        this._handleOpenPopup(this._title, this._imageLink);
    }
    _setEventListeners() {
        this._element.querySelector('.place__like-button').addEventListener('click', (evt) => {
            this._handleLikeClick(evt.target);
        })
        this._element.querySelector('.place__delete-button').addEventListener('click', () => {
            this._handleDeleteClick();
        })
        this._image.addEventListener('click', () => {
            this._handleImageClick();
        })
    }
}

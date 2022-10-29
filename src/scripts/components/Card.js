export default class Card {
    constructor(data, templateSelector, handleCardClick, handleDeleteClick, handlePutLike, handleDeleteLike, getUserId) {
        this._imageLink = data.link;
        this._title = data.name;
        this._likes = data.likes
        this._cardId = data._id
        this._owner = data.owner
        this._getUserId = getUserId
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick
        this._handlePutLike = handlePutLike
        this._handleDeleteLike = handleDeleteLike
    }
    _getTemplate() {
        const template = document.querySelector(this._templateSelector).content;
        const cardElement = template.querySelector('.place').cloneNode(true);
        return cardElement;
    }
    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.place__image');
        this._deleteButton = this._element.querySelector('.place__delete-button')
        this._likeNumber = this._element.querySelector('.place__like-number')
        this._likeButton = this._element.querySelector('.place__like-button')
        
        this._image.src = this._imageLink;
        this._image.setAttribute('alt', `Фотография: ${this._title}`);
        this._element.querySelector('.place__title').textContent = this._title;
        if (!(this._owner._id == this._getUserId())) {
            this._deleteButton.remove()
        }
        this._likeNumber.textContent = this._likes.length
        if (this._checkLikes()) {
            this._likeButton.classList.add('button_active');
        }
        this._setEventListeners();
        return this._element;
    }
    _checkLikes() {
        return this._likes.some( (like) => 
            like._id === this._getUserId())
    }
    _handleLikeClick() {
        if (!this._likeButton.classList.contains('button_active')) {
            this._likeButton.classList.add('button_active');
            this._handlePutLike(this._likeNumber, this._cardId)
        } else {
            this._likeButton.classList.remove('button_active');
            this._handleDeleteLike(this._likeNumber, this._cardId)
        }
    }
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick();
        })
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteClick(this._element, this._cardId);
        })
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._imageLink, this._title);
        })
    }
}

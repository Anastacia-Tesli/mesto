import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor({image, title}, popupSelector) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._imageLink = image
        this._title = title
    }
    open() {
        super.open();
        this._image = this._popup.querySelector('.popup__image');
        this._image.src = this._imageLink;
        this._image.setAttribute('alt', `Фотография: ${this._title}`);
        this._popup.querySelector('.popup__description').textContent = this._title;
    }
}   
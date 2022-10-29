import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._description = this._popup.querySelector('.popup__description')
    }
    open(image, title) {
        this._image.src = image;
        this._image.setAttribute('alt', `Фотография: ${title}`);
        this._description.textContent = title;
        super.open();
    }
}
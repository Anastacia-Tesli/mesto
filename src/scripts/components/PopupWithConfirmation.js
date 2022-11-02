import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirmClick) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__button')
        this._handleConfirmClick = handleConfirmClick
    }
    open(card, cardId) {
        super.open();
        this._card = card
        this._cardId = cardId
    }
    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', () => {
            this._handleConfirmClick(this._card, this._cardId)
        })
    }
}
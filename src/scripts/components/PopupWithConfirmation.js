import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirmClick) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__button')
        this._handleConfirmClick = handleConfirmClick
    }
    open(card, cardId) {
        super.open();
        this._button.addEventListener('click', () => {
            this._handleConfirmClick(cardId)
            this._deleteCard(card)
            this.close();
        })
    }
    _deleteCard(card) {
        card.remove();
        card = null;
    }
}
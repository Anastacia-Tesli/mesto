import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleSubmit}) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleSubmit = handleSubmit;
    }
    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
    return this._formValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
            this._form.reset();
            this.close();
        })
    }
    close() {
        super.close();
        this._form.reset();
    }
}
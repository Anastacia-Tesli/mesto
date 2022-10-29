import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleSubmit}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._handleSubmit = handleSubmit;
        this._submitButton = this._popup.querySelector('.popup__button');
    }
    _getInputValues() {
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
    loading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...'
        } else {
            this._submitButton.textContent = 'Сохранить'
        }
    }
    close() {
        super.close();
        this._form.reset();
    }
}
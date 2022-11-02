export default class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._button = this._form.querySelector(this._config.submitButtonSelector)
    }
    _areInputsValid() {
        return this._inputs.some((input) => {
          return !input.validity.valid
        })
    }
    _showInputError(input) {
        const errorInput = this._form.querySelector(`.${input.id}-error`);
        input.classList.add(this._config.inputErrorClass);
        errorInput.classList.add(this._config.errorClass);
        errorInput.textContent = input.validationMessage;
    }
    _hideInputError(input) {
        const errorInput = this._form.querySelector(`.${input.id}-error`);
        input.classList.remove(this._config.inputErrorClass);
        errorInput.classList.remove(this._config.errorClass);
        errorInput.textContent = ''
    }
    _toggleInputError(input) {
        if (!input.validity.valid) {
            this._showInputError(input);
        } else {
            this._hideInputError(input);
        }
    }
    _disableButton() {
        this._button.classList.add(this._config.inactiveButtonClass);
        this._button.setAttribute('disabled', 'true');
    }
    _enableButton() {
        this._button.classList.remove(this._config.inactiveButtonClass);
        this._button.removeAttribute('disabled');
    }
    _toggleButtonState() {
        if (this._areInputsValid()) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    }
    _setEventListeners() {
        this._toggleButtonState();
        this._inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._toggleInputError(input);
                this._toggleButtonState();
            })
        })
    }
    enableValidation() {
        this._setEventListeners();
    }
    disableValidation() {
        this._inputs.forEach((input) => {
            this._hideInputError(input);
        });
        this._disableButton();
    }
}

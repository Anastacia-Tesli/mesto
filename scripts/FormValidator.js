export class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._button = this._form.querySelector(this._config.submitButtonSelector)
    }
    _notValid() {
        return this._inputs.some((input) => {
          return !input.validity.valid
        })
    }
    _toggleInputError(input) {
        const errorInput = this._form.querySelector(`.${input.id}-error`);
        if (!input.validity.valid) {
            input.classList.add(this._config.inputErrorClass);
            errorInput.classList.add(this._config.errorClass);
            errorInput.textContent = input.validationMessage;
        } else {
            input.classList.remove(this._config.inputErrorClass);
            errorInput.classList.remove(this._config.errorClass);
            errorInput.textContent = ''
        }
    }
    _toggleButtonState() {
        if (this._notValid()) {
            this._button.classList.add(this._config.inactiveButtonClass);
            this._button.setAttribute('disabled', 'true');
        } else {
            this._button.classList.remove(this._config.inactiveButtonClass);
            this._button.removeAttribute('disabled');
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
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        this._setEventListeners();
    }
    disableValidation() {
        this._inputs.forEach((input) => {
            const errorInput = this._form.querySelector(`.${input.id}-error`);
            input.classList.remove(this._config.inputErrorClass);
            errorInput.classList.remove(this._config.errorClass);
            errorInput.textContent = ''
        });
        this._button.classList.add(this._config.inactiveButtonClass);
        this._button.setAttribute('disabled', 'true');
    }
}
export const configObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
export const forms = Array.from(document.querySelectorAll(configObject.formSelector));
export const formsValidated = forms.forEach((element) => {
    const formValidated = new FormValidator(configObject, element);
    formValidated.enableValidation();
})

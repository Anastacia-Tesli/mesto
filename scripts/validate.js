/*enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 
*/ 
const showInputError = (form, input) => {
  const errorInput = form.querySelector(`.${input.id}-error`);
  input.classList.add('popup__input_type_error');
  errorInput.classList.add('popup__error_visible');
  if (input.validity.valueMissing) {
    errorInput.textContent = "Вы пропустили это поле."
  } else if (input.validity.typeMismatch) {
    errorInput.textContent = "Введите URL."
  } else if (input.validity.tooShort) {
    errorInput.textContent = `Минимальное количество символов: ${input.minLength}. Длина текста сейчас: ${input.value.length} символ.`
  }
}

const hideInputError = (form, input) => {
  const errorInput = form.querySelector(`.${input.id}-error`);
  input.classList.remove('popup__input_type_error');
  errorInput.classList.remove('popup__error_visible');
  errorInput.textContent = ''
}

const checkValidity = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input);
  } else {
    hideInputError(form, input);
  }
}

const hasError = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid
  })
}
const toggleButton = (inputs, button) => {
  if (hasError(inputs)) {
    button.classList.add('popup__button_disabled');
    button.setAttribute('disabled', 'true');
  } else {
    button.classList.remove('popup__button_disabled');
    button.removeAttribute('disabled');
  }
}

const setEventListeners = (form) => {
  const inputs = Array.from(form.querySelectorAll('.popup__input'))
  const button = form.querySelector('.popup__button')
  toggleButton(inputs, button);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
       checkValidity(form, input);
       toggleButton(inputs, button);
    })
  })
}

const enableValidation = () => {
  const forms = Array.from(document.querySelectorAll('.popup__form'))
  forms.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    setEventListeners(form);
  })
}
enableValidation();
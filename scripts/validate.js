// Валидация форм
// Показать/спрятать ошибки
const showInputError = (form, input, config) => {
  const errorInput = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorInput.classList.add(config.errorClass);
  if (input.validity.valueMissing) {
    errorInput.textContent = "Вы пропустили это поле."
  } else if (input.validity.typeMismatch) {
    errorInput.textContent = "Введите URL."
  } else if (input.validity.tooShort) {
    errorInput.textContent = `Минимальное количество символов: ${input.minLength}. Длина текста сейчас: ${input.value.length} символ.`
  }
}
const hideInputError = (form, input, config) => {
  const errorInput = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorInput.classList.remove(config.errorClass);
  errorInput.textContent = ''
}
// Проверка на ошибки
const checkValidity = (form, input, config) => {
  if (!input.validity.valid) {
    showInputError(form, input, config);
  } else {
    hideInputError(form, input, config);
  }
}
const hasError = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid
  })
}
// Поведение кнопки сабмит
const toggleButton = (inputs, button, config) => {
  if (hasError(inputs)) {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute('disabled', 'true');
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
}
// Слушатели событий на формах
const setEventListeners = (form, config) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector))
  const button = form.querySelector(config.submitButtonSelector)
  toggleButton(inputs, button, config);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
       checkValidity(form, input, config);
       toggleButton(inputs, button, config);
    })
  })
}
// Запуск валидации
const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector))
  forms.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    setEventListeners(form, config);
  })
}
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
// Сброс ошибок валидации
const goToValidationDefault = (form, input, button, config) => {
  hideInputError(form, input, config);
  button.classList.add(config.inactiveButtonClass);
  button.setAttribute('disabled', 'true');
}

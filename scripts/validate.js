// Валидация форм
// Показать/спрятать ошибки
const showInputError = (form, input, message, config) => {
  const errorInput = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorInput.classList.add(config.errorClass);
  errorInput.textContent = message;
}
const hideInputError = (form, input, config) => {
  const errorInput = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorInput.classList.remove(config.errorClass);
  errorInput.textContent = ''
}
// Проверка на ошибки
const toggleInputError = (form, input, config) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
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
const toggleButtonState = (inputs, button, config) => {
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
  toggleButtonState(inputs, button, config);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
       toggleInputError(form, input, config);
       toggleButtonState(inputs, button, config);
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
// Сброс сообщений об ошибке
const disableValidation = (form, button, config) => {
  const inputs = form.querySelectorAll(config.inputSelector);
  inputs.forEach((input) => hideInputError(form, input, config));
  button.classList.add(config.inactiveButtonClass);
  button.setAttribute('disabled', 'true');
}

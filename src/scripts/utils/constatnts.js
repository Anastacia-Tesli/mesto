
export const placesSelector = '.places';
export const popupPicSelector = '.popup_type_pic';
export const popupEditSelector = '.popup_type_edit';
export const popupAddSelector = '.popup_type_add';
export const popupShowSelector = '.popup_type_show';
export const popupConfirmSelector = '.popup_type_confirm';
export const popupPicOpenButton = document.querySelector('.profile__pic');
export const popupEditOpenButton = document.querySelector('.profile__edit-button');
export const popupAddOpenButton = document.querySelector('.profile__add-button');

export const formElementPic = document.querySelector('.popup__form_type_pic');
export const formElementEdit = document.querySelector('.popup__form_type_edit');
export const formElementAdd = document.querySelector('.popup__form_type_add');
export const picInput = formElementPic.querySelector('#pic-input');
export const nameInput = formElementEdit.querySelector('#name-input');
export const jobInput = formElementEdit.querySelector('#job-input');

export const configObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
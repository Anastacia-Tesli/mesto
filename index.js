let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close');

function popupClick() { 
    popup.classList.toggle('popup_opened');
}


openPopup.addEventListener('click', popupClick);
closePopup.addEventListener('click', popupClick);





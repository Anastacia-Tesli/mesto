let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__edit-button');
let closePopup = popup.querySelector('.popup__close');

function popupClick() { 
    popup.classList.toggle('popup_opened');
}

openPopup.addEventListener('click', popupClick);
closePopup.addEventListener('click', popupClick);

let formElement = document.querySelector('.popup__container')
let nameInput = formElement.querySelector('.popup__input-name')
let jobInput = formElement.querySelector('.popup__input-description')

function formSubmitHandler (evt) {
    evt.preventDefault();
    
    nameInput.getAttribute('value')
    jobInput.getAttribute('value')

    let profileName = document.querySelector('.profile__name')
    let profileJob = document.querySelector('.profile__description')

    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
}

formElement.addEventListener('submit', formSubmitHandler);
let popup = document.querySelector('.popup');

let openPopup = document.querySelector('.profile__edit-button');
function popupOpener() { 
    popup.classList.add('popup_opened');
}
openPopup.addEventListener('click', popupOpener);

let closePopup = document.querySelector('.popup__close');
function popupCloser() { 
    popup.classList.remove('popup_opened');
}
closePopup.addEventListener('click', popupCloser);


let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_category_name');
let jobInput = formElement.querySelector('.popup__input_category_job');

    let profileName = document.querySelector('.profile__name')
    let profileJob = document.querySelector('.profile__job')

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value

    popupCloser();
}

formElement.addEventListener('submit', formSubmitHandler);
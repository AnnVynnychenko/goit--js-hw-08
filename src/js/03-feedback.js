import throttle from 'lodash.throttle';
import '../sass/common.scss';
import '../sass/03-feedback.scss';

const feedbackFormEl = document.querySelector('.feedback-form');
let feedbackFormData = {};
const STORAGE_KEY = 'feedback-form-state';

feedbackFormEl.addEventListener('input', throttle(onFormInput, 500));
feedbackFormEl.addEventListener('submit', onFormSubmit);



function onFormInput(evt) {
    feedbackFormData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormData));
}



function onFormSubmit (evt) {
    evt.preventDefault();
      console.log({
        email: feedbackFormEl.elements.email.value,
        message: feedbackFormEl.elements.message.value,
    });
    localStorage.removeItem(STORAGE_KEY);
    evt.currentTarget.reset();
    feedbackFormData = {};
};

populateForm();

function populateForm() {
    const savedFormData = localStorage.getItem(STORAGE_KEY);
    const parsedFormData = JSON.parse(savedFormData);
    feedbackFormData = parsedFormData;
    if (parsedFormData) {
        if (parsedFormData.email) {
        feedbackFormEl.elements.email.value = parsedFormData.email;
        };
        
        if (parsedFormData.message) {
        feedbackFormEl.elements.message.value = parsedFormData.message;
        };
    };
}



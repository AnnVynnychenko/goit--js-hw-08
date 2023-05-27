import throttle from 'lodash.throttle';
import '../sass/common.scss';
import '../sass/03-feedback.scss';

const feedbackFormEl = document.querySelector('.feedback-form');
let formData = {};
const STORAGE_KEY = 'feedback-form-state';
feedbackFormEl.addEventListener('input', throttle(onFormInput, 500));
feedbackFormEl.addEventListener('submit', onFormSubmit);

populateForm();

function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit (evt) {
    evt.preventDefault();
      console.log({
        email: feedbackFormEl.elements.email.value,
        message: feedbackFormEl.elements.message.value,
    });
    feedbackFormEl.reset();
    localStorage.removeItem(STORAGE_KEY);
};

function populateForm() {
    const savedFormData = localStorage.getItem(STORAGE_KEY);
    const parsedFormData = JSON.parse(savedFormData);
    if (parsedFormData) {
        if (parsedFormData.email) {
        feedbackFormEl.elements.email.value = parsedFormData.email;
        };
        if (parsedFormData.message) {
        feedbackFormEl.elements.message.value = parsedFormData.message;
        };
    };
    return parsedFormData;
}



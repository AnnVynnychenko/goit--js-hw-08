import throttle from 'lodash.throttle';
import '../sass/common.scss';
import '../sass/03-feedback.scss';

const feedbackFormEl = document.querySelector('.feedback-form');
let formData = {};
const { email, message } = feedbackFormEl.elements;
const STORAGE_KEY = 'feedback-form-state';
feedbackFormEl.addEventListener('input', throttle(onFormInput, 500));
feedbackFormEl.addEventListener('submit', onFormSubmit);

populateForm();

function onFormInput() {
  formData.email = email.value;
  formData.message = message.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(savedFormData)
  
  if (savedFormData) {
    if (savedFormData.email) {
      email.value = savedFormData.email;
    }
    if (savedFormData.message) {
      message.value = savedFormData.message;
    }
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log({
    email: email.value,
    message: message.value,
  });
  localStorage.removeItem(STORAGE_KEY);
  feedbackFormEl.reset();
}





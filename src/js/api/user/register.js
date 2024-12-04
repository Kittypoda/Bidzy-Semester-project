import { API_AUTH_REGISTER } from '../constants';

async function onRegister(event) {
  console.log('onRegister function triggered.');
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const userData = { name, email, password };
  console.log(userData);

  try {
    const sendUserData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(API_AUTH_REGISTER, sendUserData);
    const json = await response.json();
    console.log(json);

    if (response.ok) {
      localStorage.setItem('username', name);
    }

    return json;
  } catch (error) {
    alert('Registration failed');
    console.error('Registration failed', error);
  } finally {
    window.location.href = '/index.html';
  }
}

const form = document.querySelector('#register-form');
console.log(form);

if (form) {
  console.log('Form found. Attaching event listener.');
  form.addEventListener('submit', onRegister);
} else {
  console.error('Form not found.');
}

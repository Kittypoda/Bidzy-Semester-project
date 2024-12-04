import { API_AUTH_LOGIN } from "../constants";

async function onLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const userData = { email, password };
  console.log(userData);

  try {
    const sendUserData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(API_AUTH_LOGIN, sendUserData);
    const json = await response.json();
    const accessToken = json.data.accessToken;

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('userName',JSON.stringify(json.data.name))

    return json;
  } catch (error) {
    alert('login failed')
    console.error('Login failed', error)
  } finally { window.location.href = '/';}
}

  const form = document.querySelector('#login-form');
  console.log(form);

  if (form) {
    console.log('Form found');
    form.addEventListener('submit', onLogin);
  } else {
    console.error('form not found');
  }

  


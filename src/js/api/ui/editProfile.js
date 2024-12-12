import { API_AUCTION_PROFILE } from "../constants";
import { API_KEY } from "../constants";

const editProfileBtn = document.getElementById('edit-profile-btn');
const editProfilePopup = document.getElementById('edit-profile-popup');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const editProfileForm = document.getElementById('edit-profile-form');

function getLoggedInUserName() {
  const userName = JSON.parse(localStorage.getItem('userName')); 
  if (!userName) {
    alert('Unable to identify the logged-in user. Redirecting to login...');
    window.location.href = '/src/html/login.html'; 
    return null;
  }
  return userName;
}

async function fetchUserProfile() {
  const userName = getLoggedInUserName();
  if (!userName) return;

  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('User is not logged in. Redirecting to login...');
      window.location.href = '/src/html/login.html';
      return;
    }

    const response = await fetch(`${API_AUCTION_PROFILE}/${userName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });

    if (response.ok) {
      const profile = await response.json();
      console.log('Fetched user profile:', profile);

      if (profile.data.avatar && profile.data.avatar.url) {
        document.getElementById('avatar').style.backgroundImage = `url(${profile.data.avatar.url})`;
      }

      if (profile.data.bio) {
        document.getElementById('bio').textContent = profile.data.bio;
      }

      const hiUserElement = document.getElementById('hi-user');
      hiUserElement.textContent = `Hi, ${userName}!`;

      if (profile.data.credits !== undefined) {
        const creditElement = document.getElementById('credit');
        creditElement.textContent = `Your current credit: $${profile.data.credits}`;
      }
    } else {
      const error = await response.json();
      console.error('Error fetching profile:', error);
      alert(`Failed to fetch profile: ${error.errors?.[0]?.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    alert('An unexpected error occurred while fetching the profile.');
  }
}

editProfileBtn.addEventListener('click', () => {
  const userName = getLoggedInUserName(); 
  if (userName) {
    editProfilePopup.classList.remove('hidden');
  }
});

cancelEditBtn.addEventListener('click', () => {
  editProfilePopup.classList.add('hidden');
});

editProfileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const avatarUrl = document.getElementById('avatar-url').value.trim();
  const bioText = document.getElementById('bio-text').value.trim();

  if (!avatarUrl && !bioText) {
    alert('Please provide at least one field to update.');
    return;
  }

  const userName = getLoggedInUserName();
  if (!userName) return;

  const payload = {};
  if (avatarUrl) {
    payload.avatar = { url: avatarUrl, alt: "User avatar" };
  }
  if (bioText) {
    payload.bio = bioText;
  }

  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('User is not logged in. Redirecting to login...');
      window.location.href = '/src/html/login.html';
      return;
    }

    const response = await fetch(`${API_AUCTION_PROFILE}/${userName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const updatedProfile = await response.json();
      console.log('Profile updated:', updatedProfile);

      if (updatedProfile.data.avatar && updatedProfile.data.avatar.url) {
        document.getElementById('avatar').style.backgroundImage = `url(${updatedProfile.data.avatar.url})`;
      }
      if (updatedProfile.data.bio) {
        document.getElementById('bio').textContent = updatedProfile.data.bio;
      }

      editProfilePopup.classList.add('hidden');
    } else {
      const error = await response.json();
      console.error('API Error Response:', error);
      alert(`Failed to update profile: ${error.errors?.[0]?.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('An unexpected error occurred.');
  }
});

fetchUserProfile();


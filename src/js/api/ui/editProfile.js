import { API_AUCTION_PROFILE } from "../constants";
import { API_KEY } from "../constants";

const editProfileBtn = document.getElementById('edit-profile-btn');
const editProfilePopup = document.getElementById('edit-profile-popup');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const editProfileForm = document.getElementById('edit-profile-form');

// Function to get the logged-in user's name
function getLoggedInUserName() {
  const userName = JSON.parse(localStorage.getItem('userName')); // Ensure the username is parsed if stored as JSON
  if (!userName) {
    alert('Unable to identify the logged-in user. Redirecting to login...');
    window.location.href = '/src/html/login.html'; // Redirect to login if username is missing
    return null;
  }
  return userName;
}

// Show popup
editProfileBtn.addEventListener('click', () => {
  const userName = getLoggedInUserName(); // Ensure username is checked before proceeding
  if (userName) {
    editProfilePopup.classList.remove('hidden');
  }
});

// Hide popup
cancelEditBtn.addEventListener('click', () => {
  editProfilePopup.classList.add('hidden');
});

// Handle form submission
editProfileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const avatarUrl = document.getElementById('avatar-url').value.trim();
  const bioText = document.getElementById('bio-text').value.trim();

  // Validate input
  if (!avatarUrl && !bioText) {
    alert('Please provide at least one field to update.');
    return;
  }

  const userName = getLoggedInUserName();
  if (!userName) return;

  // Prepare the payload
  const payload = {};
  if (avatarUrl) {
    payload.avatar = { url: avatarUrl, alt: "User avatar" };
  }
  if (bioText) {
    payload.bio = bioText;
  }

  // Update user profile via API
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

      if (updatedProfile.data) {
        // Update the profile UI
        if (updatedProfile.data.avatar && updatedProfile.data.avatar.url) {
          document.getElementById('avatar').style.backgroundImage = `url(${updatedProfile.data.avatar.url})`;
        }
        if (updatedProfile.data.bio) {
          document.getElementById('bio').textContent = updatedProfile.data.bio;
        }

        // Hide the popup
        editProfilePopup.classList.add('hidden');
        alert('Profile updated successfully!');
      } else {
        alert('Failed to retrieve updated profile details.');
      }
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

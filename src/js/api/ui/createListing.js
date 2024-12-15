import { API_AUCTION_LISTINGS } from "../constants";
import { API_KEY } from "../constants";

const createListingBtn = document.getElementById('create-listing-btn');
const createListingPopup = document.getElementById('create-listing-popup');
const cancelCreateListingBtn = document.getElementById('cancel-create-listing-btn');
const createListingForm = document.getElementById('create-listing-form');

createListingBtn.addEventListener('click', () => {
  createListingPopup.classList.remove('hidden');
});

cancelCreateListingBtn.addEventListener('click', () => {
  createListingPopup.classList.add('hidden');
});

createListingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('listing-title').value.trim();
  const description = document.getElementById('listing-description').value.trim();
  const media = document.getElementById('listing-media').value.trim();
  const endTime = document.getElementById('listing-end-time').value;

  if (!title || !endTime) {
    alert('Title and End Time are required.');
    return;
  }

  const payload = {
    title,
    description: description || null, 
    media: media ? [{ url: media, alt: "Listing media" }] : null, 
    endsAt: new Date(endTime).toISOString(), 
  };

  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('You need to log in to create a listing');
      window.location.href = '/Bidzy-Semester-project/src/html/login.html';
      return;
    }

    const response = await fetch(API_AUCTION_LISTINGS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const createdListing = await response.json();
      console.log('Created Listing:', createdListing);

      createListingPopup.classList.add('hidden');

    
      window.location.href = '/Bidzy-Semester-project/src/html/mylistings.html';
    } else {
      const error = await response.json();
      console.error('Error creating listing:', error);
      alert(`Failed to create listing: ${error.errors?.[0]?.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error submitting listing:', error);
    alert('An unexpected error occurred while creating the listing.');
  }
});

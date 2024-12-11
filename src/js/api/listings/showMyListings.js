import { API_AUCTION_PROFILE } from "../constants";
import { API_KEY } from "../constants";

async function fetchUserListings() {
  const userName = JSON.parse(localStorage.getItem('userName')); // Get logged-in user's username
  if (!userName) {
    alert('User not logged in. Redirecting to login...');
    window.location.href = '/src/html/login.html';
    return;
  }

  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('User is not logged in. Redirecting to login...');
      window.location.href = '/src/html/login.html';
      return;
    }

    const response = await fetch(`${API_AUCTION_PROFILE}/${userName}?_listings=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });

    if (response.ok) {
      const userProfile = await response.json();
      const listings = userProfile.data.listings || [];
      displayListings(listings);
    } else {
      const error = await response.json();
      console.error('Error fetching user listings:', error);
      alert(`Failed to fetch listings: ${error.errors?.[0]?.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error fetching user listings:', error);
    alert('An unexpected error occurred.');
  }
}

function displayListings(listings) {
  const listingsContainer = document.getElementById('listings-container');
  listingsContainer.textContent = ''; // Clear the container

  if (listings.length === 0) {
    listingsContainer.textContent = 'No listings found.';
    return;
  }

  listings.forEach((listing) => {
    const listingCard = document.createElement('div');
    listingCard.classList.add(
      'flex',
      'flex-col',
      'bg-customLBlue',
      'rounded-lg',
      'p-4',
      'shadow-md',
      'mb-4'
    );

    const title = document.createElement('h2');
    title.textContent = listing.title || 'Untitled';
    title.classList.add('text-lg', 'font-bold', 'mb-2', 'font-baloo');

    const description = document.createElement('p');
    description.textContent = listing.description || 'No description available.';
    description.classList.add('text-sm', 'text-gray-600', 'mb-2', 'font-baloo');

    const endsAt = document.createElement('p');
    const endDate = new Date(listing.endsAt);
    const now = new Date();
    const timeDiff = endDate - now;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    endsAt.textContent =
      daysRemaining > 1
        ? `${daysRemaining} days left`
        : daysRemaining === 1
        ? '1 day left'
        : 'Ended';
    endsAt.classList.add('text-sm', 'text-gray-500', 'font-baloo', 'italic');

    const bidsCount = document.createElement('p');
    bidsCount.textContent = `Bids: ${listing._count?.bids || 0}`;
    bidsCount.classList.add('text-sm', 'text-gray-500', 'font-baloo');

    listingCard.append(title, description, endsAt, bidsCount);
    listingsContainer.appendChild(listingCard);
  });
}

// Fetch listings on page load
fetchUserListings();

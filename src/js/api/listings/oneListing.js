import { API_AUCTION_LISTINGS } from "../constants";
console.log(API_AUCTION_LISTINGS)
function generateSingleListing(oneListing) {
  const listingWrapper = document.createElement('div');
  listingWrapper.classList.add('single-listing-wrapper');

  const listingContainer = document.createElement('div');
  listingContainer.classList.add('listing-container');

  const title = document.createElement('h1');
  title.textContent = oneListing.title;

  const endsAt = document.createElement('h2');
  endsAt.textContent = `Ends at: ${new Date(oneListing.endsAt).toLocaleString()}`;

  const description = document.createElement('p');
  description.textContent = oneListing.description || "No description available.";

  listingContainer.append(title, endsAt, description);
  listingWrapper.appendChild(listingContainer);

  return listingWrapper;
}

function displayOneListing(listing) {
  const displayListingContainer = document.getElementById("display-one-listing");
  if (!displayListingContainer) {
    console.error("Display container not found.");
    return;
  }

  displayListingContainer.textContent = ""; // Clear any existing content
  const oneListingHtml = generateSingleListing(listing);
  displayListingContainer.appendChild(oneListingHtml);
}

async function fetchListing(id) {
  try {
    const token = localStorage.getItem('accessToken');
    const url = `${API_AUCTION_LISTINGS}/${id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const json = await response.json();
      return json; // Return the listing data
    } else {
      console.error(`Failed to fetch listing: ${response.statusText}`);
      return null; // Return null if the response fails
    }
  } catch (error) {
    console.error('Error fetching listing:', error);
    return null; // Return null on error
  }
}

async function renderPage() {
  try {
    // Get listing ID from URL parameters
    const parameterString = window.location.search;
    const searchParameter = new URLSearchParams(parameterString);
    const id = searchParameter.get("listingId");

    if (!id) {
      console.error("No listing ID found in the URL.");
      return;
    }

    const listing = await fetchListing(id);

    if (listing) {
      displayOneListing(listing);
    } else {
      console.error("No data found for the specified listing ID.");
    }
  } catch (error) {
    console.error("Error rendering the page:", error);
  }
}

// Call the renderPage function to initialize the page
renderPage();

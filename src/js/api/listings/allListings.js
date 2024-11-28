import { API_AUCTION_LISTINGS } from "../constants";
console.log("API Endpoint:", API_AUCTION_LISTINGS);

function generateListing(listing) {
  const listingWrapper = document.createElement('div');
  listingWrapper.classList.add('listing-wrapper');

  const listingContainer = document.createElement('div');
  listingContainer.classList.add('listing-container');

  const title = document.createElement('h1');
  title.textContent = listing.title; // Fixed property access

  listingContainer.appendChild(title);
  listingWrapper.appendChild(listingContainer);

  return listingWrapper;
}

function displayListings(listings) {
  const displayListingContainer = document.getElementById('display-listings');
  console.log("Display container:", displayListingContainer);

  if (!displayListingContainer) {
    console.error("Container for listing elements not found");
    return;
  }

  displayListingContainer.textContent = ''; // Clear previous content

  listings.forEach((listing) => {
    const listingHtml = generateListing(listing);
    displayListingContainer.appendChild(listingHtml);
  });

  console.log("Listings displayed successfully.");
}

async function fetchListings() {
  try {
    const response = await fetch(API_AUCTION_LISTINGS);
    if (!response.ok) {
      throw new Error("Failed to fetch listings");
    }
    const listings = await response.json(); // Fetch response
    console.log("Fetched listings data:", listings);

    // Access the array of items (adjust key as needed)
    const listingsArray = listings.data || listings; // Use the correct key
    if (!Array.isArray(listingsArray)) {
      throw new Error("Listings is not an array");
    }

    // Pass the array to displayListings
    displayListings(listingsArray);
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
}

fetchListings();



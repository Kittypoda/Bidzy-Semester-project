import { API_AUCTION_LISTINGS } from "../constants";

function generateListing(listing) {
  const listingWrapper = document.createElement("div");
  listingWrapper.classList.add(
    "relative",
    "overflow-hidden",
    "rounded-lg",
    "group",
    "transition-colors",
    "duration-300"
  );

  // Create the clickable link
  const listingPageLink = document.createElement("a");
  listingPageLink.href = `./src/html/productpage.html?listingId=${listing.id}`;
  listingPageLink.classList.add("block", "h-full", "w-full");

  const listingContainer = document.createElement("div");
  listingContainer.classList.add(
    "h-64",
    "w-full",
    "relative",
    "bg-cover",
    "bg-center",
    "transition-colors",
    "duration-300"
  );

  // Set background image
  if (listing.media && Array.isArray(listing.media) && listing.media.length > 0) {
    listingContainer.style.backgroundImage = `url(${listing.media[0].url})`;
  } else {
    listingContainer.style.backgroundImage =
      "url('https://images.unsplash.com/photo-1521193089946-7aa29d1fe776?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
  }

  const overlay = document.createElement("div");
  overlay.classList.add(
    "absolute",
    "inset-0",
    "bg-customDYellow",
    "opacity-0",
    "lg:group-hover:opacity-100",
    "lg:opacity-0",
    "transition-opacity",
    "duration-300",
    "z-0"
  );

  const titleSm = document.createElement("h1");
  titleSm.textContent = listing.title;
  titleSm.classList.add(
    "absolute",
    "bottom-0",
    "left-0",
    "w-full",
    "bg-customDYellow",
    "text-black",
    "text-sm",
    "font-bold",
    "py-2",
    "px-4",
    "rounded-t-lg",
    "block",
    "lg:hidden",
    "h-24"
  );

  const endsAtSm = document.createElement("p");
  const endDate = new Date(listing.endsAt);
  const now = new Date();
  const timeDiff = endDate - now;
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (daysRemaining > 1) {
    endsAtSm.textContent = `${daysRemaining} days left`;
  } else if (daysRemaining === 1) {
    endsAtSm.textContent = "1 day left";
  } else {
    endsAtSm.textContent = "Ended";
  }

  endsAtSm.classList.add(
    "absolute",
    "top-2",
    "right-2",
    "bg-customBlue",
    "text-white",
    "text-xs",
    "font-baloo",
    "py-1",
    "px-2",
    "rounded",
    "block",
    "lg:hidden"
  );

  const titleLg = document.createElement("h1");
  titleLg.textContent = listing.title;
  titleLg.classList.add("text-lg", "hidden", "lg:block", "lg:group-hover:text-black");

  const endsAtLg = document.createElement("h1");
  endsAtLg.textContent = endsAtSm.textContent;
  endsAtLg.classList.add("text-black", "hidden", "lg:block", "lg:group-hover:text-black");

  const contentContainerLg = document.createElement("div");
  contentContainerLg.classList.add(
    "absolute",
    "inset-0",
    "flex",
    "p-4",
    "pt-24",
    "flex-col",
    "hidden",
    "lg:group-hover:flex",
    "z-10"
  );
  contentContainerLg.appendChild(titleLg);
  contentContainerLg.appendChild(endsAtLg);

  listingContainer.appendChild(overlay);
  listingContainer.appendChild(titleSm);
  listingContainer.appendChild(endsAtSm);
  listingContainer.appendChild(contentContainerLg);

  // Append the listing container to the link
  listingPageLink.appendChild(listingContainer);

  // Append the link to the wrapper
  listingWrapper.appendChild(listingPageLink);

  return listingWrapper;
}

function displayListings(listings) {
  const displayListingContainer = document.getElementById("display-listings");

  displayListingContainer.classList.add(
    "grid",
    "gap-4",
    "grid-cols-2",
    "lg:grid-cols-3",
    "p-4"
  );

  displayListingContainer.textContent = "";

  listings.forEach((listing) => {
    const listingHtml = generateListing(listing);
    displayListingContainer.appendChild(listingHtml);
  });
}

async function fetchListings() {
  try {
    const response = await fetch(API_AUCTION_LISTINGS);
    if (!response.ok) {
      throw new Error("Failed to fetch listings");
    }
    const listings = await response.json();
    console.log("Fetched listings data:", listings);

    const listingsArray = listings.data || listings;
    if (!Array.isArray(listingsArray)) {
      throw new Error("Listings is not an array");
    }

    displayListings(listingsArray);
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
}

fetchListings();




export default async function router(pathname = window.location.pathname) {
  showLoader();

  try {
    switch (pathname) {
      case `${import.meta.env.BASE_URL}`:
      case '/':
        await import('./view/header');
        await import('./api/listings/allListings');
        await import('./api/listings/searchListing.js');
        await import('../js/api/ui/searchForm.js');
        await import('../js/api/ui/createListing.js');
        break;
      case `${import.meta.env.BASE_URL}src/html/register/`:
        await import('./api/ui/register.js');
        break;
      case `${import.meta.env.BASE_URL}src/html/productpage/`:
        await import('./view/header');
        await import('../js/api/listings/oneListing.js');
        await import('./api/listings/searchListing.js');
        await import('../js/api/ui/searchForm.js');
        break;
      case `${import.meta.env.BASE_URL}src/html/login.html/`:
        await import('./api/ui/login.js');
        break;
      case `${import.meta.env.BASE_URL}src/html/search/`:
        await import('./view/header');
        await import('./api/listings/searchListing.js');
        await import('../js/api/ui/searchForm.js');
        break;
      case `${import.meta.env.BASE_URL}src/html/profile/`:
        await import('./view/header');
        await import('./api/listings/searchListing.js');
        await import('../js/api/ui/searchForm.js');
        await import('../js/api/ui/editProfile.js');
        await import('./api/ui/createListing.js');
        break;
      case `${import.meta.env.BASE_URL}src/html/mylistings/`:
        await import('./view/header');
        await import('../js/api/listings/showMyListings.js');
        break;
      default:
        console.error(`No route found for ${pathname}`);
    }
  } catch (error) {
    console.error(`Error loading route: ${pathname}`, error);
  } finally {
    hideLoader(); // Hide loader after content has loaded
  }
}

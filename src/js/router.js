import { showLoader, hideLoader } from './view/loader';

export default async function router(pathname = window.location.pathname) {
  showLoader();

  try {
    console.log("Current pathname:", pathname);

    switch (pathname) {
      case '/Bidzy-Semester-project/':
      case '/Bidzy-Semester-project/index.html':
        await import('./view/header');
        await import('./api/listings/allListings');
        await import('./api/listings/searchListing.js');
        await import('./api/ui/searchForm.js');
        await import('./api/ui/createListing.js');
        break;

      case '/Bidzy-Semester-project/register.html':
        await import('./api/ui/register.js');
        break;

      case '/Bidzy-Semester-project/productpage.html':
        await import('./view/header');
        await import('./api/listings/oneListing.js');
        await import('./api/listings/searchListing.js');
        await import('./api/ui/searchForm.js');
        break;

      case '/Bidzy-Semester-project/login.html':
        await import('./api/ui/login.js');
        break;

      case '/Bidzy-Semester-project/search.html':
        await import('./view/header');
        await import('./api/listings/searchListing.js');
        await import('./api/ui/searchForm.js');
        break;

      case '/Bidzy-Semester-project/profile.html':
        await import('./view/header');
        await import('./api/listings/searchListing.js');
        await import('./api/ui/searchForm.js');
        await import('./api/ui/editProfile.js');
        await import('./api/ui/createListing.js');
        break;

      case '/Bidzy-Semester-project/mylistings.html':
        await import('./view/header');
        await import('./api/listings/showMyListings.js');
        break;

      default:
        console.error(`No matching route for: ${pathname}`);
    }
  } catch (error) {
    console.error(`Error loading route: ${pathname}`, error);
  } finally {
    hideLoader(); // Hide loader after content has loaded
  }
}

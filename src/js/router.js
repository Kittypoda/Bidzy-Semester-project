import { showLoader, hideLoader } from './view/loader';

export default async function router(pathname = window.location.pathname) {
  showLoader();

  try {
  switch (pathname) {
    case '/Bidzy-Semester-project/':
    case '/':
      await import('./view/header');
      await import('./api/listings/allListings');
      await import('./api/listings/searchListing.js');
      await import('../js/api/ui/searchForm.js');
      await import('../js/api/ui/createListing.js')
      break;
    case '/Bidzy-Semester-project/src/html/register/':
      await import('./api/ui/register.js');
      break;
    case '/Bidzy-Semester-project/src/html/productpage.html':
      await import('./view/header')
      await import('../js/api/listings/oneListing.js');
      await import('./api/listings/searchListing.js');
      await import('../js/api/ui/searchForm.js');
      break;
    case '/Bidzy-Semester-project/src/html/login.html':
      await import('./api/ui/login.js');
      break;
      case '/src/html/search.html':
        await import('./view/header');
        await import('./api/listings/searchListing.js');
        await import('../js/api/ui/searchForm.js');
        break;
      case '/Bidzy-Semester-project/src/html/profile.html':
          await import('./view/header');
          await import('./api/listings/searchListing.js');
          await import('../js/api/ui/searchForm.js'); 
          await import('../js/api/ui/editProfile.js');  
          await import('./api/ui/createListing.js');     
          break;
      case '/Bidzy-Semester-project/src/html/mylistings.html':
        await import('./view/header');
        await import('../js/api/listings/showMyListings.js');

        }
      } catch (error) {
        console.error(`Error loading route: ${pathname}`, error);
      } finally {
        hideLoader(); // Hide loader after content has loaded
      }
    }
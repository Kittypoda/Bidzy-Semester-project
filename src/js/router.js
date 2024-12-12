export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/index.html':
    case '/':
      await import('./view/header');
      await import('./api/listings/allListings');
      await import('./api/listings/searchListing.js');
      await import('../js/api/ui/searchForm.js');
      await import('../js/api/ui/createListing.js')
      break;
    case '/src/html/register.html':
      await import('./api/ui/register.js');
      break;
    case '/src/html/productpage.html':
      await import('./view/header')
      await import('../js/api/listings/oneListing.js');
      await import('./api/listings/searchListing.js');
      await import('../js/api/ui/searchForm.js');
      break;
    case '/src/html/login.html':
      await import('./api/ui/login.js');
      break;
      case '/src/html/search.html':
        await import('./view/header');
        await import('./api/listings/searchListing.js');
        await import('../js/api/ui/searchForm.js');
        break;
      case '/src/html/profile.html':
          await import('./view/header');
          await import('./api/listings/searchListing.js');
          await import('../js/api/ui/searchForm.js'); 
          await import('../js/api/ui/editProfile.js');  
          await import('./api/ui/createListing.js')     
          break;
      case '/src/html/mylistings.html':
        await import('./view/header');
        await import('../js/api/listings/showMyListings.js');
        }
      }

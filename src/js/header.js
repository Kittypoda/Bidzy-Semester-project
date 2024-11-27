function createHeader() {
  // Create the header HTML as a string
  const headerHTML = `
    <header class="p-4">
      <div class="flex justify-end">
        <a href="/src/html/profile.html">
          <button class="btn-primary">
            My Bidzy
          </button>
        </a>
      </div>
      <div class="flex flex-col md:justify-start mt-4">
        <a class="font-bagel text-2xl md:text-3xl mr-4" href="/index.html">Bidzy</a>
        <h1>Bid it, own it, love it</h1>
      </div>
    </header>
  `;

  // Insert the header HTML into the body
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

// Call the function to create the header
createHeader();


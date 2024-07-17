// Elements
const searchIcon = document.getElementById("search");
const searchInput = document.getElementById("search-input");
const noteTitles = document.querySelectorAll(".note-title");
const noteItems = document.querySelectorAll(".note-item");
const sendEmailBtn = document.getElementById("submit-email");
const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
const loader = document.getElementById("form-loader");

//// Convert noteTitles to array for search purposes
const noteTitlesArray = Array.from(noteTitles);

function handleSearchClick(e) {
  // Increase icon size
  searchIcon.classList.toggle("text-xl");
  searchIcon.classList.toggle("text-4xl");

  // Show search input next to icon
  searchInput.classList.toggle("hidden");
  searchInput.classList.toggle("block");
}

function handleSearchQuery(e) {
  // Get search query
  const query = e.target.value.toLowerCase();

  // If query is empty, ensure all items are visible
  if (query === "") {
    noteItems.forEach((item) => {
      item.classList.remove("invisible");
      item.classList.add("visible");
    });
  }

  // Convert note items to a searchable array; make lower case for searching
  const searchableItems = noteTitlesArray.map((el) => el.innerText);

  // Check if each item of the array does and doesn't contain the search string.
  // It's important to have both for css class adding / removing
  const nonMatchingNotes = searchableItems.filter(
    (el) => !el.toLowerCase().includes(query)
  );

  const matchingNotes = searchableItems.filter((el) =>
    el.toLowerCase().includes(query)
  );

  // Get array of index of item of the non-matching & matching notes
  const nonMatchingNotesIndex = nonMatchingNotes.map((el) => {
    return searchableItems.indexOf(el);
  });

  const matchingNotesIndex = matchingNotes.map((el) => {
    return searchableItems.indexOf(el);
  });

  // Loop through array of non-matching note indices
  for (const index of nonMatchingNotesIndex) {
    noteItems[index].classList.add("invisible", "max-h-0", "mb-0");
    noteItems[index].classList.remove("mb-4");
  }

  for (const index of matchingNotesIndex) {
    noteItems[index].classList.remove("invisible", "max-h-0", "mb-0");
    noteItems[index].classList.add("mb-4");
  }
}

function handleEmailSend(e) {
  e.preventDefault();
  loader.classList.remove("hidden");
  loader.classList.add("inline-block");
  const options = {
    publicKey: "Mt5AFtPFH-P2XS_cP",
  };

  const templateParams = {
    from_name: form.elements[0].value,
    reply_to: form.elements[1].value,
    message: form.elements[2].value,
  };

  emailjs
    .send("service_mli8ef1", "template_hsw3t2q", templateParams, options)
    .then(
      (response) => {
        loader.classList.remove("inline-block");
        loader.classList.add("hidden");
        console.log("SUCCESS!", response.status, response.text);
        formMessage.textContent =
          "✅ Email successfully sent, i'll be in contact shortly!";
      },
      (error) => {
        loader.classList.remove("inline-block");
        loader.classList.add("hidden");
        console.log("FAILED...", error);
        formMessage.innerHTML = `⛔️ There was an error sending the email: ${error.text}<br/> Please reach out to me directly at <a href="mailto:jeremyluscombe@gmail.com">jeremyluscombe@gmail.com</a>`;
      }
    );
}

// Event listeners
searchIcon && searchIcon.addEventListener("click", handleSearchClick);
searchInput && searchInput.addEventListener("input", handleSearchQuery);
sendEmailBtn.addEventListener("click", handleEmailSend);

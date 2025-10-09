// script.js

// script.js

// --------------------------------------------------------------------------------
// --- NEW: Trenton, TN Digital Clock Logic (Central Time Zone) ---
// --------------------------------------------------------------------------------

function updateTrentonClock() {
    // This function formats the current time specifically for the Central Time Zone (Trenton, TN)
    const now = new Date();

    const options = {
        hour: '2-digit',      // Always 2 digits (e.g., 09)
        minute: '2-digit',    // Always 2 digits (e.g., 05)
        second: '2-digit',    // Always 2 digits (e.g., 59)
        hour12: false,        // Use 24-hour format (HH:MM:SS)
        timeZone: 'America/Chicago' // Central Time Zone for Trenton, TN
    };

    // Use toLocaleTimeString to apply the timezone options
    const timeString = now.toLocaleTimeString('en-US', options);

    // Update the content of the new HTML element
    const clockElement = document.getElementById('trenton-clock');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

// Initial call to display the clock immediately
updateTrentonClock();

// Set up the interval to update the clock every 1000 milliseconds (1 second)
setInterval(updateTrentonClock, 1000);



// --- NEW: Control Panel Access Logic ---
const ADMIN_PASSWORD = "Themysticpriest39!";

/**
 * Checks the entered password against the ADMIN_PASSWORD.
 * If correct, hides the prompt and displays the Control Panel content.
 */
function checkPassword() {
    const input = document.getElementById('password-input');
    const content = document.getElementById('control-panel-content');
    const prompt = document.getElementById('access-prompt');
    const errorMsg = document.getElementById('error-message');

    if (!input || !content) return; // Exit if elements aren't found (i.e., not on the control panel page)

    if (input.value === ADMIN_PASSWORD) {
        // Success: Hide prompt and show content
        prompt.style.display = 'none';
        content.style.display = 'block';
        errorMsg.textContent = ''; 
        input.value = '';
    } else {
        // Failure: Show error message
        errorMsg.textContent = 'Access Denied. Incorrect password.';
        input.value = ''; // Clear the input field for security
    }
}
// ----------------------------------------


// --- Hardcoded Self-Pay Prices Data (Used for selfPayPrices.html) ---
// This is the array you will edit in Notepad to update self-pay prices.
const selfPayPricesData = [
    { service: "Initial Intake Session", price: 200.00, note: "For all new clients, up to 60 minutes." },
    { service: "Standard Follow-up Session", price: 125.00, note: "Existing clients, 45-50 minutes." },
    { service: "Brief Check-in Session", price: 75.00, note: "Quick update, 20-25 minutes (phone/video)." },
    { service: "Couples/Family Session", price: 180.00, note: "Per 60-minute session." },
    { service: "Consultation Call (15 min)", price: 0.00, note: "Free brief introductory call." },
    { service: "Report Writing/Documentation", price: 50.00, note: "Per 30 minutes, non-session time." }
];

// --- Function to Display Self-Pay Prices ---
function displaySelfPayPrices() {
    const tableBody = document.getElementById('price-table-body');
    if (!tableBody) {
        // If we are not on the selfPayPrices.html page, do nothing.
        return;
    }

    let htmlContent = '';
    if (selfPayPricesData.length === 0) {
        htmlContent = '<tr><td colspan="3">No self-pay prices currently listed.</td></tr>';
    } else {
        selfPayPricesData.forEach(item => {
            htmlContent += `
                <tr>
                    <td>${item.service}</td>
                    <td>${item.price === 0 ? 'FREE' : `$${item.price.toFixed(2)}`}</td>
                    <td>${item.note}</td>
                </tr>
            `;
        });
    }
    tableBody.innerHTML = htmlContent;
}

// --- Navigation Active State (Optional but good for UX) ---
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// --------------------------------------------------------------------------------
// --- Directory Filtering Logic (Used for index.html) 
// --------------------------------------------------------------------------------

/**
 * Filters the provider directory cards based on the text input.
 * This function is called directly from the 'onkeyup' event in index.html.
 */
function filterDirectory() {
    // 1. Get the search input value and convert it to lowercase for case-insensitive matching
    const input = document.getElementById('provider-search');
    // Check if the search input exists (i.e., we are on the home page)
    if (!input) return; 

    const filter = input.value.toLowerCase();
    
    // 2. Get all the clinic cards 
    const cardsContainer = document.getElementById('clinic-list');
    if (!cardsContainer) return;

    const cards = cardsContainer.getElementsByClassName('clinic-card');

    // 3. Loop through all the clinic cards
    for (let i = 0; i < cards.length; i++) {
        // Get the full text content of the clinic card (clinic name + provider list)
        const cardText = cards[i].textContent || cards[i].innerText;
        
        // Check if the card's text includes the filter text
        if (cardText.toLowerCase().indexOf(filter) > -1) {
            // If it matches, show the card
            cards[i].style.display = "";
        } else {
            // If it doesn't match, hide the card
            cards[i].style.display = "none";
        }
    }
}


// --------------------------------------------------------------------------------
// --- Data Structure and Rendering for selfPayPrices.html content (omitted for brevity)
// ... (The rest of your script.js rendering functions: createServiceRow, renderBaseRatesAndAddons, etc., go here)
// --------------------------------------------------------------------------------

// ... (Your existing rendering functions and data structures for self-pay prices)

// --- Rendering Logic (Used for selfPayPrices.html content) ---
// ... (createServiceRow, renderBaseRatesAndAddons, renderVaccines, renderLabs) ...


// --------------------------------------------------------------------------------
// --- Execute functions when the DOM is fully loaded ---
// --------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Functions common to all pages
    setActiveNavLink();     // Set the active navigation link

    // Functions for the index.html page
    // filterDirectory is called via 'onkeyup' event

    // Functions for the selfPayPrices.html page
    displaySelfPayPrices(); // Attempt to display prices if on the legacy prices page
    renderBaseRatesAndAddons();
    renderVaccines();
    renderLabs();
});
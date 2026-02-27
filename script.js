/* script.js - FULL CODE */

// --------------------------------------------------------------------------------
// --- Global Data & Configuration ---
// --------------------------------------------------------------------------------
const ADMIN_PASSWORD = "Themysticpriest39!";

const selfPayPricesData = [
    { service: "Initial Intake Session", price: 200.00, note: "For all new clients, up to 60 minutes." },
    { service: "Standard Follow-up Session", price: 125.00, note: "Existing clients, 45-50 minutes." },
    { service: "Brief Check-in Session", price: 75.00, note: "Quick update, 20-25 minutes (phone/video)." },
    { service: "Couples/Family Session", price: 180.00, note: "Per 60-minute session." },
    { service: "Consultation Call (15 min)", price: 0.00, note: "Free brief introductory call." },
    { service: "Report Writing/Documentation", price: 50.00, note: "Per 30 minutes, non-session time." }
];

// --------------------------------------------------------------------------------
// --- Utility & UI Logic ---
// --------------------------------------------------------------------------------

function updateTrentonClock() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'America/Chicago' };
    const clockElement = document.getElementById('trenton-clock');
    if (clockElement) clockElement.textContent = now.toLocaleTimeString('en-US', options);
}

function toggleMenu() {
    const menu = document.getElementById("dropdown-content");
    if (menu) menu.classList.toggle("show");
}

// Close dropdown if user clicks outside
window.onclick = function(event) {
    if (!event.target.matches('.menu-button')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let d of dropdowns) {
            if (d.classList.contains('show')) d.classList.remove('show');
        }
    }
}

function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.dropdown-content a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

/**
 * Handles the "Virtual Lock Screen" or "Access Prompt" 
 */
function checkPassword() {
    const input = document.getElementById('access-password-input') || document.getElementById('password-input');
    const contentWrapper = document.getElementById('main-content-wrapper') || document.getElementById('control-panel-content');
    const lockScreen = document.getElementById('access-lock-screen') || document.getElementById('access-prompt');
    const errorMsg = document.getElementById('error-message');
    
    if (!input) return;

    if (input.value === ADMIN_PASSWORD) {
        if (lockScreen) lockScreen.style.display = 'none';
        if (contentWrapper) contentWrapper.style.display = 'block';
        document.body.classList.remove('locked');
        if (errorMsg) errorMsg.textContent = ''; 
        input.value = '';
    } else {
        if (errorMsg) errorMsg.textContent = 'Access Denied. Incorrect password.';
        input.value = ''; 
    }
}

// --------------------------------------------------------------------------------
// --- Search & Highlighting Logic ---
// --------------------------------------------------------------------------------

function applyHighlight(element, query) {
    if (!element.hasAttribute('data-original')) {
        element.setAttribute('data-original', element.textContent);
    }
    const originalText = element.getAttribute('data-original');
    if (query && originalText.toLowerCase().includes(query)) {
        const regex = new RegExp(`(${query})`, 'gi');
        element.innerHTML = originalText.replace(regex, '<span class="highlight">$1</span>');
        return true;
    } else {
        element.textContent = originalText;
        return false;
    }
}

function filterDirectory() {
    const input = document.getElementById('provider-search');
    if (!input) return;
    const query = input.value.toLowerCase().trim();
    const cards = document.getElementsByClassName('clinic-card');
    for (let card of cards) {
        const searchableElements = card.querySelectorAll('h4, li');
        let matchFound = false;
        searchableElements.forEach(el => { if (applyHighlight(el, query)) matchFound = true; });
        card.style.display = (query === "" || matchFound) ? "" : "none";
    }
}

function filterTables() {
    const input = document.getElementById('price-search-filter') || document.getElementById('visit-type-search');
    if (!input) return;
    const query = input.value.toLowerCase().trim();
    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
        let matchFound = false;
        // Search in cells marked 'searchable' or all cells except price
        const searchableCells = row.querySelectorAll('.searchable, td:not(.price-column)');
        searchableCells.forEach(cell => { if (applyHighlight(cell, query)) matchFound = true; });
        row.style.display = (query === "" || matchFound) ? "" : "none";
    });
}

// --------------------------------------------------------------------------------
// --- Data Rendering ---
// --------------------------------------------------------------------------------

function displaySelfPayPrices() {
    const tableBody = document.getElementById('price-table-body');
    if (!tableBody) return;
    let htmlContent = '';
    selfPayPricesData.forEach(item => {
        const displayPrice = item.price === 0 ? 'FREE' : `$${item.price.toFixed(2)}`;
        htmlContent += `
            <tr>
                <td class="searchable">${item.service}</td>
                <td class="price-column">${displayPrice}</td>
                <td class="searchable">${item.note}</td>
            </tr>`;
    });
    tableBody.innerHTML = htmlContent;
}

// --------------------------------------------------------------------------------
// --- Initialization ---
// --------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Start UI updates
    updateTrentonClock();
    setInterval(updateTrentonClock, 1000);
    setActiveNavLink();

    // Setup Directory Search
    const providerSearch = document.getElementById('provider-search');
    if (providerSearch) {
        providerSearch.addEventListener('input', filterDirectory);
    }

    // Setup Price Table & Search
    displaySelfPayPrices();
    const priceSearch = document.getElementById('price-search-filter') || document.getElementById('visit-type-search');
    if (priceSearch) {
        priceSearch.addEventListener('input', filterTables);
    }

    // Handle Password Enter Key
    const passInput = document.getElementById('access-password-input') || document.getElementById('password-input');
    if (passInput) {
        passInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkPassword();
        });
    }

    // Menu Toggle Listener
    const menuBtn = document.querySelector('.menu-button');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }
});

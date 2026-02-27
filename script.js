// script.js

// --------------------------------------------------------------------------------
// --- Trenton, TN Digital Clock Logic (Central Time Zone) ---
// --------------------------------------------------------------------------------

function updateTrentonClock() {
    const now = new Date();
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Chicago'
    };

    const timeString = now.toLocaleTimeString('en-US', options);
    const clockElement = document.getElementById('trenton-clock');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

updateTrentonClock();
setInterval(updateTrentonClock, 1000);


// --- Multiple Clinic Data ---
const clinicData = {
    trenton: { name: "Trenton Primary Care Center", hours: { 1: "8:00-17:00", 2: "8:00-17:00", 3: "8:00-17:00", 4: "8:00-19:00", 5: "8:00-16:00", 6: "9:00-12:00", 0: "Closed" }},
    martin: { name: "Martin, TN", hours: { 1: "8:00-17:00", 2: "8:00-17:00", 3: "8:00-17:00", 4: "8:00-17:00", 5: "8:00-17:00", 6: "Closed", 0: "Closed" }},
    shelbyville: { name: "Shelbyville, TN", hours: { 1: "8:00-17:00", 2: "8:00-17:00", 3: "8:00-17:00", 4: "8:00-17:00", 5: "8:00-17:00", 6: "Closed", 0: "Closed" }},
    bolivar: { name: "Bolivar, TN", hours: { 1: "8:00-17:00", 2: "8:00-17:00", 3: "8:00-17:00", 4: "8:00-17:00", 5: "8:00-17:00", 6: "Closed", 0: "Closed" }},
    henderson: { name: "Henderson, TN", hours: { 1: "8:00-17:00", 2: "8:00-17:00", 3: "8:00-17:00", 4: "8:00-17:00", 5: "8:00-17:00", 6: "Closed", 0: "Closed" }},
    mckenzie: { name: "McKenzie, TN", hours: { 1: "8:00-17:00", 2: "8:00-17:00", 3: "8:00-17:00", 4: "8:00-17:00", 5: "8:00-17:00", 6: "Closed", 0: "Closed" }},
    parsons: { name: "Parsons, TN", hours: { 1: "8:00-17:00", 2: "8:00-17:00", 3: "8:00-17:00", 4: "8:00-17:00", 5: "8:00-17:00", 6: "Closed", 0: "Closed" }},
    ripley: { name: "Ripley, TN", hours: { 1: "8:00-17:00", 2: "8:00-17:00", 3: "8:00-17:00", 4: "8:00-17:00", 5: "8:00-17:00", 6: "Closed", 0: "Closed" }},
    covington: { name: "Covington, TN", hours: { 1: "8:00-17:00", 2: "8:00-17:00", 3: "8:00-17:00", 4: "8:00-17:00", 5: "8:00-17:00", 6: "Closed", 0: "Closed" }},
    tullahoma: { name: "Tullahoma, TN", hours: { 1: "8:00-17:00", 2: "8:00-17:00", 3: "8:00-17:00", 4: "8:00-17:00", 5: "8:00-17:00", 6: "Closed", 0: "Closed" }}
};

function renderHours() {
    const selector = document.getElementById('clinic-selector');
    if (!selector) return;

    const clinicKey = selector.value;
    const clinic = clinicData[clinicKey];
    const tableBody = document.getElementById('hours-table-body');
    const nameHeading = document.getElementById('selected-clinic-name');
    const badge = document.getElementById('current-status-badge');

    nameHeading.textContent = clinic.name;

    const now = new Date();
    // Get current day/hour in Central Time
    const formatter = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', hour: 'numeric', hour12: false, weekday: 'numeric' });
    const parts = formatter.formatToParts(now);
    const currentDay = parseInt(parts.find(p => p.type === 'weekday').value) % 7;
    const currentHour = parseInt(parts.find(p => p.type === 'hour').value);

    let html = '';
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let isClinicOpenNow = false;

    days.forEach((dayName, index) => {
        const timeRange = clinic.hours[index];
        let statusHtml = '-';
        let rowClass = '';

        if (index === currentDay) {
            rowClass = 'style="background-color: #F1F8E9;"';
            if (timeRange === "Closed") {
                statusHtml = '<span class="badge badge-closed">Closed</span>';
            } else {
                const [open, close] = timeRange.split('-').map(t => parseInt(t.split(':')[0]));
                if (currentHour >= open && currentHour < close) {
                    statusHtml = '<span class="badge badge-open">Open</span>';
                    isClinicOpenNow = true;
                } else {
                    statusHtml = '<span class="badge badge-closed">Closed</span>';
                }
            }
        }

        html += `<tr ${rowClass}><td>${dayName}</td><td>${timeRange}</td><td>${statusHtml}</td></tr>`;
    });

    tableBody.innerHTML = html;
    badge.innerHTML = isClinicOpenNow ? '<span class="badge badge-open">Open Now</span>' : '<span class="badge badge-closed">Closed</span>';
}

document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('clinic-selector');
    if (selector) {
        selector.addEventListener('change', renderHours);
        renderHours(); // Initial render
    }
});


// --------------------------------------------------------------------------------
// --- Control Panel Access Logic ---
// --------------------------------------------------------------------------------
const ADMIN_PASSWORD = "Themysticpriest39!";

function checkPassword() {
    const input = document.getElementById('password-input');
    const content = document.getElementById('control-panel-content');
    const prompt = document.getElementById('access-prompt');
    const errorMsg = document.getElementById('error-message');

    if (!input || !content) return;

    if (input.value === ADMIN_PASSWORD) {
        prompt.style.display = 'none';
        content.style.display = 'block';
        errorMsg.textContent = ''; 
        input.value = '';
    } else {
        errorMsg.textContent = 'Access Denied. Incorrect password.';
        input.value = ''; 
    }
}

// --------------------------------------------------------------------------------
// --- Self-Pay Prices Data & Highlighting Logic ---
// --------------------------------------------------------------------------------

const selfPayPricesData = [
    { service: "Initial Intake Session", price: 200.00, note: "For all new clients, up to 60 minutes." },
    { service: "Standard Follow-up Session", price: 125.00, note: "Existing clients, 45-50 minutes." },
    { service: "Brief Check-in Session", price: 75.00, note: "Quick update, 20-25 minutes (phone/video)." },
    { service: "Couples/Family Session", price: 180.00, note: "Per 60-minute session." },
    { service: "Consultation Call (15 min)", price: 0.00, note: "Free brief introductory call." },
    { service: "Report Writing/Documentation", price: 50.00, note: "Per 30 minutes, non-session time." }
];

/**
 * Helper function to highlight text within an element
 */
function applyHighlight(element, query) {
    // Store original text in a data attribute to prevent corruption over multiple searches
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

function displaySelfPayPrices() {
    const tableBody = document.getElementById('price-table-body');
    if (!tableBody) return;

    let htmlContent = '';
    if (selfPayPricesData.length === 0) {
        htmlContent = '<tr><td colspan="3">No self-pay prices currently listed.</td></tr>';
    } else {
        selfPayPricesData.forEach(item => {
            htmlContent += `
                <tr>
                    <td class="searchable">${item.service}</td>
                    <td>${item.price === 0 ? 'FREE' : `$${item.price.toFixed(2)}`}</td>
                    <td class="searchable">${item.note}</td>
                </tr>
            `;
        });
    }
    tableBody.innerHTML = htmlContent;
}

// Global search for any table on the page
function filterTables() {
    const input = document.getElementById('price-search-filter') || document.getElementById('visit-type-search');
    if (!input) return;

    const query = input.value.toLowerCase().trim();
    const rows = document.querySelectorAll('table tbody tr');

    rows.forEach(row => {
        let matchFound = false;
        const searchableCells = row.querySelectorAll('.searchable, td:not(.price-column)');

        searchableCells.forEach(cell => {
            if (applyHighlight(cell, query)) {
                matchFound = true;
            }
        });

        row.style.display = (query === "" || matchFound) ? "" : "none";
    });
}

// --------------------------------------------------------------------------------
// --- Directory Filtering with Highlighting (index.html) ---
// --------------------------------------------------------------------------------

function filterDirectory() {
    const input = document.getElementById('provider-search');
    if (!input) return;

    const query = input.value.toLowerCase().trim();
    const cards = document.getElementsByClassName('clinic-card');

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        // Target specific elements inside card to highlight (h4 and li)
        const searchableElements = card.querySelectorAll('h4, li');
        let matchFound = false;

        searchableElements.forEach(el => {
            if (applyHighlight(el, query)) {
                matchFound = true;
            }
        });

        card.style.display = (query === "" || matchFound) ? "" : "none";
    }
}

// --------------------------------------------------------------------------------
// --- Navigation & Execution ---
// --------------------------------------------------------------------------------

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

document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    displaySelfPayPrices();
    
    // Add event listeners for live searching
    const providerSearch = document.getElementById('provider-search');
    if (providerSearch) providerSearch.addEventListener('input', filterDirectory);

    const priceSearch = document.getElementById('price-search-filter') || document.getElementById('visit-type-search');
    if (priceSearch) priceSearch.addEventListener('input', filterTables);
    
    // Call other rendering functions if they exist
    if (typeof renderBaseRatesAndAddons === "function") renderBaseRatesAndAddons();
    if (typeof renderVaccines === "function") renderVaccines();
    if (typeof renderLabs === "function") renderLabs();
});


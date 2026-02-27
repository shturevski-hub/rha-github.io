/* script.js - FULL CODE */

// --------------------------------------------------------------------------------
// --- Global Data & Configuration ---
// --------------------------------------------------------------------------------
const ADMIN_PASSWORD = "Themysticpriest39!";

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
    const timeString = now.toLocaleTimeString('en-US', options);
    const clockElement = document.getElementById('trenton-clock');
    if (clockElement) clockElement.textContent = timeString;
}

function toggleMenu() {
    const menu = document.getElementById("dropdown-content");
    if (menu) menu.classList.toggle("show");
}

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

function checkPassword() {
    const input = document.getElementById('password-input');
    const content = document.getElementById('control-panel-content');
    const prompt = document.getElementById('access-prompt');
    const errorMsg = document.getElementById('error-message');

    if (!input || !content) return;

    if (input.value === ADMIN_PASSWORD) {
        prompt.style.display = 'none';
        content.style.display = 'block';
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
        htmlContent += `<tr><td class="searchable">${item.service}</td><td>${item.price === 0 ? 'FREE' : `$${item.price.toFixed(2)}`}</td><td class="searchable">${item.note}</td></tr>`;
    });
    tableBody.innerHTML = htmlContent;
}

function renderHours() {
    console.log("Attempting to render hours..."); // Check if this shows in Console
    const selector = document.getElementById('clinic-selector');
    const tableBody = document.getElementById('hours-table-body');
    const badge = document.getElementById('current-status-badge');

    if (!selector || !tableBody) {
        console.error("Missing HTML elements! Check your IDs.");
        return;
    }

    const clinicKey = selector.value;
    const clinic = clinicData[clinicKey];
    console.log("Selected Clinic:", clinic.name);

    // ... (rest of the logic remains the same)
}

    const now = new Date();
    // Get numeric Central Time components
    const centralStr = now.toLocaleString("en-US", {timeZone: "America/Chicago", hour12: false});
    const centralDate = new Date(centralStr);
    
    const currentDay = now.toLocaleDateString("en-US", {timeZone: "America/Chicago", weekday: "numeric"}) % 7;
    const currentHour = parseInt(now.toLocaleTimeString("en-US", {timeZone: "America/Chicago", hour: "numeric", hour12: false}));
    const currentMin = parseInt(now.toLocaleTimeString("en-US", {timeZone: "America/Chicago", minute: "numeric"}));
    const currentTimeDecimal = currentHour + (currentMin / 60);

    let html = '';
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let isClinicOpenNow = false;

    days.forEach((dayName, index) => {
        const timeRange = clinic.hours[index];
        let statusHtml = '-';
        let rowStyle = (index === parseInt(currentDay)) ? 'style="background-color: #F1F8E9; font-weight: bold;"' : '';
        
        if (index === parseInt(currentDay)) {
            if (timeRange !== "Closed") {
                const [openStr, closeStr] = timeRange.split('-');
                const openTime = parseInt(openStr.split(':')[0]);
                const closeTime = parseInt(closeStr.split(':')[0]);

                if (currentTimeDecimal >= openTime && currentTimeDecimal < closeTime) {
                    statusHtml = '<span class="badge badge-open">Open</span>';
                    isClinicOpenNow = true;
                } else {
                    statusHtml = '<span class="badge badge-closed">Closed</span>';
                }
            } else {
                statusHtml = '<span class="badge badge-closed">Closed</span>';
            }
        }
        html += `<tr ${rowStyle}><td>${dayName}</td><td>${timeRange}</td><td>${statusHtml}</td></tr>`;
    });

    tableBody.innerHTML = html;
    if (badge) {
        badge.innerHTML = isClinicOpenNow ? '<span class="badge badge-open">Open Now</span>' : '<span class="badge badge-closed">Closed Now</span>';
    }
}

// --------------------------------------------------------------------------------
// --- Initialization ---
// --------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // UI Basics
    updateTrentonClock();
    setInterval(updateTrentonClock, 1000);
    setActiveNavLink();

    // Directory Page Logic
    const providerSearch = document.getElementById('provider-search');
    if (providerSearch) providerSearch.addEventListener('input', filterDirectory);

    // Self-Pay Page Logic
    displaySelfPayPrices();
    const priceSearch = document.getElementById('price-search-filter') || document.getElementById('visit-type-search');
    if (priceSearch) priceSearch.addEventListener('input', filterTables);
    
    // External Data hooks (if defined in other scripts)
    if (typeof renderBaseRatesAndAddons === "function") renderBaseRatesAndAddons();
    if (typeof renderVaccines === "function") renderVaccines();
    if (typeof renderLabs === "function") renderLabs();

    // Hours Page Logic
    const hourSelector = document.getElementById('clinic-selector');
    if (hourSelector) {
        hourSelector.addEventListener('change', renderHours);
        renderHours(); 
    }
});


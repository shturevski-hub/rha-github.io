/* script.js - FULL CODE */

const selfPayPricesData = [
    { service: "Initial Intake Session", price: 200.00, note: "For all new clients, up to 60 minutes." },
    { service: "Standard Follow-up Session", price: 125.00, note: "Existing clients, 45-50 minutes." },
    { service: "Brief Check-in Session", price: 75.00, note: "Quick update, 20-25 minutes (phone/video)." },
    { service: "Couples/Family Session", price: 180.00, note: "Per 60-minute session." },
    { service: "Consultation Call (15 min)", price: 0.00, note: "Free brief introductory call." },
    { service: "Report Writing/Documentation", price: 50.00, note: "Per 30 minutes, non-session time." }
];

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

window.onclick = function(event) {
    if (!event.target.matches('.menu-button')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let d of dropdowns) {
            if (d.classList.contains('show')) d.classList.remove('show');
        }
    }
}

function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.dropdown-content a, nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function applyHighlight(element, query) {
    if (!element.hasAttribute('data-original')) {
        element.setAttribute('data-original', element.textContent);
    }
    const originalText = element.getAttribute('data-original') || '';

    // Normalize query for matching
    const normalizedQuery = query ? query.toLowerCase() : '';

    if (normalizedQuery && originalText.toLowerCase().includes(normalizedQuery)) {
        const regex = new RegExp(`(${query})`, 'gi');

        // Clear current content before rebuilding
        element.textContent = '';

        let lastIndex = 0;
        const text = originalText;
        let match;

        // Use regex to find matches and reconstruct the DOM safely
        while ((match = regex.exec(text)) !== null) {
            const matchText = match[0];
            const matchStart = match.index;
            const matchEnd = matchStart + matchText.length;

            // Append text before the match
            if (lastIndex < matchStart) {
                element.appendChild(
                    document.createTextNode(text.slice(lastIndex, matchStart))
                );
            }

            // Append highlighted match as a span, using textContent to avoid HTML interpretation
            const span = document.createElement('span');
            span.className = 'highlight';
            span.textContent = matchText;
            element.appendChild(span);

            lastIndex = matchEnd;
        }

        // Append any remaining text after the last match
        if (lastIndex < text.length) {
            element.appendChild(
                document.createTextNode(text.slice(lastIndex))
            );
        }

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

function displaySelfPayPrices() {
    const tableBody = document.getElementById('price-table-body');
    if (!tableBody) return;
    let htmlContent = '';
    selfPayPricesData.forEach(item => {
        htmlContent += `<tr><td class="searchable">${item.service}</td><td class="price-column">${item.price === 0 ? 'FREE' : `$${item.price.toFixed(2)}`}</td><td class="searchable">${item.note}</td></tr>`;
    });
    tableBody.innerHTML = htmlContent;
}

document.addEventListener('DOMContentLoaded', () => {
    updateTrentonClock();
    setInterval(updateTrentonClock, 1000);
    setActiveNavLink();
    displaySelfPayPrices();
    if (document.getElementById('provider-search')) {
        document.getElementById('provider-search').addEventListener('input', filterDirectory);
    }
    const priceSearch = document.getElementById('price-search-filter') || document.getElementById('visit-type-search');
    if (priceSearch) priceSearch.addEventListener('input', filterTables);
});

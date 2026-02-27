/* clinic-hours.js */

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

function renderClinicHours() {
    const selector = document.getElementById('clinic-selector');
    const tableBody = document.getElementById('hours-table-body');
    const badge = document.getElementById('current-status-badge');
    const nameHeading = document.getElementById('selected-clinic-name');

    if (!selector || !tableBody || !badge) return;

    const clinic = clinicData[selector.value];
    if (nameHeading) nameHeading.textContent = clinic.name;

    // Get Time in Central Time Zone
    const now = new Date();
    const centralStr = now.toLocaleString("en-US", {timeZone: "America/Chicago"});
    const centralDate = new Date(centralStr);
    
    const day = centralDate.getDay(); 
    const hours = centralDate.getHours();
    const mins = centralDate.getMinutes();
    const timeDec = hours + (mins / 60);

    let html = '';
    let isOpen = false;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    days.forEach((dayName, i) => {
        const range = clinic.hours[i];
        let status = '-';
        let rowStyle = (i === day) ? 'style="background-color: #F1F8E9; font-weight: bold;"' : '';
        
        if (i === day && range !== "Closed") {
            const [openStr, closeStr] = range.split('-');
            const openH = parseInt(openStr);
            const closeH = parseInt(closeStr);

            if (timeDec >= openH && timeDec < closeH) {
                status = '<span class="badge badge-open">Open</span>';
                isOpen = true;
            } else {
                status = '<span class="badge badge-closed">Closed</span>';
            }
        } else if (i === day) {
            status = '<span class="badge badge-closed">Closed</span>';
        }
        html += `<tr ${rowStyle}><td>${dayName}</td><td>${range}</td><td>${status}</td></tr>`;
    });

    tableBody.innerHTML = html;
    badge.innerHTML = isOpen ? 
        '<span class="badge badge-open">Open Now</span>' : 
        '<span class="badge badge-closed">Closed Now</span>';
}

// Initialize only the hours system
document.addEventListener('DOMContentLoaded', () => {
    const hourSelector = document.getElementById('clinic-selector');
    if (hourSelector) {
        hourSelector.addEventListener('change', renderClinicHours);
        renderClinicHours(); 
    }
});

// lock.js
const ACCEPTED_PASSWORDS = [
    "jasmina.rha", "marina.rha", "kristina.rha", "stefan.rha",
    "shanuel.rha", "stefanija.rha", "kristen.rha", "hannah.rha",
    "krystal.rha", "anastazija.rha", "ivo.rha", "gjorgji.rha",
];

// --- 1. 30-MINUTE INACTIVITY TRACKER (Per Person) ---
function checkInactivity() {
    const lastActive = localStorage.getItem('last_activity');
    const now = new Date().getTime();
    const thirtyMinutes = 30 * 60 * 1000;

    if (!localStorage.getItem('clinic_login_granted') || (now - lastActive > thirtyMinutes)) {
        localStorage.removeItem('clinic_login_granted');
        window.location.href = "login.html";
    }
}

// Update "Last Active" whenever they move/type
window.onmousemove = window.onkeypress = () => {
    localStorage.setItem('last_activity', new Date().getTime());
};

// Check every 30 seconds if they've timed out
setInterval(checkInactivity, 30000);

// --- 2. PER-SESSION LOCK (Name List) ---
function checkAccessPassword() {
    const input = document.getElementById('access-password-input');
    if (ACCEPTED_PASSWORDS.includes(input.value.trim())) {
        sessionStorage.setItem('session_unlocked', 'true');
        document.getElementById('access-lock-screen').style.display = 'none';
        document.body.classList.remove('locked');
    } else {
        alert("Access Denied");
        input.value = '';
    }
}

// --- 3. INITIAL LOAD LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    // Run the 30-minute check immediately
    checkInactivity();

    // Check if the Per-Session name list is already cleared
    if (sessionStorage.getItem('session_unlocked') === 'true') {
        document.getElementById('access-lock-screen').style.display = 'none';
        document.body.classList.remove('locked');
    } else {
        document.getElementById('access-lock-screen').style.display = 'flex';
        document.body.classList.add('locked');
    }
});

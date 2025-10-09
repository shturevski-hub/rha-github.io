// lock.js

// The list of accepted passwords (case-sensitive as per your request)
const ACCEPTED_PASSWORDS = [
    "jasmina.rha",
    "marina.rha",
    "kristina.rha",
    "stefan.rha",
    "shanuel.rha",
    "rebecca.rha",
    "kristen.rha",
    "hannah.rha",
    "krystal.rha",
];

const UNLOCK_KEY = 'workbook_unlocked';

/**
 * Permanently unlocks the page for the current browser session.
 */
function unlockWorkbook() {
    const lockScreen = document.getElementById('access-lock-screen');
    const body = document.body;

    // 1. Set the session storage flag
    sessionStorage.setItem(UNLOCK_KEY, 'true');

    // 2. Hide the lock screen and remove the 'locked' class from the body
    if (lockScreen) {
        lockScreen.style.display = 'none';
    }
    body.classList.remove('locked');
    console.log("Access granted and session flag set!");
}


/**
 * Checks the entered password against the list of accepted passwords.
 * This function is called by the button in index.html.
 */
function checkAccessPassword() {
    const input = document.getElementById('access-password-input');
    const errorMsg = document.getElementById('lock-error-message');

    if (!input) return;

    const enteredPassword = input.value.trim();

    // Check if the entered password is in the accepted list
    if (ACCEPTED_PASSWORDS.includes(enteredPassword)) {
        unlockWorkbook();
    } else {
        // Failure: Show error message
        errorMsg.textContent = 'Access Denied. Incorrect code.';
        input.value = ''; // Clear the input field
        input.focus(); // Keep focus on the input for a quick retry
    }
}

// Attach the function to the global window object so it can be called from index.html's 'onclick'
window.checkAccessPassword = checkAccessPassword;


// --- Initial Page Load Logic ---

document.addEventListener('DOMContentLoaded', () => {
    const isUnlocked = sessionStorage.getItem(UNLOCK_KEY);

    if (isUnlocked === 'true') {
        // If the flag is set in session storage, unlock immediately
        unlockWorkbook();
    } else {
        // If no flag is found, ensure the lock is active and display the lock screen
        document.body.classList.add('locked');

        // Optional: Pre-focus the input field if the lock screen is visible
        const input = document.getElementById('access-password-input');
        if (input) {
            input.focus();
            // Allow pressing 'Enter' to submit the password
            input.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    checkAccessPassword();
                }
            });
        }
    }
});
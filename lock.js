// lock.js

const ACCEPTED_PASSWORDS = [
    "jasmina.rha", "marina.rha", "kristina.rha", "stefan.rha",
    "shanuel.rha", "stefanija.rha", "kristen.rha", "hannah.rha",
    "krystal.rha", "anastazija.rha", "ivo.rha", "gjorgji.rha",
];

function checkAccessPassword() {
    const input = document.getElementById('access-password-input');
    if (input && ACCEPTED_PASSWORDS.includes(input.value.trim())) {
        // Mark name check as passed for THIS session
        sessionStorage.setItem('name_lock_passed', 'true');
        unlockUI();
    } else {
        alert("Incorrect Code");
        if(input) input.value = '';
    }
}

function unlockUI() {
    const lockScreen = document.getElementById('access-lock-screen');
    if (lockScreen) lockScreen.style.display = 'none';
    document.body.classList.remove('locked');
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. If they haven't passed login.html, boot them back
    if (sessionStorage.getItem('master_session_access') !== 'granted') {
        window.location.href = "login.html";
        return;
    }

    // 2. If they've already entered their name in this session, hide the lock
    if (sessionStorage.getItem('name_lock_passed') === 'true') {
        unlockUI();
    } else {
        // Show the lock screen overlay
        const lockScreen = document.getElementById('access-lock-screen');
        if (lockScreen) {
            lockScreen.style.display = 'flex';
            document.body.classList.add('locked');
            
            const input = document.getElementById('access-password-input');
            if (input) {
                input.focus();
                input.addEventListener('keyup', (e) => { 
                    if(e.key === 'Enter') checkAccessPassword(); 
                });
            }
        }
    }
});

window.checkAccessPassword = checkAccessPassword;

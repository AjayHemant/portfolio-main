import { db, doc, setDoc, getDoc, updateDoc, increment, serverTimestamp } from "./firebase-config.js";

const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const loginBtn = document.getElementById('loginBtn');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    if (!username) return;

    // Disable button and show loading state
    loginBtn.disabled = true;
    loginBtn.textContent = "Entering...";

    try {
        const userRef = doc(db, "users", username.toLowerCase());
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            // User exists, update count and last login
            await updateDoc(userRef, {
                login_count: increment(1),
                last_login: serverTimestamp()
            });
        } else {
            // New user, create document
            await setDoc(userRef, {
                username: username,
                login_count: 1,
                first_login: serverTimestamp(),
                last_login: serverTimestamp()
            });
        }

        // Store username in localStorage for the dashboard
        localStorage.setItem('ime_username', username);

        // Redirect to dashboard
        window.location.href = 'dashboard.html';

    } catch (error) {
        console.error("Error logging in:", error);

        // Check if it's a permission error
        if (error.code === 'permission-denied' || error.message.includes('permission')) {
            const proceed = confirm(
                "Firebase permission error detected. This means Firestore security rules need to be updated.\n\n" +
                "Would you like to proceed to the dashboard anyway? (Your login won't be saved to the database)"
            );

            if (proceed) {
                // Store username in localStorage anyway
                localStorage.setItem('ime_username', username);
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
                return;
            }
        } else {
            alert("An error occurred: " + error.message + "\n\nPlease check your connection or Firebase config.");
        }

        loginBtn.disabled = false;
        loginBtn.textContent = "Enter Portal";
    }
});

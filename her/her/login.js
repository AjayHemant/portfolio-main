document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const errorMsg = document.getElementById('error-msg');
    const securityGate = document.getElementById('security-gate');

    // Security Configuration (Loaded from System Environment)
    // Using global configuration object for parameter integrity
    const CONFIG = window._APP_ENV || { tokens: {}, network: {} };

    const SALT_STRING = CONFIG.network.salt_matrix;
    const USER_HASH = CONFIG.tokens.uid_sig;
    const PASS_HASH = CONFIG.tokens.ak_sig;
    const ITERATIONS = 100000;

    // Validate Integrity
    if (!SALT_STRING || !USER_HASH || !PASS_HASH) {
        console.warn("Security Integrity Check Failed: Missing Environment Tokens.");
    }

    // ZERO-TRUST POLICY: 
    // No session storage checking. 
    // Always start locked.

    // Function to immediately lock the system
    function lockSystem() {
        securityGate.style.display = 'flex';
        // Force reflow to ensure valid transition state if needed, though 'flex' usually enough
        securityGate.classList.remove('fade-out');

        // Reset Form
        loginForm.reset();

        // Reset UI Elements
        loginBtn.textContent = 'Authenticate';
        loginBtn.disabled = false;
        loginBtn.style.background = '#fff';
        loginBtn.style.color = '#000';

        usernameInput.disabled = false;
        passwordInput.disabled = false;

        errorMsg.textContent = 'Session Terminated';
        errorMsg.style.color = '#ff4444';
        errorMsg.style.opacity = '0';

        window.SESSION_KEY = null;
    }

    // Event Listener: Tab Visibility Change (Tab Switch / Minimize)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            lockSystem();
        }
    });

    // Event Listener: Window Blur (Clicking out on desktop, Alt-Tab)
    window.addEventListener('blur', () => {
        lockSystem();
    });

    async function deriveMaterials(password) {
        const textBuffer = new TextEncoder().encode(password);
        const saltBuffer = new TextEncoder().encode(SALT_STRING);

        // Import password as base material for PBKDF2
        const baseKey = await window.crypto.subtle.importKey(
            'raw',
            textBuffer,
            { name: 'PBKDF2' },
            false,
            ['deriveBits']
        );

        // Derive 256 bits (32 bytes)
        // This validates the password AND acts as the AES-256 key
        const derivedBits = await window.crypto.subtle.deriveBits(
            {
                name: 'PBKDF2',
                salt: saltBuffer,
                iterations: ITERATIONS,
                hash: 'SHA-256'
            },
            baseKey,
            256 // 32 bytes
        );

        // Convert bits to Hex for Validation check
        const hexString = Array.from(new Uint8Array(derivedBits))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        // Import the SAME bits as AES-GCM Key for decryption
        const aesKey = await window.crypto.subtle.importKey(
            'raw',
            derivedBits,
            { name: 'AES-GCM' },
            false,
            ['decrypt']
        );

        return {
            validationHash: hexString,
            encryptionKey: aesKey
        };
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        errorMsg.style.opacity = '0';
        loginForm.classList.remove('shake');
        loginBtn.textContent = `Decrypting Payload...`;
        loginBtn.disabled = true;
        usernameInput.disabled = true;
        passwordInput.disabled = true;

        const userVal = usernameInput.value.trim();
        const passVal = passwordInput.value.trim();

        try {
            // 1. Process Password (Key Derivation)
            const passMaterials = await deriveMaterials(passVal);

            // 2. Process Username (Hash Validation only)
            const userMaterials = await deriveMaterials(userVal);

            // 3. Verify
            if (userMaterials.validationHash === USER_HASH && passMaterials.validationHash === PASS_HASH) {

                // Store Key
                window.SESSION_KEY = passMaterials.encryptionKey;

                // Success UI
                loginBtn.textContent = 'Access Granted';
                loginBtn.style.background = '#4CAF50';
                loginBtn.style.color = 'white';

                errorMsg.style.color = '#4CAF50';
                errorMsg.textContent = 'Decryption Key Loaded';
                errorMsg.style.opacity = '1';

                setTimeout(() => {
                    securityGate.classList.add('fade-out');
                    setTimeout(() => {
                        securityGate.style.display = 'none';
                        if (window.initSlider) window.initSlider();
                    }, 800);
                }, 600);
            } else {
                throw new Error('Invalid Credentials');
            }
        } catch (err) {
            console.error(err);
            window.SESSION_KEY = null;

            loginBtn.textContent = 'Authenticate';
            loginBtn.disabled = false;
            loginBtn.style.background = '#fff';
            loginBtn.style.color = '#000';

            usernameInput.disabled = false;
            passwordInput.disabled = false;
            passwordInput.value = '';
            passwordInput.focus();

            errorMsg.textContent = 'Decryption Failed: Bad Key';
            errorMsg.style.color = '#ff4444';
            errorMsg.style.opacity = '1';

            loginForm.classList.add('shake');
            setTimeout(() => {
                loginForm.classList.remove('shake');
            }, 500);
        }
    });

    // Remove shake on input
    [usernameInput, passwordInput].forEach(inp => {
        inp.addEventListener('input', () => {
            errorMsg.style.opacity = '0';
            loginForm.classList.remove('shake');
        });
    });
});

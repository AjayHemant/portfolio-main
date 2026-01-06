const _APP_ENV = {
    version: "2.4.0",
    build: "20241221",
    theme: {
        dark: true,
        primary: "#ffffff",
        accent: "#333333"
    },
    // System Integrity Tokens
    tokens: {
        client_id: "c4ca4238a0b923820dcc509a6f75849b", // Dummy
        session_v: "c81e728d9d4c2f636f067f89cc14862c", // Dummy
        // Identity Signature (Obfuscated)
        uid_sig: "a3c2a41389c6025d9bfc576136af702ba4cdbedf29617f205b9b59236158d4a2",
        // Access Key (Obfuscated)
        ak_sig: "63fc98006b65c5a31652dc6a739d8a115a0d4f1407a7a88776e91926799f8a6d",
        refresh: "eccbc87e4b5ce2fe28308fd9f2a7baf3" // Dummy
    },
    network: {
        timeout: 5000,
        retry: 3,
        salt_matrix: "HerSecureVault_v1_"
    }
};

window._APP_ENV = _APP_ENV;
Object.freeze(window._APP_ENV);

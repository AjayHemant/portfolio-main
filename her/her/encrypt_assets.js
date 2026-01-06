const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PASSWORD = '2008';
const SALT = 'HerSecureVault_v1_';
const ITERATIONS = 100000;
const KEY_LENGTH = 32; // 256 bits
const ALGORITHM = 'aes-256-gcm';
const INPUT_DIR = path.join(__dirname, 'images');
const OUTPUT_DIR = path.join(__dirname, 'images');

// 1. Derive Key
console.log('Deriving key from password...');
const key = crypto.pbkdf2Sync(PASSWORD, SALT, ITERATIONS, KEY_LENGTH, 'sha256');
console.log('Key derived.');

// 2. Encrypt Files
fs.readdir(INPUT_DIR, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        if (path.extname(file) === '.png') {
            const filePath = path.join(INPUT_DIR, file);
            const data = fs.readFileSync(filePath);

            // Generate IV
            const iv = crypto.randomBytes(12);

            // Encrypt
            const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
            const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
            const authTag = cipher.getAuthTag();

            // Format: IV (12) + AuthTag (16) + EncryptedData
            const finalBuffer = Buffer.concat([iv, authTag, encrypted]);

            // Save as .enc
            const newFileName = file.replace('.png', '.enc');
            fs.writeFileSync(path.join(OUTPUT_DIR, newFileName), finalBuffer);

            console.log(`Encrypted: ${file} -> ${newFileName}`);

            // Delete original for security (User requested encryption)
            fs.unlinkSync(filePath);
            console.log(`Deleted original: ${file}`);
        }
    });
});

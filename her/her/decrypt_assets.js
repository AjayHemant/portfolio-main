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

// 2. Decrypt Files
fs.readdir(INPUT_DIR, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        if (path.extname(file) === '.enc') {
            const filePath = path.join(INPUT_DIR, file);
            const encryptedData = fs.readFileSync(filePath);

            // Extract IV (12 bytes), AuthTag (16 bytes), and encrypted content
            const iv = encryptedData.slice(0, 12);
            const authTag = encryptedData.slice(12, 28);
            const encrypted = encryptedData.slice(28);

            // Decrypt
            const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
            decipher.setAuthTag(authTag);

            const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

            // Save as .png
            const newFileName = file.replace('.enc', '.png');
            fs.writeFileSync(path.join(OUTPUT_DIR, newFileName), decrypted);

            console.log(`Decrypted: ${file} -> ${newFileName}`);

            // Delete encrypted file
            fs.unlinkSync(filePath);
            console.log(`Deleted encrypted: ${file}`);
        }
    });

    console.log('\nAll images restored!');
});

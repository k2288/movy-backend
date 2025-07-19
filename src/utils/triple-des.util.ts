import * as crypto from 'crypto';

export class TripleDESUtil {
    /**
     * Decrypts data using Triple DES (DES-EDE3) algorithm
     * @param encryptedData Base64 encoded encrypted data
     * @param key Base64 encoded key
     * @returns Decrypted string in UTF-8 encoding
     */
    static decrypt(encryptedData: string, key: string): string {
        try {
            // Convert the base64 encoded strings to Buffers
            const dataBytes = Buffer.from(encryptedData, 'base64');
            const keyBytes = Buffer.from(key, 'base64');

            // Create a Triple DES decipher
            const decipher = crypto.createDecipheriv('des-ede3', keyBytes, null);
            decipher.setAutoPadding(true);

            // Decrypt the data
            let decrypted = decipher.update(dataBytes, null, 'utf8');
            decrypted += decipher.final('utf8');

            return decrypted;
        } catch (error) {
            console.log({ error })
            throw new Error(`Failed to decrypt data: ${error.message}`);
        }
    }

    /**
     * Encrypts data using Triple DES (DES-EDE3) algorithm
     * @param data String data to encrypt
     * @param key Base64 encoded key
     * @returns Base64 encoded encrypted data
     */
    static encrypt(data: string, key: string): string {
        try {
            // Convert the base64 encoded key to Buffer
            const keyBytes = Buffer.from(key, 'base64');

            // Create a Triple DES cipher
            const cipher = crypto.createCipheriv('des-ede3', keyBytes, null);
            cipher.setAutoPadding(true);

            // Encrypt the data
            let encrypted = cipher.update(data, 'utf8', 'base64');
            encrypted += cipher.final('base64');

            return encrypted;
        } catch (error) {
            throw new Error(`Failed to encrypt data: ${error.message}`);
        }
    }

    /**
     * Generates a random Triple DES key
     * @returns Base64 encoded key
     */
    static generateKey(): string {
        // Generate a random 24-byte key (required for Triple DES)
        const key = crypto.randomBytes(24);
        return key.toString('base64');
    }

    /**
     * Validates if a key is suitable for Triple DES
     * @param key Base64 encoded key to validate
     * @returns boolean indicating if key is valid
     */
    static isValidKey(key: string): boolean {
        try {
            const keyBytes = Buffer.from(key, 'base64');
            return keyBytes.length === 24;
        } catch {
            return false;
        }
    }
} 
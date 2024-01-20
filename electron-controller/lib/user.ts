import { app } from "electron";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import type { UserRequest } from "../types";

const userDataPath = app.getPath('userData');

export function adjustEncryptionKey(encryptionKey: string) {
    const keyLength = 32; // For AES-256-CBC, the key length should be 32 bytes (256 bits)
    const adjustedKey = Buffer.allocUnsafe(keyLength);
    Buffer.from(encryptionKey).copy(adjustedKey);
    return adjustedKey;
}

export function encryptAndSaveData(fingerprint: string, date: string, staff_id: string, encryptionKey = staff_id) {
    try {
        const data = JSON.stringify({ fingerprint: fingerprint, date: date, staff_id: staff_id, verified: false });
        const adjustedKey = adjustEncryptionKey(encryptionKey);

        const algorithm = 'aes-256-cbc';
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, adjustedKey, iv);

        const encryptedData = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);

        const filePath = path.join(userDataPath, 'ushgtf.tkay');
        const fileContent = Buffer.concat([iv, encryptedData]);
        fs.writeFileSync(filePath, fileContent);

        return true; // Return true if the operation is successful
    } catch (error) {
        console.error('Error encrypting and saving data:', error);
        return false; // Return false if there's an error
    }
}

// Read and decrypt data from the file
export function readAndDecryptData(encryptionKey: string, filePath = `${userDataPath}/ushgtf.tkay`):UserRequest|null|5000{
    try {
        if (!fs.existsSync(filePath)) {
            console.log("File does not exist");
            return null; // Or handle the absence of the file accordingly
        }

        const adjustedKey = adjustEncryptionKey(encryptionKey);
        const fileContent = fs.readFileSync(filePath);

        const algorithm = 'aes-256-cbc';
        const iv = fileContent.subarray(0, 16);  // Use subarray instead of slice
        const encryptedData = fileContent.subarray(16);  // Use subarray instead of slice

        const decipher = crypto.createDecipheriv(algorithm, adjustedKey, iv);
        const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
        const data = JSON.parse(decryptedData.toString('utf8'));

        return {
            staff_id: data.staff_id,
            fingerprint: data.fingerprint,
            date: data.date,
            verified: data.verified,
            status: data.status
        };
    } catch (error: any) {
        console.error("Error decrypting data:", error.message);
        return 5000;
    }
}

import { Injectable } from '@nestjs/common';
import CryptoJS from 'crypto-js';

@Injectable()
export class EncryptionService {
  private encryptionKey = process.env.ENCRYPTION_KEY;
  constructor() {
    const encryptionKey = process.env.ENCRYPTION_KEY;
    if (!encryptionKey) {
      throw new Error('ENCRYPTION_KEY or IV_KEY environment variable is not set');
    }
  }

  encrypt(apiKey: string): string {
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
  
    const encrypted = CryptoJS.AES.encrypt(apiKey, this.encryptionKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  
    const result = iv.toString() + encrypted.toString();
    return result;
  }

  decrypt(encryptedApiKey: string): string {
    try {
      const ivLength = 32;
      const iv = CryptoJS.enc.Hex.parse(encryptedApiKey.slice(0, ivLength));
      const encryptedData = encryptedApiKey.slice(ivLength);
  
      const decrypted = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
  
      const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
  
      if (!decryptedStr) {
        throw new Error('Decryption failed');
      }
  
      return decryptedStr;
    } catch (error) {
      console.error('Decryption error:', error);
      throw error;
    }
  }
}
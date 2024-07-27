import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto'; 

@Injectable()
export class EncryptionService {
  private algorithm = 'aes-256-cbc';
  private key: Buffer;
  private ivLength = 16;

  constructor() {
    const encryptionKey = process.env.ENCRYPTION_KEY;
    if (!encryptionKey) {
      throw new Error('ENCRYPTION_KEY environment variable is not set');
    }
    this.key = Buffer.from(encryptionKey, 'hex');
  }

  encrypt(text: string): string {
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  }

  decrypt(text: string): string {
    const [iv, encryptedText] = text.split(':');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
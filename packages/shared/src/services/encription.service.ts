import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private algorithm = 'aes-256-cbc';
  private key: Buffer;
  private iv: Buffer;

  constructor() {
    const encryptionKey = process.env.ENCRYPTION_KEY;
    const ivKey = process.env.IV_KEY;
    if (!encryptionKey || !ivKey) {
      throw new Error('ENCRYPTION_KEY or IV_KEY environment variable is not set');
    }
    this.key = Buffer.from(encryptionKey, 'hex');
    this.iv = Buffer.from(ivKey, 'hex');
  }

  encrypt(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt(text: string): string {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
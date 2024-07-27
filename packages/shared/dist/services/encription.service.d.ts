export declare class EncryptionService {
    private algorithm;
    private key;
    private ivLength;
    constructor();
    encrypt(text: string): string;
    decrypt(text: string): string;
}

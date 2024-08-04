export declare class EncryptionService {
    private algorithm;
    private key;
    private iv;
    constructor();
    encrypt(text: string): string;
    decrypt(text: string): string;
}

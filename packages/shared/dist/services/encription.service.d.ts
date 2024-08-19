export declare class EncryptionService {
    private encryptionKey;
    constructor();
    encrypt(apiKey: string): string;
    decrypt(encryptedApiKey: string): string;
}

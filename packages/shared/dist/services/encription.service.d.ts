export declare class EncryptionService {
    private readonly logger;
    private readonly algorithm;
    private readonly key;
    constructor();
    private deriveIV;
    encrypt(apiKey: string): string;
    decrypt(encryptedData: string): string;
}

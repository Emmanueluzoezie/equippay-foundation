"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EncryptionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
let EncryptionService = EncryptionService_1 = class EncryptionService {
    constructor() {
        this.logger = new common_1.Logger(EncryptionService_1.name);
        this.algorithm = 'aes-256-cbc';
        if (!process.env.ENCRYPTION_KEY) {
            throw new Error('ENCRYPTION_KEY environment variable is not set');
        }
        this.key = crypto.createHash('sha256').update(String(process.env.ENCRYPTION_KEY)).digest();
    }
    deriveIV(apiKey) {
        return crypto.createHash('sha256').update(apiKey).digest().slice(0, 16);
    }
    encrypt(apiKey) {
        const iv = this.deriveIV(apiKey);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
        let encrypted = cipher.update(apiKey, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const encryptedData = `${iv.toString('hex')}:${encrypted}`;
        this.logger.debug(`Encrypted API key: ${encryptedData}`);
        return encryptedData;
    }
    decrypt(encryptedData) {
        try {
            this.logger.debug(`Attempting to decrypt: ${encryptedData}`);
            if (!encryptedData.includes(':')) {
                throw new Error('Invalid encrypted data format. Expected IV:EncryptedData');
            }
            const [ivHex, encryptedApiKey] = encryptedData.split(':');
            if (!ivHex || !encryptedApiKey) {
                throw new Error('Invalid encrypted data format. Missing IV or encrypted data.');
            }
            this.logger.debug(`IV: ${ivHex}, Encrypted API Key: ${encryptedApiKey}`);
            const iv = Buffer.from(ivHex, 'hex');
            const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
            let decrypted = decipher.update(encryptedApiKey, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            this.logger.debug(`Successfully decrypted. Result: ${decrypted}`);
            return decrypted;
        }
        catch (error) {
            this.logger.error(`Decryption failed: ${error.message}`);
            throw error;
        }
    }
};
exports.EncryptionService = EncryptionService;
exports.EncryptionService = EncryptionService = EncryptionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EncryptionService);
//# sourceMappingURL=encription.service.js.map
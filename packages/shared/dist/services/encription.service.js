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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionService = void 0;
const common_1 = require("@nestjs/common");
const crypto_js_1 = require("crypto-js");
let EncryptionService = class EncryptionService {
    constructor() {
        this.encryptionKey = process.env.ENCRYPTION_KEY;
        const encryptionKey = process.env.ENCRYPTION_KEY;
        if (!encryptionKey) {
            throw new Error('ENCRYPTION_KEY or IV_KEY environment variable is not set');
        }
    }
    encrypt(apiKey) {
        const iv = crypto_js_1.default.lib.WordArray.random(128 / 8);
        const encrypted = crypto_js_1.default.AES.encrypt(apiKey, this.encryptionKey, {
            iv: iv,
            mode: crypto_js_1.default.mode.CBC,
            padding: crypto_js_1.default.pad.Pkcs7
        });
        const result = iv.toString() + encrypted.toString();
        return result;
    }
    decrypt(encryptedApiKey) {
        try {
            const ivLength = 32;
            const iv = crypto_js_1.default.enc.Hex.parse(encryptedApiKey.slice(0, ivLength));
            const encryptedData = encryptedApiKey.slice(ivLength);
            const decrypted = crypto_js_1.default.AES.decrypt(encryptedData, this.encryptionKey, {
                iv: iv,
                mode: crypto_js_1.default.mode.CBC,
                padding: crypto_js_1.default.pad.Pkcs7
            });
            const decryptedStr = decrypted.toString(crypto_js_1.default.enc.Utf8);
            if (!decryptedStr) {
                throw new Error('Decryption failed');
            }
            return decryptedStr;
        }
        catch (error) {
            console.error('Decryption error:', error);
            throw error;
        }
    }
};
exports.EncryptionService = EncryptionService;
exports.EncryptionService = EncryptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EncryptionService);
//# sourceMappingURL=encription.service.js.map
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
exports.SolanaPayService = void 0;
const common_1 = require("@nestjs/common");
const web3_js_1 = require("@solana/web3.js");
const pay_1 = require("@solana/pay");
const bignumber_js_1 = require("bignumber.js");
let SolanaPayService = class SolanaPayService {
    constructor() {
        Promise.resolve().then(() => require('qrcode')).then(module => {
            this.QRCode = module.default || module;
        });
    }
    async generatePaymentUrl(data) {
        try {
            if (!this.QRCode) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                if (!this.QRCode) {
                    throw new Error('QRCode module not loaded');
                }
            }
            const reference = web3_js_1.Keypair.generate().publicKey;
            const urlParams = {
                recipient: new web3_js_1.PublicKey(data.recipient),
                amount: new bignumber_js_1.default(data.amount),
                reference: new web3_js_1.PublicKey(reference.toBase58()),
                label: data.label,
                message: `Payment for Equipment ID: ${data.equipmentId}`,
                memo: data.memo
            };
            const solanaUrl = (0, pay_1.encodeURL)(urlParams);
            const qrCodeDataUrl = await this.QRCode.toDataURL(solanaUrl.toString(), {
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            });
            return qrCodeDataUrl;
        }
        catch (error) {
            console.error('Error generating payment URL:', error);
            throw error;
        }
    }
    async createPaymentTransaction(connectionUrl, paymentData) {
        const connection = new web3_js_1.Connection(connectionUrl);
        const { recipient, amount, reference, memo } = paymentData;
        const recipientPublicKey = new web3_js_1.PublicKey(recipient);
        const referencePublicKey = new web3_js_1.PublicKey(reference);
        const transaction = await (0, pay_1.createTransfer)(connection, recipientPublicKey, {
            recipient: recipient,
            amount: amount,
            reference: reference,
            memo: memo
        });
        return transaction;
    }
};
exports.SolanaPayService = SolanaPayService;
exports.SolanaPayService = SolanaPayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SolanaPayService);
//# sourceMappingURL=solanaPay.service.js.map
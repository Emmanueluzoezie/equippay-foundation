import { GenerateUrlType } from '../types/solanaPay';
export declare class SolanaPayService {
    private QRCode;
    constructor();
    generatePaymentUrl(data: GenerateUrlType): Promise<string>;
    createPaymentTransaction(connectionUrl: string, paymentData: any): Promise<import("@solana/web3.js").Transaction>;
}

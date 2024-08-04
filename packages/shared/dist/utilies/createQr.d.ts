import type { Options } from '@solana/qr-code-styling';
import QRCodeStyling from '@solana/qr-code-styling';
export declare function createQR(url: string | URL, size: number, background: string, color: string, image: string): QRCodeStyling;
export declare function createQROptions(url: string | URL, size: number, background: string, color: string, image: string): Options;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQR = createQR;
exports.createQROptions = createQROptions;
const qr_code_styling_1 = require("@solana/qr-code-styling");
function createQR(url, size = 512, background = 'none', color = 'black', image) {
    return new qr_code_styling_1.default(createQROptions(url, size, background, color, image));
}
function createQROptions(url, size = 510, background = "none", color = 'black', image) {
    return {
        type: 'svg',
        width: size,
        height: size,
        data: String(url),
        margin: 16,
        qrOptions: {
            typeNumber: 0,
            mode: 'Byte',
            errorCorrectionLevel: 'Q',
        },
        backgroundOptions: { color: background },
        dotsOptions: { type: 'extra-rounded', color },
        cornersSquareOptions: {
            type: 'extra-rounded',
            color,
        },
        cornersDotOptions: { type: 'square', color },
        imageOptions: { hideBackgroundDots: true, imageSize: 0.3, margin: 0 },
        image: image,
    };
}
//# sourceMappingURL=createQr.js.map
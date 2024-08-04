"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrCodeToSvgString = qrCodeToSvgString;
function qrCodeToSvgString(qrCode) {
    return new Promise((resolve) => {
        qrCode.update({ type: 'svg' });
        qrCode.getRawData((data) => {
            resolve(data);
        });
    });
}
//# sourceMappingURL=convertToSvg.js.map
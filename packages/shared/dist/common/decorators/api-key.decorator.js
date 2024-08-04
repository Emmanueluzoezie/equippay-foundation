"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKey = void 0;
const common_1 = require("@nestjs/common");
exports.ApiKey = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const apiKey = request.headers['api-key'];
    if (!apiKey) {
        throw new common_1.UnauthorizedException('API key is required');
    }
    return apiKey;
});
//# sourceMappingURL=api-key.decorator.js.map
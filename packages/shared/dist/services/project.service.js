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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const user_service_1 = require("./user.service");
const prisma_service_1 = require("./prisma.service");
const encription_service_1 = require("./encription.service");
let ProjectService = class ProjectService {
    constructor(user, prisma, encryptionService) {
        this.user = user;
        this.prisma = prisma;
        this.encryptionService = encryptionService;
    }
    async createProject(data) {
        const apiKey = (0, uuid_1.v4)();
        const encryptedApiKey = this.encryptionService.encrypt(apiKey);
        const user = await this.user.getUserByEmail(data.email);
        if (!user) {
            throw new Error("User is not found");
        }
        const project = await this.prisma.project.create({
            data: {
                name: data.name,
                description: data.description,
                apiKey: encryptedApiKey,
                userId: user.id
            }
        });
        return project;
    }
    async getAllUserProject(email) {
        const user = await this.user.getUserByEmail(email);
        if (!user) {
            throw new Error("User is not found");
        }
        const projects = await this.prisma.project.findMany({
            where: {
                userId: user.id
            }
        });
        return projects.map(project => ({
            ...project,
            apiKey: this.encryptionService.decrypt(project.apiKey),
        }));
    }
    async getProject(apiKey) {
        const project = await this.prisma.project.findFirst({
            where: {
                apiKey: this.encryptionService.encrypt(apiKey)
            }
        });
        return {
            ...project,
            apiKey: this.encryptionService.decrypt(project.apiKey),
        };
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UsersService,
        prisma_service_1.PrismaService,
        encription_service_1.EncryptionService])
], ProjectService);
//# sourceMappingURL=project.service.js.map
import { User } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { CreateUserDto } from '../dto/user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOrCreateUser(data: CreateUserDto): Promise<User>;
    getUserByEmail(email: string): Promise<User | null>;
    getUsers(): Promise<User[]>;
}

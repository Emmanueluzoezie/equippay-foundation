import { IsString, IsOptional, IsEmail, IsBoolean, IsObject, IsPhoneNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVendorDto {
    @IsOptional()
    @IsString()
    fullName?: string;

    @IsString()
    shopName: string;

    @IsString()
    description: string;

    @IsString()
    wallet: string;

    @IsString()
    location: string;

    @IsOptional()
    @IsPhoneNumber()
    phoneNumber?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsBoolean()
    status: boolean;

    @IsString()
    businessType: string;

    @IsOptional()
    @IsObject()
    @Type(() => Object)
    socialMedia?: Record<string, string>;

    @IsOptional()
    @IsObject()
    @Type(() => Object)
    operatingHours?: Record<string, string>;
}
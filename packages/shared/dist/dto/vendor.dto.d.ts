export declare class CreateVendorDto {
    fullName?: string;
    shopName: string;
    description: string;
    wallet: string;
    location: string;
    phoneNumber?: string;
    email?: string;
    status: boolean;
    businessType: string;
    socialMedia?: Record<string, string>;
    operatingHours?: Record<string, string>;
}

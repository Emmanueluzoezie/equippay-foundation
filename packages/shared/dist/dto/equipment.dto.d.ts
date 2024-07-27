export declare class CreateEquipmentDto {
    equipmentName: string;
    description: string;
    sku?: string;
    category?: string;
    brand?: string;
    oneOffPrice: number;
    installmentPrice?: number;
    numberOfInstallments?: number;
    currency: string;
    stockQuantity: number;
    isActive: boolean;
    images: string[];
    weight?: number;
    dimensions?: string;
    vendorId: string;
    insuranceId?: string;
}

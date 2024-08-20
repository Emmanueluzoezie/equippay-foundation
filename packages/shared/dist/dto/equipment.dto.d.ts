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
    assetPubkey: string;
    uri: string;
    transaction: string;
    stockQuantity: number;
    isActive: boolean;
    images: string[];
    weight?: number;
    dimensions?: string;
    vendorId: string;
    insuranceId?: string;
}
export declare class GetEquipmentDto {
    equipmentId: string;
    vendorId: string;
}

import { ApiClient } from './utils/api';
import { VendorService } from './services/Vendor';
import { PaymentService } from './services/Payment';
import { EquipmentService } from './services/Equipment';

export class EquippaySDK {
  public vendor: VendorService;
  public equipment: EquipmentService;
  public payment: PaymentService;

  constructor(baseURL: string, apiKey: string) {
    const apiClient = new ApiClient(baseURL, apiKey);
    this.vendor = new VendorService(apiClient);
    this.equipment = new EquipmentService(apiClient);
    this.payment = new PaymentService(apiClient);
  }
}
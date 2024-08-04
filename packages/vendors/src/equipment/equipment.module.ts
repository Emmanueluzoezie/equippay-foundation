import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { VendorService } from '../vendor/vendor.service';
import { VendorModule } from 'src/vendor/vendor.module';

@Module({
    controllers: [EquipmentController],
    providers: [EquipmentService, VendorService],
    imports: [VendorModule]
})
export class EquipmentModule {}

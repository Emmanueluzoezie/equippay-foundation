import { Module } from '@nestjs/common';
import { PrismaService, SharedModule } from 'shared';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { EquipmentService } from './equipment/equipment.service';
import { VendorService } from './vendor/vendor.service';
import { VendorModule } from './vendor/vendor.module';
import { EquipmentModule } from './equipment/equipment.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    SharedModule,
    VendorModule,
    EquipmentModule,
    PaymentsModule,
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../../database/.env'),
    }),
  ],
  providers: [PrismaService, EquipmentService, VendorService],
})
export class AppModule {}
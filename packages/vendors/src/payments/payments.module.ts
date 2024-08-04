import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { SolanaPayService } from 'shared';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, SolanaPayService]
})
export class PaymentsModule {}

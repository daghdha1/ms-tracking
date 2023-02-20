import { Module } from '@nestjs/common';
import { CarrierSyncTrackingService } from './application/service/CarrierSyncTracking.service';
import { DhlHookService } from './application/service/DhlHook.service';
import { GlsHookService } from './application/service/GlsHook.service';
import { CarrierSyncRepository } from './domain/repository/CarrierSync.repository';
import { TrackingCarrierHookController } from './infrastructure/controller/TrackingCarrierHook.controller';
import { CarrierSyncHttpRepository } from './infrastructure/persistence/http/repository/CarrierSyncHttp.repository';

@Module({
  imports: [],
  controllers: [TrackingCarrierHookController],
  providers: [
    CarrierSyncTrackingService,
    DhlHookService,
    GlsHookService,
    {
      provide: CarrierSyncRepository,
      useClass: CarrierSyncHttpRepository,
    },
  ],
  exports: [CarrierSyncTrackingService],
})
export class CarrierModule {}

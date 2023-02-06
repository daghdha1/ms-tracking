import { Module } from '@nestjs/common';
import { DhlHookService } from './application/carrier/dhl/service/DhlHook.service';
import { GlsHookService } from './application/carrier/gls/service/GlsHook.service';
import { CreateTrackingService } from './application/customer/service/CreateTracking.service';
import { CarrierRepository } from './domain/repository/Carrier.repository';
import { CarrierHookController } from './infrastructure/controller/CarrierHook.controller';
import { TrackingController } from './infrastructure/controller/Tracking.controller';
import { CarrierMongoRepository } from './infrastructure/persistence/database/mongo/repository/CarrierMongo.repository';

@Module({
  imports: [],
  controllers: [CarrierHookController, TrackingController],
  providers: [
    CreateTrackingService,
    GlsHookService,
    DhlHookService,
    {
      provide: CarrierRepository,
      useClass: CarrierMongoRepository,
    },
  ],
  exports: [],
})
export class CoreModule {}

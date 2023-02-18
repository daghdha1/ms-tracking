import { Module } from '@nestjs/common';
import { DhlHookService } from './application/dhl/service/DhlHook.service';
import { GlsHookService } from './application/gls/service/GlsHook.service';
import { CarrierRepository } from './domain/repository/Carrier.repository';
import { TrackingCarrierHookController } from './infrastructure/controller/TrackingCarrierHook.controller';
import { CarrierMongoRepository } from './infrastructure/persistence/database/mongo/repository/CarrierMongo.repository';

@Module({
  imports: [],
  controllers: [TrackingCarrierHookController],
  providers: [
    DhlHookService,
    GlsHookService,
    {
      provide: CarrierRepository,
      useClass: CarrierMongoRepository,
    },
  ],
  exports: [],
})
export class CarrierModule {}

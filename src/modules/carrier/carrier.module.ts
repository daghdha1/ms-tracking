import { Module } from '@nestjs/common';
import { CarrierApiSyncTrackingService } from './application/service/CarrierApiSyncTracking.service';
import { CarrierDbRepository } from './domain/repository/CarrierDb.repository';
import { CarrierApiRepository } from './domain/repository/CarrierApi.repository';
import { TrackingCarrierEventController } from './infrastructure/controller/TrackingCarrierEvent.controller';
import { CarrierDbMongoRepository } from './infrastructure/persistence/database/mongo/repository/CarrierDbMongo.repository';
import { CarrierApiHttpRepository } from './infrastructure/persistence/http/repository/CarrierApiHttp.repository';
import { CarrierDhlTrackingEventService } from './application/service/CarrierDhlTrackingEvent.service';
import { CarrierGlsTrackingEventService } from './application/service/CarrierGlsTrackingEvent.service';

@Module({
  imports: [],
  controllers: [TrackingCarrierEventController],
  providers: [
    CarrierApiSyncTrackingService,
    CarrierDhlTrackingEventService,
    CarrierGlsTrackingEventService,
    {
      provide: CarrierDbRepository,
      useClass: CarrierDbMongoRepository,
    },
    {
      provide: CarrierApiRepository,
      useClass: CarrierApiHttpRepository,
    },
  ],
  exports: [CarrierApiSyncTrackingService],
})
export class CarrierModule {}

import { Module } from '@nestjs/common';
import { CarrierDbRepository } from './domain/repository/CarrierDb.repository';
import { CarrierApiRepository } from './domain/repository/CarrierApi.repository';
import { TrackingCarrierEventController } from './infrastructure/controller/TrackingCarrierEvent.controller';
import { CarrierDbMongoRepository } from './infrastructure/persistence/database/mongo/repository/CarrierDbMongo.repository';
import { CarrierApiHttpRepository } from './infrastructure/persistence/http/repository/CarrierApiHttp.repository';
import { CarrierDhlTrackingEventService } from './application/service/CarrierDhlTrackingEvent.service';
import { CarrierGlsTrackingEventService } from './application/service/CarrierGlsTrackingEvent.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Provider } from 'pkg-shared';
import { CarrierApiSyncTrackingService } from './application/service/CarrierApiSyncTracking.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Provider.Kafka,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BROKERS],
            logLevel: Number(process.env.KAFKA_LOG_LEVEL),
          },
        },
      },
    ]),
  ],
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

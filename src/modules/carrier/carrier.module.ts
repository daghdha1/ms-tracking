import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { CarrierDbRepository } from './domain/repository/CarrierDb.repository';
import { CarrierApiRepository } from './domain/repository/CarrierApi.repository';
import { TrackingCarrierEventController } from './infrastructure/controller/TrackingCarrierEvent.controller';
import { CarrierDbMongoRepository } from './infrastructure/persistence/database/mongo/repository/CarrierDbMongo.repository';
import { CarrierApiHttpRepository } from './infrastructure/persistence/http/repository/CarrierApiHttp.repository';
import { CarrierDhlTrackingEventService } from './application/service/CarrierDhlTrackingEvent.service';
import { CarrierGlsTrackingEventService } from './application/service/CarrierGlsTrackingEvent.service';
import { convertEnvToBoolean, KafkaModule, Provider } from 'pkg-shared';
import { CarrierApiSyncTrackingService } from './application/service/CarrierApiSyncTracking.service';
import { ClientKafka } from '@nestjs/microservices';

@Module({
  imports: [KafkaModule],
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
export class CarrierModule implements OnApplicationBootstrap {
  constructor(
    @Inject(Provider.KafkaProducer) private readonly kafkaClient: ClientKafka,
  ) {}

  async onApplicationBootstrap() {
    if (convertEnvToBoolean(process.env.KAFKA_ACTIVE)) {
      console.log(
        '\x1b[33m%s\x1b[0m',
        `${Provider.KafkaProducer} client is connecting`,
      );
      await this.kafkaClient.connect();
      console.log(
        '\x1b[32m%s\x1b[0m',
        `${Provider.KafkaProducer} client connected`,
      );
    }
  }
}

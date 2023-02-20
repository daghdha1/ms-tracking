import { CarrierModule } from '@Carrier/carrier.module';
import { Module } from '@nestjs/common';
import { CreateTrackingService } from './application/service/CreateTracking.service';
import { CoreConfigRepository } from './domain/repository/CoreConfig.repository';
import { CoreTrackingRepository } from './domain/repository/CoreTracking.repository';
import { TrackingController } from './infrastructure/controller/Tracking.controller';
import { CoreMongoRepository } from './infrastructure/persistence/database/mongo/repository/CoreMongo.repository';
import { CoreMysqlRepository } from './infrastructure/persistence/database/mysql/repository/CoreMysql.repository';

@Module({
  imports: [CarrierModule],
  controllers: [TrackingController],
  providers: [
    CreateTrackingService,
    {
      provide: CoreConfigRepository,
      useClass: CoreMysqlRepository,
    },
    {
      provide: CoreTrackingRepository,
      useClass: CoreMongoRepository,
    },
  ],
  exports: [],
})
export class CoreModule {}

import { CarrierModule } from '@Carrier/carrier.module';
import { Module } from '@nestjs/common';
import { CreateTrackingService } from './application/service/CreateTracking.service';
import { CoreDbConfigRepository } from './domain/repository/CoreDbConfig.repository';
import { CoreDbTrackingRepository } from './domain/repository/CoreDbTracking.repository';
import { TrackingCoreController } from './infrastructure/controller/TrackingCore.controller';
import { CoreDbMongoRepository } from './infrastructure/persistence/database/mongo/repository/CoreDbMongo.repository';
import { CoreDbMysqlRepository } from './infrastructure/persistence/database/mysql/repository/CoreDbMysql.repository';

@Module({
  imports: [CarrierModule],
  controllers: [TrackingCoreController],
  providers: [
    CreateTrackingService,
    {
      provide: CoreDbConfigRepository,
      useClass: CoreDbMysqlRepository,
    },
    {
      provide: CoreDbTrackingRepository,
      useClass: CoreDbMongoRepository,
    },
  ],
  exports: [],
})
export class CoreModule {}

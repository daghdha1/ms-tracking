import { Module } from '@nestjs/common';
import { CreateTrackingService } from './application/service/CreateTracking.service';
import { CoreRepository } from './domain/repository/Core.repository';
import { TrackingController } from './infrastructure/controller/Tracking.controller';
import { CoreMongoRepository } from './infrastructure/persistence/database/mongo/repository/CoreMongo.repository';

@Module({
  imports: [],
  controllers: [TrackingController],
  providers: [
    CreateTrackingService,
    {
      provide: CoreRepository,
      useClass: CoreMongoRepository,
    },
  ],
  exports: [],
})
export class CoreModule {}

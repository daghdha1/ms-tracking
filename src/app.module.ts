import { TrackingService } from '@application/services/Tracking.service';
import { TrackingController } from '@infrastructure/controller/Tracking.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TrackingController],
  providers: [TrackingService],
})
export class AppModule {}

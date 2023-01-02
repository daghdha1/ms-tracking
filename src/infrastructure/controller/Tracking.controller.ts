import { TrackingService } from '@application/services/Tracking.service';
import { Controller, Post } from '@nestjs/common';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post('create')
  public createTracking(): string {
    return this.trackingService.createTracking();
  }
}

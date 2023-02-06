import { CreateTrackingDto } from '@Core/application/customer/dto/CreateTracking.dto';
import { CreateTrackingService } from '@Core/application/customer/service/CreateTracking.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly createTrackingService: CreateTrackingService) {}

  @Post('create')
  public createTracking(@Body() dto: CreateTrackingDto): boolean {
    return this.createTrackingService.run(dto);
  }
}

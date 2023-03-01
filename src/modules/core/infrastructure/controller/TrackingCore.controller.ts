import { CreateTrackingDto } from '@Core/application/dto/CreateTracking.dto';
import { CreateTrackingService } from '@Core/application/service/CreateTracking.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BaseHttpResponse } from 'pkg-shared';

@Controller('tracking')
export class TrackingCoreController extends BaseHttpResponse {
  constructor(private readonly createTrackingService: CreateTrackingService) {
    super();
  }

  //TODO: @UseGuards()
  @Post('create')
  public async createTracking(@Body() dto: CreateTrackingDto): Promise<any> {
    const response = this.createTrackingService.run(dto);
    return this.success(response);
  }
}

import { CoreCreateTrackingDto } from '@Core/application/dto/CoreCreateTracking.dto';
import { CoreCreateTrackingService } from '@Core/application/service/CoreCreateTracking.service';
import { Body, Controller, Post } from '@nestjs/common';
import { BaseHttpResponse } from 'pkg-shared';

@Controller('core')
export class CoreTrackingController extends BaseHttpResponse {
  constructor(private readonly createTrackService: CoreCreateTrackingService) {
    super();
  }

  //TODO: @UseGuards()
  @Post('create')
  public async createTracking(
    @Body() dto: CoreCreateTrackingDto,
  ): Promise<any> {
    const response = this.createTrackService.run(dto);
    return this.success(response);
  }
}

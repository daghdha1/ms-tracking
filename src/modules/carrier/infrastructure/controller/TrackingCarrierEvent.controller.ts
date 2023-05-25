import { DhlTrackingEventDto } from '@Carrier/application/dto/DhlTrackingEvent.dto';
import { GlsTrackingEventDto } from '@Carrier/application/dto/GlsTrackingEvent.dto';
import { CarrierDhlTrackingEventService } from '@Carrier/application/service/CarrierDhlTrackingEvent.service';
import { CarrierGlsTrackingEventService } from '@Carrier/application/service/CarrierGlsTrackingEvent.service';
import { Body, Controller, Post } from '@nestjs/common';
import { BaseHttpResponse } from 'pkg-shared';

@Controller('carrier/webhook')
export class TrackingCarrierEventController extends BaseHttpResponse {
  constructor(
    private readonly glsTrackingEventService: CarrierGlsTrackingEventService,
    private readonly dhlTrackingEventService: CarrierDhlTrackingEventService,
  ) {
    super();
  }

  @Post('dhl')
  public async dhlTrackingEvent(
    @Body() dto: DhlTrackingEventDto,
  ): Promise<any> {
    const response: boolean = await this.dhlTrackingEventService.run(dto);
    return this.success(response);
  }

  @Post('gls')
  public async glsTrackingEvent(
    @Body() dto: GlsTrackingEventDto,
  ): Promise<any> {
    const response: boolean = await this.glsTrackingEventService.run(dto);
    return this.success(response);
  }
}

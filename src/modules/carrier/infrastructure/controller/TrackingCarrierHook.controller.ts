import { DhlHookDto } from '@Carrier/application/dhl/dto/DhlHook.dto';
import { DhlHookService } from '@Carrier/application/dhl/service/DhlHook.service';
import { GlsHookDto } from '@Carrier/application/gls/dto/GlsHook.dto';
import { GlsHookService } from '@Carrier/application/gls/service/GlsHook.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('tracking/carrier/hook')
export class TrackingCarrierHookController {
  constructor(
    private readonly glsHookService: GlsHookService,
    private readonly dhlHookService: DhlHookService,
  ) {}

  @Post('dhl')
  public dhlHook(@Body() dto: DhlHookDto): boolean {
    return this.dhlHookService.run(dto);
  }

  @Post('gls')
  public glsHook(@Body() dto: GlsHookDto): boolean {
    return this.glsHookService.run(dto);
  }
}

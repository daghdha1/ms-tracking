import { DhlHookDto } from '@Carrier/application/dto/DhlHook.dto';
import { GlsHookDto } from '@Carrier/application/dto/GlsHook.dto';
import { DhlHookService } from '@Carrier/application/service/DhlHook.service';
import { GlsHookService } from '@Carrier/application/service/GlsHook.service';
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

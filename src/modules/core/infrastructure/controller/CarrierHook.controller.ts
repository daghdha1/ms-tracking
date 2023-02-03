import { DhlHookDto } from '@Core/application/carrier/dhl/dto/DhlHook.dto';
import { DhlHookService } from '@Core/application/carrier/dhl/service/DhlHook.service';
import { GlsHookDto } from '@Core/application/carrier/gls/dto/GlsHook.dto';
import { GlsHookService } from '@Core/application/carrier/gls/service/GlsHook.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('carrier/hook')
export class CarrierHookController {
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

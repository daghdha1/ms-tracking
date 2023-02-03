import { DhlHookDto } from '@Core/application/carrier/dto/DhlHook.dto';
import { GlsHookDto } from '@Core/application/carrier/dto/GlsHook.dto';
import { DhlHookService } from '@Core/application/carrier/service/DhlHook.service';
import { GlsHookService } from '@Core/application/carrier/service/GlsHook.service';
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

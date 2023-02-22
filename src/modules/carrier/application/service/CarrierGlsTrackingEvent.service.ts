import { Injectable } from '@nestjs/common';
import { GlsTrackingEventDto } from '../dto/GlsTrackingEvent.dto';

@Injectable()
export class CarrierGlsTrackingEventService {
  public run(dto: GlsTrackingEventDto): boolean {
    // get data
    return true;
  }
}

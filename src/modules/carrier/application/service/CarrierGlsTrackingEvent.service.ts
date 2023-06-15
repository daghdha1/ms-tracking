import { Injectable } from '@nestjs/common'
import { GlsTrackingEventDto } from '../dto/GlsTrackingEvent.dto'

@Injectable()
export class CarrierGlsTrackingEventService {
  public async run(dto: GlsTrackingEventDto): Promise<boolean> {
    console.log(dto)
    // get data
    return true
  }
}

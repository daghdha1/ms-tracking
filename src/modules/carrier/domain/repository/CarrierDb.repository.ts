import { GlsTrackingEventDto } from '@Carrier/application/dto/GlsTrackingEvent.dto'
import { DhlTrackingEvent } from '../entity/DhlTrackingEvent.entity'

export abstract class CarrierDbRepository {
  public abstract saveDhlTrackingEvent(event: DhlTrackingEvent): Promise<boolean>
  public abstract saveGlsTrackingEvent(tracking: GlsTrackingEventDto): Promise<boolean>
}

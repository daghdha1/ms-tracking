import { partialAssign } from 'pkg-shared'
import { CarrierGlsTrackingEventType } from '../types/CarrierGlsTrackingEvent.type'

export class GlsTrackingEvent {
  public event: string
  public eventId: string
  public timestamp: string
  public courier: string
  public trackingNumber: string
  public language: string
  public trackingLink: string

  public static create(data: CarrierGlsTrackingEventType): GlsTrackingEvent {
    return partialAssign(new this(), {
      event: data.event,
      eventId: data.event_id,
      timestamp: data.timestamp,
      courier: data.courier,
      trackingNumber: data.tracking_number,
      language: data.language,
      trackingLink: data.tracking_link
    })
  }
}

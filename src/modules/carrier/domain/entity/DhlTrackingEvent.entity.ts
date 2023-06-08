import { partialAssign } from 'pkg-shared'
import { CarrierDhlTrackingEventType } from '../types/CarrierDhlTrackingEvent.type'

export class DhlTrackingEvent {
  public event: string
  public eventId: string
  public timestamp: string
  public courier: string
  public trackingNumber: string
  public language: string
  public trackingLink: string

  public static create(data: CarrierDhlTrackingEventType): DhlTrackingEvent {
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

import { partialAssign } from 'pkg-shared'
import { CarrierSyncGlsTrackingType } from '../types/CarrierSyncGlsTracking.type'

export class GlsTracking {
  public tracking_number: string
  public service: string

  public static create(data: CarrierSyncGlsTrackingType): GlsTracking {
    return partialAssign(new this(), {
      tracking_number: data.trackingNumber,
      service: data.service
    })
  }
}

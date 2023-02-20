import { partialAssign } from 'pkg-shared';
import { CarrierSyncDhlTrackingType } from '../types/CarrierSyncDhlTracking.type';

export class DhlTracking {
  public tracking_number: string;
  public service: string;

  public static create(data: CarrierSyncDhlTrackingType): DhlTracking {
    return partialAssign(new this(), {
      tracking_number: data.tracking_number,
      service: data.service,
    });
  }
}

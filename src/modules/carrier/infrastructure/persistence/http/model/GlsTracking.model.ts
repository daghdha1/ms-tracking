import { GlsTracking } from '@Carrier/domain/entity/GlsTracking.entity';
import { partialAssign } from 'pkg-shared';

export class GlsTrackingModel {
  public tracking_number: string;
  public service: string;

  public static fromEntity(entity: GlsTracking): GlsTrackingModel {
    return partialAssign(new GlsTrackingModel(), {
      tracking_number: entity.tracking_number,
      service: entity.service,
    });
  }
}

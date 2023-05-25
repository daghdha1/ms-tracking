import { Tracking } from '@Core/domain/entity/Tracking.entity';
import { CoreDbTrackingRepository } from '@Core/domain/repository/CoreDbTracking.repository';
import { ICoreGetTracking } from '@Core/infrastructure/interface/CoreGetTracking.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreGetTrackingService implements ICoreGetTracking {
  constructor(private readonly dbTrackRepo: CoreDbTrackingRepository) {}

  public async run(trackingNumber: string): Promise<Tracking> {
    const tracking: Tracking = await this.dbTrackRepo.getTracking(
      trackingNumber,
    );
    return tracking;
  }
}

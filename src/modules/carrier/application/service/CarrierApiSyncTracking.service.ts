import { DhlTracking } from '@Carrier/domain/entity/DhlTracking.entity';
import { GlsTracking } from '@Carrier/domain/entity/GlsTracking.entity';
import { CarrierApiRepository } from '@Carrier/domain/repository/CarrierApi.repository';
import { Injectable } from '@nestjs/common';
import { CarrierApiSyncTrackingDto } from '../dto/CarrierApiSyncTracking.dto';
import { ICarrierApiSyncTracking } from '@Carrier/infrastructure/interface/CarrierApiSyncTracking.interface';

@Injectable()
export class CarrierApiSyncTrackingService implements ICarrierApiSyncTracking {
  constructor(private readonly apiRepo: CarrierApiRepository) {}

  public async run(dto: CarrierApiSyncTrackingDto): Promise<boolean> {
    let track: DhlTracking | GlsTracking;
    let synced: boolean | PromiseLike<boolean>;
    switch (dto.courier) {
      case 'DHL':
        track = DhlTracking.create(dto);
        synced = await this.apiRepo.syncDhlTracking(track);
        break;
      case 'GLS':
        track = GlsTracking.create(dto);
        synced = await this.apiRepo.syncGlsTracking(track);
        break;
    }
    return synced;
  }
}

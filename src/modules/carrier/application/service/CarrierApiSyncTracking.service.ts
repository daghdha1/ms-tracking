import { DhlTracking } from '@Carrier/domain/entity/DhlTracking.entity';
import { GlsTracking } from '@Carrier/domain/entity/GlsTracking.entity';
import { CarrierApiRepository } from '@Carrier/domain/repository/CarrierApi.repository';
import { Injectable } from '@nestjs/common';
import { CarrierSyncTrackingDto } from '../dto/CarrierSyncTracking.dto';

@Injectable()
export class CarrierApiSyncTrackingService {
  constructor(private readonly apiRepo: CarrierApiRepository) {}

  public async run(dto: CarrierSyncTrackingDto): Promise<boolean> {
    let track: DhlTracking | GlsTracking;
    let statusSync: boolean | PromiseLike<boolean>;
    switch (dto.courier) {
      case 'DHL':
        track = DhlTracking.create(dto);
        //break; //to debug the app flux
        statusSync = await this.apiRepo.syncDhlTracking(track);
        break;
      case 'GLS':
        track = GlsTracking.create(dto);
        statusSync = await this.apiRepo.syncGlsTracking(track);
        break;
    }
    return statusSync;
  }
}

import { DhlTracking } from '@Carrier/domain/entity/DhlTracking';
import { GlsTracking } from '@Carrier/domain/entity/GlsTracking';
import { CarrierException } from '@Carrier/domain/exception/Carrier.exception';
import { CarrierSyncRepository } from '@Carrier/domain/repository/CarrierSync.repository';
import { Injectable } from '@nestjs/common';
import { CarrierSyncTrackingDto } from '../dto/CarrierSyncTracking.dto';

@Injectable()
export class CarrierSyncTrackingService {
  constructor(private readonly syncRepo: CarrierSyncRepository) {}

  public async run(dto: CarrierSyncTrackingDto): Promise<boolean> {
    console.log('CarrierModule: ' + dto.courier);
    let track: DhlTracking | GlsTracking = null;
    switch (dto.courier) {
      case 'DHL':
        // Convert to entity
        track = DhlTracking.create(dto);
        await this.syncRepo.syncDhlTracking(track);
        console.log(track);
        // Call dhl repository
        break;
      case 'GLS':
        // Convert to entity
        track = GlsTracking.create(dto);
        console.log(track);
        // Call gls repository
        break;
      default:
        throw new CarrierException('Invalid Request', null, null, 400);
    }
    return true;
  }
}

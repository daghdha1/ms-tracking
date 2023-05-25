import { CarrierApiSyncTrackingDto } from '@Carrier/application/dto/CarrierApiSyncTracking.dto';

export const API_SYNC_TRACKING = 'API_SYNC_TRACKING';

export interface ICarrierApiSyncTracking {
  run(dto: CarrierApiSyncTrackingDto): Promise<boolean>;
}

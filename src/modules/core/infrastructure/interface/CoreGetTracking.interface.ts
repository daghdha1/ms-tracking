import { Tracking } from '@Core/domain/entity/Tracking.entity'

export const GET_TRACKING = 'GET_TRACKING'

export interface ICoreGetTracking {
  run(trackingNumber: string): Promise<Tracking>
}

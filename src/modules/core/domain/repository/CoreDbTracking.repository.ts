import { Tracking } from '../entity/Tracking.entity'

export abstract class CoreDbTrackingRepository {
  public abstract saveTracking(tracking: Tracking): Promise<boolean>
  public abstract getTracking(trackingNumber: string): Promise<Tracking>
}

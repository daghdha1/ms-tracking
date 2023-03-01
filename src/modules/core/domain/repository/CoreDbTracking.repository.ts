import { Tracking } from '../entity/Tracking.entity';

export abstract class CoreDbTrackingRepository {
  public abstract saveTracking(tracking: Tracking): Promise<boolean>;
}

import { Tracking } from '../entity/Tracking.entity';

export abstract class CoreTrackingRepository {
  public abstract saveTracking(tracking: Tracking): Promise<boolean>;
}

export abstract class CoreTrackingRepository {
  public abstract saveTracking(key: string): Promise<boolean>;
}

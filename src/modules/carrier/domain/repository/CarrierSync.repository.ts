import { DhlTracking } from '../entity/DhlTracking';
import { GlsTracking } from '../entity/GlsTracking';

export abstract class CarrierSyncRepository {
  public abstract syncDhlTracking(tracking: DhlTracking): Promise<boolean>;
  public abstract syncGlsTracking(tracking: GlsTracking): Promise<boolean>;
}

import { DhlTracking } from '../entity/DhlTracking.entity';
import { GlsTracking } from '../entity/GlsTracking.entity';

export abstract class CarrierApiRepository {
  public abstract syncDhlTracking(tracking: DhlTracking): Promise<boolean>;
  public abstract syncGlsTracking(tracking: GlsTracking): Promise<boolean>;
}

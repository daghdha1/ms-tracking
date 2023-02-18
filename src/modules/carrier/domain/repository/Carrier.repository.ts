import { DhlTracking } from '../entity/DhlTracking';
import { GlsTracking } from '../entity/GlsTracking';

export abstract class CarrierRepository {
  public abstract createDhlTracking(tracking: DhlTracking): Promise<boolean>;
  public abstract createGlsTracking(tracking: GlsTracking): Promise<boolean>;
}

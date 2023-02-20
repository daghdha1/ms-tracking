import { Inject } from '@nestjs/common';
import { MongoRepository } from 'pkg-shared';
import { MYSQL } from 'app.constants';
import { CarrierSyncRepository } from '@Carrier/domain/repository/CarrierSync.repository';
import { DhlTracking } from '@Carrier/domain/entity/DhlTracking';
import { GlsTracking } from '@Carrier/domain/entity/GlsTracking';

export class CarrierMongoRepository
  extends MongoRepository
  implements CarrierSyncRepository
{
  constructor(
    @Inject(MYSQL)
    protected pool: any,
  ) {
    super(pool, { debug: false });
  }
  public syncDhlTracking(tracking: DhlTracking): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  public syncGlsTracking(tracking: GlsTracking): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

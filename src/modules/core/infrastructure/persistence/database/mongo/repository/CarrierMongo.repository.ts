import { DhlTracking } from '@Core/domain/entity/DhlTracking';
import { GlsTracking } from '@Core/domain/entity/GlsTracking';
import { CarrierRepository } from '@Core/domain/repository/Carrier.repository';
import { MongoRepository } from '@daghdha1/shared';
import { Inject } from '@nestjs/common';
import { AppConstants } from 'app.constants';

export class CarrierMongoRepository
  extends MongoRepository
  implements CarrierRepository
{
  constructor(
    @Inject(AppConstants.MYSQL_POOL)
    protected pool: any,
  ) {
    super(pool, { debug: false });
  }

  public createDhlTracking(tracking: DhlTracking): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public createGlsTracking(tracking: GlsTracking): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

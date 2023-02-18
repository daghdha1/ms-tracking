import { DhlTracking } from '@Core/domain/entity/DhlTracking';
import { GlsTracking } from '@Core/domain/entity/GlsTracking';
import { Inject } from '@nestjs/common';
import { MongoRepository } from 'pkg-shared';
import { MYSQL } from 'app.constants';
import { CarrierRepository } from '@Carrier/domain/repository/Carrier.repository';

export class CarrierMongoRepository
  extends MongoRepository
  implements CarrierRepository
{
  constructor(
    @Inject(MYSQL)
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

import { DhlTracking } from '@Carrier/domain/entity/DhlTracking';
import { GlsTracking } from '@Carrier/domain/entity/GlsTracking';
import { CarrierSyncRepository } from '@Carrier/domain/repository/CarrierSync.repository';
import { Inject } from '@nestjs/common';
import { MYSQL } from 'app.constants';
import { MysqlRepository } from 'pkg-shared';
import { Pool } from 'mysql2/promise';

export class CarrierMysqlRepository
  extends MysqlRepository
  implements CarrierSyncRepository
{
  constructor(
    @Inject(MYSQL)
    protected pool: Pool,
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

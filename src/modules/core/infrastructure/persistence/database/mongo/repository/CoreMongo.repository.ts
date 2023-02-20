import { Inject } from '@nestjs/common';
import { MongoRepository } from 'pkg-shared';
import { MONGO } from 'app.constants';
import { CoreTrackingRepository } from '@Core/domain/repository/CoreTracking.repository';

export class CoreMongoRepository
  extends MongoRepository
  implements CoreTrackingRepository
{
  constructor(
    @Inject(MONGO)
    protected pool: any,
  ) {
    super(pool, { debug: false });
  }
  public saveTracking(key: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

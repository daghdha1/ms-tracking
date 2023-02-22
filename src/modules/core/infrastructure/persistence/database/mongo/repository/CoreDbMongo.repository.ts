import { Inject } from '@nestjs/common';
import { MongoRepository } from 'pkg-shared';
import { MongoClient } from 'mongodb';
import { MONGO } from 'app.constants';
import { Tracking } from '@Core/domain/entity/Tracking.entity';
import { CoreException } from '@Core/domain/exception/Core.exception';
import { CoreConstants } from '@Core/core.constants';
import { CoreDbTrackingRepository } from '@Core/domain/repository/CoreDbTracking.repository';

export class CoreDbMongoRepository
  extends MongoRepository
  implements CoreDbTrackingRepository
{
  constructor(
    @Inject(MONGO)
    protected pool: MongoClient,
  ) {
    super(pool, { debug: false });
  }

  public async saveTracking(tracking: Tracking): Promise<boolean> {
    const db = (await this.pool.connect()).db(
      CoreConstants.MONGO_TRACKING_CORE_DB,
    );
    const cursor = await db
      .collection(CoreConstants.MONGO_TRACKING_CORE_COL)
      .insertOne(tracking);
    if (!cursor.acknowledged)
      throw new CoreException('CoreMongoRepository Error');
    return true;
  }
}

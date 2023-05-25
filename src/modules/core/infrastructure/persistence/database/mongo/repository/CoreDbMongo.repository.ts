import { Inject } from '@nestjs/common';
import { MongoRepository, Provider } from 'pkg-shared';
import { MongoClient } from 'mongodb';
import { Tracking } from '@Core/domain/entity/Tracking.entity';
import { CoreException } from '@Core/domain/exception/Core.exception';
import { CoreConstants } from '@Core/core.constants';
import { CoreDbTrackingRepository } from '@Core/domain/repository/CoreDbTracking.repository';
import { CoreTrackingModel } from '../model/CoreTracking.model';

export class CoreDbMongoRepository
  extends MongoRepository
  implements CoreDbTrackingRepository
{
  constructor(
    @Inject(Provider.Mongo)
    protected pool: MongoClient,
  ) {
    super(pool, { debug: false });
  }

  public async saveTracking(tracking: Tracking): Promise<boolean> {
    const db = (await this.pool.connect()).db(
      CoreConstants.MONGO_TRACKING_CORE_DB,
    );
    const model: CoreTrackingModel = CoreTrackingModel.fromEntity(tracking);
    const result = await db
      .collection(CoreConstants.MONGO_TRACKING_CORE_COL)
      .insertOne(model);
    if (!result.acknowledged)
      throw new CoreException('CoreMongoRepository Error');
    return true;
  }

  public async getTracking(trackingNumber: string): Promise<Tracking> {
    const db = (await this.pool.connect()).db(
      CoreConstants.MONGO_TRACKING_CORE_DB,
    );
    const result = await db
      .collection(CoreConstants.MONGO_TRACKING_CORE_COL)
      .findOne({ trackingNumber });
    if (!result) throw new CoreException('Tracking does not exist');
    const tracking: Tracking = CoreTrackingModel.toEntity(
      result as CoreTrackingModel,
    );
    return tracking;
  }
}

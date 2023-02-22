import { Inject } from '@nestjs/common';
import { MongoRepository } from 'pkg-shared';
import { MONGO } from 'app.constants';
import { MongoClient } from 'mongodb';
import { CoreException } from '@Core/domain/exception/Core.exception';
import { CarrierDbRepository } from '@Carrier/domain/repository/CarrierDb.repository';
import { CarrierConstants } from '@Carrier/carrier.constants';
import { DhlTrackingEvent } from '@Carrier/domain/entity/DhlTrackingEvent.entity';
import { GlsTrackingEvent } from '@Carrier/domain/entity/GlsTrackingEvent.entity';

export class CarrierDbMongoRepository
  extends MongoRepository
  implements CarrierDbRepository
{
  constructor(
    @Inject(MONGO)
    protected pool: MongoClient,
  ) {
    super(pool, { debug: false });
  }

  public async saveDhlTrackingEvent(event: DhlTrackingEvent): Promise<boolean> {
    const db = (await this.pool.connect()).db(
      CarrierConstants.MONGO_TRACKING_CARRIER_DB,
    );
    const cursor = await db
      .collection(CarrierConstants.MONGO_TRACKING_CARRIER_DHL_COL)
      .insertOne(event);
    if (!cursor.acknowledged)
      throw new CoreException('CarrierMongoRepository error');
    return true;
  }

  public async saveGlsTrackingEvent(event: GlsTrackingEvent): Promise<boolean> {
    const db = (await this.pool.connect()).db(
      CarrierConstants.MONGO_TRACKING_CARRIER_DB,
    );
    const cursor = await db
      .collection(CarrierConstants.MONGO_TRACKING_CARRIER_GLS_COL)
      .insertOne(event);
    if (!cursor.acknowledged)
      throw new CoreException('CarrierMongoRepository error');
    return true;
  }
}

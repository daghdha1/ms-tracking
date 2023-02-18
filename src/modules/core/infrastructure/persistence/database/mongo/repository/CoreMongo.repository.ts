import { Inject } from '@nestjs/common';
import { MongoRepository } from 'pkg-shared';
import { MONGO } from 'app.constants';
import { CoreRepository } from '@Core/domain/repository/Core.repository';

export class CoreMongoRepository
  extends MongoRepository
  implements CoreRepository
{
  constructor(
    @Inject(MONGO)
    protected pool: any,
  ) {
    super(pool, { debug: false });
  }
}

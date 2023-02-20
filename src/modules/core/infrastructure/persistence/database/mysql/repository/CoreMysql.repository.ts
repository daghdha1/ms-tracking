import { Inject } from '@nestjs/common';
import { AppConstants, MYSQL } from 'app.constants';
import { MysqlRepository, queryBuilder } from 'pkg-shared';
import { Pool } from 'mysql2/promise';
import { CoreConfigRepository } from '@Core/domain/repository/CoreConfig.repository';

export class CoreMysqlRepository
  extends MysqlRepository
  implements CoreConfigRepository
{
  constructor(
    @Inject(MYSQL)
    protected pool: Pool,
  ) {
    super(pool, { debug: false });
  }

  public async getConfig(key: string): Promise<string[]> {
    const query = queryBuilder
      .table(AppConstants.MYSQL_TRACKING_CONFIG_TABLE)
      .where({ key: key.toUpperCase() })
      .select('value')
      .toString();
    return (await this.selectOne(query)).value;
  }
}

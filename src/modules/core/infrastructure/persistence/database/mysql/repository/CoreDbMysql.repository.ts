import { Inject } from '@nestjs/common'
import { AppConstants } from 'src/app.constants'
import { MysqlRepository, queryBuilder, Provider } from 'pkg-shared'
import { Pool } from 'mysql2/promise'
import { CoreDbConfigRepository } from '@Core/domain/repository/CoreDbConfig.repository'

export class CoreDbMysqlRepository extends MysqlRepository implements CoreDbConfigRepository {
  constructor(
    @Inject(Provider.MySQL)
    protected pool: Pool
  ) {
    super(pool, { debug: false })
  }

  public async getConfig(key: string): Promise<string[]> {
    const query = queryBuilder
      .table(AppConstants.MYSQL_TRACKING_CONFIG_TABLE)
      .where({ key: key.toUpperCase() })
      .select('value')
      .toString()
    return (await this.selectOne(query)).value
  }
}

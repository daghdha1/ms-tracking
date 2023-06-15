import { CarrierModule } from '@Carrier/carrier.module'
import { Module, forwardRef } from '@nestjs/common'
import { CoreDbConfigRepository } from './domain/repository/CoreDbConfig.repository'
import { CoreDbTrackingRepository } from './domain/repository/CoreDbTracking.repository'
import { CoreTrackingController } from './infrastructure/controller/CoreTracking.controller'
import { CoreDbMongoRepository } from './infrastructure/persistence/database/mongo/repository/CoreDbMongo.repository'
import { CoreDbMysqlRepository } from './infrastructure/persistence/database/mysql/repository/CoreDbMysql.repository'
import { CoreCreateTrackingService } from './application/service/CoreCreateTracking.service'
import { CoreGetTrackingService } from './application/service/CoreGetTracking.service'
import { CoreApiHttpRepository } from './infrastructure/persistence/http/repository/CoreApiHttp.repository'

@Module({
  imports: [forwardRef(() => CarrierModule)],
  controllers: [CoreTrackingController],
  providers: [
    CoreCreateTrackingService,
    CoreApiHttpRepository,
    {
      provide: CoreDbConfigRepository,
      useClass: CoreDbMysqlRepository
    },
    {
      provide: CoreDbTrackingRepository,
      useClass: CoreDbMongoRepository
    },
    {
      provide: 'GET_TRACKING',
      useClass: CoreGetTrackingService
    }
  ],
  exports: ['GET_TRACKING']
})
export class CoreModule {}

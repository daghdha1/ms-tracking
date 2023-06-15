import { Tracking } from '@Core/domain/entity/Tracking.entity'
import { CoreException } from '@Core/domain/exception/Core.exception'
import { CoreDbConfigRepository } from '@Core/domain/repository/CoreDbConfig.repository'
import { CoreDbTrackingRepository } from '@Core/domain/repository/CoreDbTracking.repository'
import { CarrierSyncTrackingType } from '@Core/domain/types/CarrierSyncTracking.type'
import { Inject, Injectable } from '@nestjs/common'
import { CoreCreateTrackingDto } from '../dto/CoreCreateTracking.dto'
import { ICarrierApiSyncTracking } from '@Carrier/infrastructure/interface/CarrierApiSyncTracking.interface'

@Injectable()
export class CoreCreateTrackingService {
  constructor(
    @Inject('API_SYNC_TRACKING')
    private readonly apiSyncTrackService: ICarrierApiSyncTracking,
    private readonly dbConfigRepo: CoreDbConfigRepository,
    private readonly dbTrackRepo: CoreDbTrackingRepository
  ) {}

  public async run(dto: CoreCreateTrackingDto): Promise<string> {
    // Check tracking params
    const areValid: boolean = this.areRequiredFieldsValid(dto)
    if (!areValid) throw new CoreException('Invalid Request', null, null, 400)

    // Create domain entity
    const tracking: Tracking = Tracking.create(dto)

    // Check carrier name
    const carrierIncluded = (await this.dbConfigRepo.getConfig('CARRIER')).includes(tracking.courier)
    if (!carrierIncluded) throw new CoreException('Invalid Request', null, null, 400)

    // Send tracking to CarrierModule
    const carrierTrack: CarrierSyncTrackingType = {
      courier: tracking.courier,
      trackingNumber: tracking.trackingNumber,
      service: tracking.service
    }
    const isSynced: boolean = await this.apiSyncTrackService.run(carrierTrack)

    // Save tracking
    if (isSynced) tracking.synced = true
    await this.dbTrackRepo.saveTracking(tracking)
    return 'Tracking has been created'
  }

  private areRequiredFieldsValid(payload: CoreCreateTrackingDto): boolean {
    const requiredFields: string[] = ['courier', 'tracking_number', 'zip_code', 'mobile']

    for (const key in payload) {
      if (requiredFields.includes(key) && payload[key].trim().length === 0) {
        return false
      }
      if (typeof payload[key] === 'string') {
        payload[key] = payload[key]?.trim()
      }
    }
    return true
  }
}

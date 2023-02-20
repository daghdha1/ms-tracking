import { CarrierSyncTrackingService } from '@Carrier/application/service/CarrierSyncTracking.service';
import { CoreException } from '@Core/domain/exception/Core.exception';
import { CoreConfigRepository } from '@Core/domain/repository/CoreConfig.repository';
import { CarrierSyncTrackingType } from '@Core/domain/types/CarrierSyncTracking.type';
import { Injectable } from '@nestjs/common';
import { CreateTrackingDto } from '../dto/CreateTracking.dto';

@Injectable()
export class CreateTrackingService {
  constructor(
    private readonly configRepo: CoreConfigRepository,
    private readonly syncTrackingService: CarrierSyncTrackingService,
  ) {}

  public async run(dto: CreateTrackingDto): Promise<boolean> {
    //console.log(dto);
    const areValid: boolean = await this.areRequiredFieldsValid(dto);
    if (!areValid) throw new CoreException('Invalid Request', null, null, 400);
    this.formatPayload(dto);
    if (!(await this.configRepo.getConfig('CARRIER')).includes(dto.courier))
      throw new CoreException('Invalid Request', null, null, 400);

    // Send tracking to CarrierModule
    const carrierTrack: CarrierSyncTrackingType = {
      courier: dto.courier,
      tracking_number: dto.tracking_number,
      service: dto.service,
    };
    await this.syncTrackingService.run(carrierTrack);

    // Save tracking into mongoDB

    return true;
  }

  private async areRequiredFieldsValid(
    payload: CreateTrackingDto,
  ): Promise<boolean> {
    const requiredFields: string[] = [
      'courier',
      'tracking_number',
      'zip_code',
      'mobile',
    ];

    for (const key in payload) {
      if (requiredFields.includes(key) && payload[key].trim().length === 0) {
        return false;
      }
      if (typeof payload[key] === 'string') {
        payload[key] = payload[key]?.trim();
      }
    }
    return true;
  }

  private formatPayload(payload: CreateTrackingDto) {
    payload['courier'] = payload['courier'].toUpperCase();
    //...
  }

  /* private async syncTrackApi(payload: any): Promise<any> {
    const auth = this.configurationService.get('TRACKING_PARCELLAB_AUTH');
    const { user, token } = auth;
    let uri = 'https://api.parcellab.com/track';

    if (convertEnvToBoolean(process.env.TESTING_MODE)) {
      payload.email = 'test@test.com';
      uri = 'https://mock-api.parcellab.com/track';
    }

    const options = {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        user: user,
        token: token,
      },
    };

    this.showDebugData('url de envio de tracking', uri);
    this.showDebugData('payload para Parcellab', payload);

    try {
      return await fetch(uri, options);
    } catch (error) {
      throw new TrackingParcellabCreateTrackException(
        'Fetch error',
        error,
        0,
        JSON.stringify(payload),
      );
    }
  } */
}

// ##############################
// With destinationCountryIso3 match the ISO 3166 international standard
// es/ES or esp/ESP matches with ES or ESP
// With languageIso3 match the ISO 639-3 standard
// en/EN or eng/ENG matches with EN or ENG

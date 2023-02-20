import { DhlTracking } from '@Carrier/domain/entity/DhlTracking';
import { GlsTracking } from '@Carrier/domain/entity/GlsTracking';
import { CarrierSyncRepository } from '@Carrier/domain/repository/CarrierSync.repository';
import fetch from 'node-fetch';
import { DhlTrackingModel } from '../model/DhlTracking.model';
import { CarrierException } from '@Carrier/domain/exception/Carrier.exception';
import { GlsTrackingModel } from '../model/GlsTracking.model';

export class CarrierSyncHttpRepository implements CarrierSyncRepository {
  public async syncDhlTracking(tracking: DhlTracking): Promise<boolean> {
    const payload: DhlTrackingModel = DhlTrackingModel.fromEntity(tracking);
    const options = {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${process.env.CARRIER_DHL_TOKEN}`,
        contentType: 'application/json',
      },
    };
    const uri =
      `https://api-eu.dhl.com/track/shipments?` +
      new URLSearchParams(
        `trackingNumber=${tracking.tracking_number}&service=${tracking.service}`,
      );
    const response: any = await fetch(uri, options);
    if (!response.OK)
      throw new CarrierException('Internal server error', null, null, 500);
    return true;
  }

  public async syncGlsTracking(tracking: GlsTracking): Promise<boolean> {
    const payload: GlsTrackingModel = GlsTrackingModel.fromEntity(tracking);
    const options = {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${process.env.CARRIER_GLS_TOKEN}`,
        contentType: 'application/json',
      },
    };
    const uri =
      `https://api-eu.gls.com/track/shipments?` +
      new URLSearchParams(
        `trackingNumber=${tracking.tracking_number}&service=${tracking.service}`,
      );
    const response: any = await fetch(uri, options);
    if (!response.OK)
      throw new CarrierException('Internal server error', null, null, 500);
    return true;
  }
}

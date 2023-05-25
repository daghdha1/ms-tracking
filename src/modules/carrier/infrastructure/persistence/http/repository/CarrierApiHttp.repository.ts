import { DhlTracking } from '@Carrier/domain/entity/DhlTracking.entity';
import { GlsTracking } from '@Carrier/domain/entity/GlsTracking.entity';
import { CarrierApiRepository } from '@Carrier/domain/repository/CarrierApi.repository';
import fetch from 'node-fetch';
import { DhlTrackingModel } from '../model/DhlTracking.model';
import { GlsTrackingModel } from '../model/GlsTracking.model';

export class CarrierApiHttpRepository implements CarrierApiRepository {
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
    return true; // fake response from carrier
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
    return true; // fake response from carrier
  }
}

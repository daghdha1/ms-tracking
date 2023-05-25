import { IsString } from 'class-validator';

export class CarrierApiSyncTrackingDto {
  @IsString()
  courier: string;
  @IsString()
  trackingNumber: string;
  @IsString()
  service: string;
}

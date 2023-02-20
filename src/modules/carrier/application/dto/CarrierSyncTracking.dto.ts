import { IsString } from 'class-validator';

export class CarrierSyncTrackingDto {
  @IsString()
  courier: string;
  @IsString()
  trackingNumber: string;
  @IsString()
  service: string;
}

import { IsString } from 'class-validator';

export class CarrierSyncTrackingDto {
  @IsString()
  courier: string;
  @IsString()
  tracking_number: string;
  @IsString()
  service: string;
}

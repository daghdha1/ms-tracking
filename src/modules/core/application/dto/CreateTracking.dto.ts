import { IsArray, IsString } from 'class-validator';

export class CreateTrackingDto {
  @IsString()
  courier: string;
  @IsString()
  tracking_number?: string;
  @IsString()
  service: string;
  @IsString()
  zip_code?: string;
  @IsString()
  orderNo: string;
  @IsArray()
  notification_platform?: string[];
  @IsString()
  recipient_notification?: string;
  @IsString()
  recipient?: string;
  @IsString()
  email?: string;
  @IsString()
  street?: string;
  @IsString()
  city?: string;
  @IsString()
  mobile?: string;
}

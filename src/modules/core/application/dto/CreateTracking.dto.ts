import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateTrackingDto {
  @IsString()
  courier: string;
  @IsString()
  tracking_number: string;
  @IsString()
  service: string;
  @IsString()
  zip_code: string;
  @IsString()
  mobile: string;
  @IsOptional()
  @IsString()
  orderNo?: string;
  @IsOptional()
  @IsArray()
  notification_platform?: string[];
  @IsOptional()
  @IsString()
  recipient_notification?: string;
  @IsOptional()
  @IsString()
  recipient?: string;
  @IsOptional()
  @IsString()
  email?: string;
  @IsOptional()
  @IsString()
  street?: string;
  @IsOptional()
  @IsString()
  city?: string;
}

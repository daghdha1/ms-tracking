import { IsString } from 'class-validator';

export class DhlTrackingEventDto {
  @IsString()
  event: string;
  @IsString()
  event_id: string;
  @IsString()
  timestamp: string;
  @IsString()
  courier: string;
  @IsString()
  tracking_number: string;
  @IsString()
  language: string;
  @IsString()
  tracking_link: string;
}

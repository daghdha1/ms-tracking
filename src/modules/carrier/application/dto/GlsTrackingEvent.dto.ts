import { IsString } from 'class-validator';

export class GlsTrackingEventDto {
  @IsString()
  event: string;
  @IsString()
  eventId: string;
  @IsString()
  timestamp: string;
  @IsString()
  courier: string;
  @IsString()
  trackingNumber: string;
  @IsString()
  language: string;
  @IsString()
  trackingLink: string;
}

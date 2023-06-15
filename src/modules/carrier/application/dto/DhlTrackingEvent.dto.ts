import { IsOptional, IsString } from 'class-validator'

export class DhlTrackingEventDto {
  @IsString()
  event: string
  @IsString()
  event_id: string
  @IsString()
  timestamp: string
  @IsString()
  courier: string
  @IsString()
  tracking_number: string
  @IsOptional()
  language: string
  @IsString()
  tracking_link: string
}

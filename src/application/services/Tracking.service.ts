import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackingService {
  public createTracking(): string {
    return 'Hello';
  }
}

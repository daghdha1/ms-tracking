import { Injectable } from '@nestjs/common';
import { CreateTrackingDto } from '../dto/CreateTracking.dto';

@Injectable()
export class CreateTrackingService {
  public async run(dto: CreateTrackingDto): Promise<boolean> {
    console.log(dto);
    // Check courier string, get the carrier code from map table
    // gls --> GLS
    // check the notification platform
    // [telegram,email] --> [TELEGRAM, EMAIL]
    return true;
  }
}

// ##############################
// With destinationCountryIso3 match the ISO 3166 international standard
// es/ES or esp/ESP matches with ES or ESP
// With languageIso3 match the ISO 639-3 standard
// en/EN or eng/ENG matches with EN or ENG

import { DhlTrackingEvent } from '@Carrier/domain/entity/DhlTrackingEvent.entity';
import { CarrierDbRepository } from '@Carrier/domain/repository/CarrierDb.repository';
import { Injectable } from '@nestjs/common';
import { DhlTrackingEventDto } from '../dto/DhlTrackingEvent.dto';

@Injectable()
export class CarrierDhlTrackingEventService {
  constructor(private readonly carrierRepo: CarrierDbRepository) {}
  public async run(dto: DhlTrackingEventDto): Promise<boolean> {
    const dhlTrackingEvent: DhlTrackingEvent = DhlTrackingEvent.create(dto);
    console.log(dhlTrackingEvent);
    // save data mongodb in dhlTrackingEvents
    const isSaved: boolean = await this.carrierRepo.saveDhlTrackingEvent(
      dhlTrackingEvent,
    );
    // TODO: send data to notification MS via kafka
    return true;
  }
}

import { CarrierDbRepository } from '@Carrier/domain/repository/CarrierDb.repository';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { partialAssign, Provider, TrackCreatedEvent } from 'pkg-shared';
import { DhlTrackingEventDto } from '../dto/DhlTrackingEvent.dto';

@Injectable()
export class CarrierDhlTrackingEventService {
  constructor(
    @Inject(Provider.Kafka) private readonly clientKafka: ClientKafka,
    private readonly carrierRepo: CarrierDbRepository,
  ) {}
  public async run(dto: DhlTrackingEventDto): Promise<boolean> {
    const dhlTrackingEvent: TrackCreatedEvent = this.createPayloadEvent(dto);
    // TODO: send data to notification MS via kafka
    this.clientKafka.emit(
      'tracking.carrier.event',
      JSON.stringify(dhlTrackingEvent),
    );

    // save data mongodb in dhlTrackingEvents
    /* const isSaved: boolean = await this.carrierRepo.saveDhlTrackingEvent(
      dhlTrackingEvent,
    ); */

    return true;
  }

  private createPayloadEvent(dto: DhlTrackingEventDto): TrackCreatedEvent {
    return partialAssign(new TrackCreatedEvent(), {
      event: dto.event,
      eventId: dto.event_id,
      timestamp: dto.timestamp,
      courier: dto.courier,
      trackingNumber: dto.tracking_number,
      language: dto.language,
      trackingLink: dto.tracking_link,
    });
  }
}

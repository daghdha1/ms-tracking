import { CarrierDbRepository } from '@Carrier/domain/repository/CarrierDb.repository';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { partialAssign, Provider, TrackCreatedEvent } from 'pkg-shared';
import { DhlTrackingEventDto } from '../dto/DhlTrackingEvent.dto';

@Injectable()
export class CarrierDhlTrackingEventService {
  constructor(
    @Inject(Provider.KafkaProducer) private readonly kafkaClient: ClientKafka,
    private readonly carrierRepo: CarrierDbRepository,
  ) {}

  public async run(dto: DhlTrackingEventDto): Promise<boolean> {
    const dhlTrackingEvent: TrackCreatedEvent = this.createEvent(dto);
    this.kafkaClient.emit(
      'tracking.carrier.event',
      JSON.stringify(dhlTrackingEvent),
    );
    await this.carrierRepo.saveDhlTrackingEvent(dhlTrackingEvent);
    return true;
  }

  private createEvent(dto: DhlTrackingEventDto): TrackCreatedEvent {
    return partialAssign(new TrackCreatedEvent(), {
      event: dto.event,
      eventId: dto.event_id,
      timestamp: dto.timestamp,
      courier: dto.courier,
      trackingNumber: dto.tracking_number,
      language: dto.language,
      trackingLink: dto.tracking_link,
      isConsumed: false,
    });
  }
}

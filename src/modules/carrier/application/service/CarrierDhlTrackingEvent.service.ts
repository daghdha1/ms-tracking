import { CarrierDbRepository } from '@Carrier/domain/repository/CarrierDb.repository'
import { Inject, Injectable } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { partialAssign, Provider, TrackingStatusCreatedEvent } from 'pkg-shared'
import { DhlTrackingEventDto } from '../dto/DhlTrackingEvent.dto'
import { CarrierException } from '@Carrier/domain/exception/Carrier.exception'
import { Tracking } from '@Core/domain/entity/Tracking.entity'
import { ICoreGetTracking } from '@Core/infrastructure/interface/CoreGetTracking.interface'

@Injectable()
export class CarrierDhlTrackingEventService {
  constructor(
    @Inject(Provider.KafkaProducer) private readonly kafkaClient: ClientKafka,
    @Inject('GET_TRACKING')
    private readonly getTrackingService: ICoreGetTracking,
    private readonly carrierRepo: CarrierDbRepository
  ) {}

  public async run(dto: DhlTrackingEventDto): Promise<boolean> {
    const tracking: Tracking = await this.getTrackingService.run(dto.tracking_number)
    const dhlTrackingEvent: TrackingStatusCreatedEvent = this.createEvent(dto, tracking)
    try {
      this.kafkaClient.emit(process.env.KAFKA_TRACKING_CARRIER_TOPIC, JSON.stringify(dhlTrackingEvent))
    } catch (error) {
      dhlTrackingEvent.inQueue = false
      throw new CarrierException('The tracking has not been sent to kafka')
    } finally {
      await this.carrierRepo.saveDhlTrackingEvent(dhlTrackingEvent)
    }
    return true
  }

  private createEvent(dto: DhlTrackingEventDto, tracking: Tracking): TrackingStatusCreatedEvent {
    return partialAssign(new TrackingStatusCreatedEvent(), {
      event: dto.event,
      eventId: dto.event_id,
      timestamp: dto.timestamp,
      courier: dto.courier,
      trackingNumber: dto.tracking_number,
      language: dto.language,
      trackingLink: dto.tracking_link,
      phone: tracking.phone,
      email: tracking.email,
      orderNo: tracking.orderNo,
      recipientNotification: tracking.recipientNotification,
      recipient: tracking.recipient,
      notificationPlatform: tracking.notificationPlatform,
      inQueue: true
    })
  }
}

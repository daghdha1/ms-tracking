import { Tracking } from '@Core/domain/entity/Tracking.entity';
import { randomUUID } from 'crypto';
import { partialAssign } from 'pkg-shared';

export class CoreTrackingModel {
  _id: any;
  courier: string;
  trackingNumber: string;
  service: string;
  zipCode: string;
  orderNo?: string;
  notificationPlatform?: string[];
  recipientNotification?: string;
  recipient?: string;
  phone: string;
  email?: string;
  street?: string;
  city?: string;
  synced: boolean;

  static toEntity(model: CoreTrackingModel): Tracking {
    return partialAssign(new Tracking(), {
      courier: model.courier,
      trackingNumber: model.trackingNumber,
      service: model.service,
      zipCode: model.zipCode,
      orderNo: model.orderNo,
      notificationPlatform: model.notificationPlatform,
      recipientNotification: model.recipientNotification,
      recipient: model.recipient,
      phone: model.phone,
      email: model.email,
      street: model.street,
      city: model.city,
      synced: model.synced,
    });
  }

  static fromEntity(tracking: Tracking): CoreTrackingModel {
    return partialAssign(new this(), {
      _id: randomUUID,
      courier: tracking.courier,
      trackingNumber: tracking.trackingNumber,
      service: tracking.service,
      zipCode: tracking.zipCode,
      orderNo: tracking.orderNo,
      notificationPlatform: tracking.notificationPlatform,
      recipientNotification: tracking.recipientNotification,
      recipient: tracking.recipient,
      phone: tracking.phone,
      email: tracking.email,
      street: tracking.street,
      city: tracking.city,
      synced: tracking.synced,
    });
  }
}

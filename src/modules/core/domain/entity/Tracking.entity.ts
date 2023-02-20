import { partialAssign } from 'pkg-shared';
import { CoreCreateTrackingType } from '../types/CoreCreateTracking.type';

export class Tracking {
  public courier: string;
  public trackingNumber: string;
  public service: string;
  public zipCode: string;
  public mobile: string;
  public orderNo?: string;
  public notificationPlatform?: string[];
  public recipientNotification?: string;
  public recipient?: string;
  public email?: string;
  public street?: string;
  public city?: string;

  public static create(dto: CoreCreateTrackingType): Tracking {
    return partialAssign(new this(), {
      courier: dto.courier.toUpperCase(),
      trackingNumber: dto.tracking_number,
      service: dto.service,
      zipCode: dto.zip_code,
      mobile: dto.mobile,
      orderNo: dto.orderNo,
      notificationPlatform: dto.notification_platform,
      recipientNotification: dto.recipient_notification,
      recipient: dto.recipient,
      email: dto.email,
      street: dto.street,
      city: dto.city,
    });
  }
}

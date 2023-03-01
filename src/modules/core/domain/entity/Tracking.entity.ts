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
  public synced: boolean;

  public static create(data: CoreCreateTrackingType): Tracking {
    return partialAssign(new this(), {
      courier: data.courier.toUpperCase(),
      trackingNumber: data.tracking_number,
      service: data.service,
      zipCode: data.zip_code,
      mobile: data.mobile,
      orderNo: data.orderNo,
      notificationPlatform: data.notification_platform,
      recipientNotification: data.recipient_notification,
      recipient: data.recipient,
      email: data.email,
      street: data.street,
      city: data.city,
      synced: false,
    });
  }
}

export type CoreCreateTrackingType = {
  courier: string;
  tracking_number: string;
  service: string;
  zip_code: string;
  mobile: string;
  orderNo?: string;
  notification_platform?: string[];
  recipient_notification?: string;
  recipient?: string;
  email?: string;
  street?: string;
  city?: string;
};

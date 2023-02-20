import { GlsHookDataDto } from './GlsHookData.dto';
import { GlsHookReferencesDto } from './GlsHookReferences.dto';
import { GlsHookReportingDto } from './GlsHookReporting.dto';

export class GlsHookDto {
  event: string;
  eventId: string;
  timestamp: string;
  references: GlsHookReferencesDto;
  data: GlsHookDataDto;
  reporting: GlsHookReportingDto;
}

import { DhlHookDataDto } from './DhlHookData.dto';
import { DhlHookReferencesDto } from './DhlHookReferences.dto';
import { DhlHookReportingDto } from './DhlHookReporting.dto';

export class DhlHookDto {
  event: string;
  eventId: string;
  timestamp: string;
  references: DhlHookReferencesDto;
  data: DhlHookDataDto;
  reporting: DhlHookReportingDto;
}

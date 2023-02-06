import { Injectable } from '@nestjs/common';
import { DhlHookDto } from '../dto/DhlHook.dto';

@Injectable()
export class DhlHookService {
  public run(dto: DhlHookDto): boolean {
    // get, save, and send data to notification ms

    return true;
  }
}

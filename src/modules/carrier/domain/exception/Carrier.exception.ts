import { BaseException } from 'pkg-shared'

export class CarrierException extends BaseException {
  constructor(msg: string) {
    super(msg)
  }
}

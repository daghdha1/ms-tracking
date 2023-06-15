import { CoreCreateTrackingDto } from '@Core/application/dto/CoreCreateTracking.dto'
import { CoreCreateTrackingService } from '@Core/application/service/CoreCreateTracking.service'
import { Body, Controller, Post, Req } from '@nestjs/common'
import { BaseHttpResponse } from 'pkg-shared'
import { CoreApiHttpRepository } from '../persistence/http/repository/CoreApiHttp.repository'

@Controller('core')
export class CoreTrackingController extends BaseHttpResponse {
  constructor(
    private readonly createTrackService: CoreCreateTrackingService,
    private readonly identityApiRepo: CoreApiHttpRepository
  ) {
    super()
  }

  @Post('create')
  public async createTracking(@Req() req, @Body() dto: CoreCreateTrackingDto): Promise<any> {
    const authorizationHeader = req.headers.authorization
    try {
      if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        const accessToken = authorizationHeader.slice(7)
        if (await this.identityApiRepo.apiCheckAccess(accessToken)) {
          const response = await this.createTrackService.run(dto)
          return this.success(response)
        } else {
          return 'Unauthorized.'
        }
      }
    } catch (error) {
      return 'An unknown error has occurred.'
    }
  }
}

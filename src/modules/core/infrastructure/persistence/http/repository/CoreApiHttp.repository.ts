import { Injectable } from '@nestjs/common'
import fetch from 'node-fetch'

@Injectable()
export class CoreApiHttpRepository {
  public async apiCheckAccess(accessToken: string): Promise<boolean | undefined> {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const uri = `${process.env.IDENTITY_GLOBAL_PREFIX}/auth/checkAccess`
    const response = await fetch(uri, options)
    if (response.status === 401) return undefined
    return true
  }
}

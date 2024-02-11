import { BadGatewayException, Injectable } from '@nestjs/common'
import parse, { HTMLElement } from 'node-html-parser'
import { AxiosService } from '../axios/axios.service'

@Injectable()
export class ScrapperService {
  constructor(private readonly axiosService: AxiosService) { }

  async getHTML(url: string, method = 'GET', data?: any): Promise<HTMLElement> {
    let responseData: string

    switch (method) {
      case 'GET':
        responseData = await this.axiosService.get(url)
          .then(({ data }) => Promise.resolve(data))
          .catch(e => {
            console.log(e)
            throw new BadGatewayException()
          })
        break

      case 'POST':
        responseData = await this.axiosService.post(url, data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(({ data }) => Promise.resolve(data))
          .catch(e => {
            console.log(e)
            throw new BadGatewayException()
          })
        break

      default:
        return
    }

    return parse(responseData)
  }
}

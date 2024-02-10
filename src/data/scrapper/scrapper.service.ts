import { BadGatewayException, Injectable } from '@nestjs/common'
import parse, { HTMLElement } from 'node-html-parser'
import { AxiosService } from '../axios/axios.service'

@Injectable()
export class ScrapperService {
  constructor(private readonly axiosService: AxiosService) { }

  async getHTML(url: string): Promise<HTMLElement> {
    const { data } = await this.axiosService.get(url)
      .then(({ data }) => Promise.resolve(data))
      .catch(e => {
        console.log(e)
        throw new BadGatewayException()
      })

    return parse(data)
  }
}

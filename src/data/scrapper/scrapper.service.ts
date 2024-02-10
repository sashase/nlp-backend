import { HttpException, Injectable } from '@nestjs/common'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import parse, { HTMLElement } from 'node-html-parser'

@Injectable()
export class ScrapperService {
  async getHTML(url: string, config?: AxiosRequestConfig): Promise<HTMLElement> {
    const { data } = await axios.get(url, config)
      .then((res: AxiosResponse) => Promise.resolve(res))
      .catch((error: AxiosError) => {
        console.log(error)
        throw new HttpException(error.response.statusText, error.response.status)
      })

    return parse(data)
  }
}

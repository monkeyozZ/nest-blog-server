import { Injectable } from '@nestjs/common';
import { login_cellphone, login_status, likelist, recommend_songs, personalized_newsong } from 'NeteaseCloudMusicApi'

type LoginParams = {
  phone: string
  password: string,
  countrycode: string
}

@Injectable()
export class MusicService {
  async login(params: LoginParams):Promise<any> {
    return await login_cellphone(params)
  }
  async getLoginStatus():Promise<any> {
    return await login_status({})
  }
  async getRecommendSongs():Promise<any> {
    return await personalized_newsong({})
  }
  async getList():Promise<any> {
    const params = {
      phone: '18071409973',
      password: 'hbg19950616',
      countrycode: '86'
    }
    const res = await this.login(params)
    if (res.body.code == 200) {
      console.log(res)
      return res.body.result
    } else {
      return false
    }
  }
}

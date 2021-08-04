import { Injectable } from '@nestjs/common';
import * as qiniu from 'qiniu'
import random  = require('string-random');

type File = {
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  buffer: any
}
@Injectable()
export class UploadService {
  async image (file: File):Promise<any> {
    const accessKey = 'x_obzfWYrgMZUsSMpv5mRh_8WwPdapPBy9tEKZVN'; //可在个人中心=》秘钥管理查看
    const secretKey = 'LPnT0YZc-Y8F6ipLf88nSUZc66FiR9wj8Z2Dqa4q'; //可在个人中心=》秘钥管理查看
    const bucket = "wowmonkey";  //存储空间名称
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
      scope: bucket
    }
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const token = putPolicy.uploadToken(mac);
    const putExtra = new qiniu.form_up.PutExtra();
    const config = new qiniu.conf.Config();
    config['zone'] = qiniu.zone.Zone_z2; // 空间对应的机房
    const formUploader = new qiniu.form_up.FormUploader(config);
    const key = random(16);
    return new Promise((resolve, rejects) => {
      formUploader.put(token, key, file.buffer, putExtra, (respErr,
        respBody, respInfo) => {
        if (respErr) {
          rejects(respErr);
        }
        if (respInfo.statusCode == 200) {
          const bucketManager = new qiniu.rs.BucketManager(mac, config);
          const publicBucketDomain = 'https://images.wowmonkey.cn';
          // 公开空间访问链接
          const publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, respBody.key);
          resolve(publicDownloadUrl)
        } else {
          // console.log(respInfo.statusCode);
          rejects(respBody);
        }
      });
    })
    // console.log(res)
  }

  async delete(key: string):Promise<any> {
    const accessKey = 'x_obzfWYrgMZUsSMpv5mRh_8WwPdapPBy9tEKZVN'; //可在个人中心=》秘钥管理查看
    const secretKey = 'LPnT0YZc-Y8F6ipLf88nSUZc66FiR9wj8Z2Dqa4q'; //可在个人中心=》秘钥管理查看
    const bucket = "wowmonkey";  //存储空间名称
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const config = new qiniu.conf.Config();
    config['zone'] = qiniu.zone.Zone_z2; // 空间对应的机房
    const bucketManager = new qiniu.rs.BucketManager(mac, config);
    return new Promise((resolve, rejects) => {
      bucketManager.delete(bucket, key, function(err, respBody, respInfo) {
        if (err) {
          rejects(err);
        } else {
          if (respInfo.statusCode == 200) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      });
    })
  }
}

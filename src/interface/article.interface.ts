export interface ArticleParams {
  id?:string
  isClient?: boolean
  status?: number | string | boolean
  category?: string
  tag?: string
  keywords?: string
  pageSize?: string | number
  pageNum?: string | number
  hot?: boolean
  recovery?: boolean
  $or?: any[]
  beginTime?: string
  endTime?: string
}

export interface whereType {
  status?: boolean
  category?: string
  recovery?: boolean
  tag?: string
  keywords?: string
  $or?: any[]
  hot?: boolean
  creatTime?: any
}

export interface pageInfo {
  pageSize?: string | number
  pageNum?: string | number
}
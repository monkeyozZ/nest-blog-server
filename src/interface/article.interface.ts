export interface ArticleParams {
  id?:string
  status?: number | string
  cate?: string
  tag?: string
  keywords?: string,
  pageSize?: string | number,
  pageNum?: string | number
}

export interface whereType {
  status?: boolean
  category?: string
  recovery?: boolean
  tag?: string,
  keywords?: string,
  $or?: any[]
}

export interface pageInfo {
  pageSize?: string | number,
  pageNum?: string | number
}
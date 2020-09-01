export interface ArticleParams {
  id?:string
  status?: number | string
  cate?: string
  tag?: string
  keywords?: string
}

export interface whereType {
  status?: boolean
  category?: string
  recovery?: boolean
  tag?: string,
  keywords?: string,
  $or?: any[]
}
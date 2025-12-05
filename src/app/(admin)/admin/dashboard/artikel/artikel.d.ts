export interface IArtikel {
  success: boolean
  page: number
  limit: number
  totalPage: number
  totalItem: number
  data?: DataEntity[] | undefined
}
export interface DataEntity {
  id: number
  title: string
  tags?: string[] | null
  category: string
  content: string
  slug: string
  thumbnail: string
  createdAt: string
  updatedAt: string
  author: string
  gambar?: GambarEntity[] | null
  seo: Seo
}
export interface GambarEntity {
  id: number
  url: string
  artikelId: number
}
export interface Seo {
  id: number
  type: string
  pageTitle: string
  metaDescription: string
  keywords?: string[] | null
}

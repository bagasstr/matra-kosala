import {
  ColumnDef,
  type OnChangeFn,
  type PaginationState,
} from '@tanstack/react-table'
import type React from 'react'

export type Portofolio = {
  id: number
  title: string
  tahun: string
  provinsi: { name: string }[]
  kota: { name: string }[]
  slug: string
  image: string
  detail_images: string[] // Array untuk gambar tambahan
  description: string // Deskripsi proyek
  kategori: string
  listColors: string[]
}

export type PortofolioCardProps = {
  portofolio: Portofolio
  isLarge?: boolean
}
type ClientProps = {
  heading?: string
}
export type PortofolioContentProps = {
  heading?: string
  children?: React.ReactNode
}

export type Article = {
  id: string
  judul: string
  konten?: string
  date: string
  url_gambar: string
  slug: string
}

type ImageCarouselProps = {
  images: { src: string; alt: string }[]
  current: number // Index dari slide aktif
  onDotClick: (index: number) => void // Fungsi untuk navigasi dots
}

export type ServiceProps = {
  title: string
  imageSrc: string
  altText: string
  description?: string // Deskripsi bersifat opsional
  listColors: string // Warna garis pembatas untuk tiap list
  textColor: string
  accordionContent: string[] // Konten untuk accordion
}

type ServicesProps = {
  showButton?: boolean // Menambahkan properti untuk mengontrol tampilan tombol
  showDescription?: boolean // Menambahkan properti untuk mengontrol tampilan deskripsi
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[] | any
  pagination?: PaginationState
  setPagination?: ((value: PaginationState) => void) | undefined
  isLoading?: boolean
}

export interface IProdukTable {
  id: number
  namaBarang: string
  hargaBarang: number
  thumbnail: string
  berat: number
  kategori: string
  subKategori: string
  jumlahUnit: number
  createdAt: string
}

export interface IPortofolioTable {
  id: number
  judul: string
  klien: string
  tipe: string
  tanggalProyek: string
  lokasi: string
  createdAt: string
}

export interface IPortofolioData {
  id: number
  title: string
  mitraKlien: string
  tipeBangunan: string
  tanggalPelaksanaan: string
  lokasi: string
  createdAt: string
}

export interface IPortofolioDetail {
  id: number
  judul: string
  klien: string
  tipe: string
  ringkasan: string
  tanggalProyek: string
  lokasi: string
  gambar: TGambarPortofolio[]
  createdAt: string
}

type TGambarPortofolio = {
  id: number
  url: string
}

type TypePorto = {
  title: string
  thumbnail: string
  mitraKlien: string
  ringkasan: string
  tipeBangunan:
    | 'Gedung Hunian'
    | 'Gedung Kantor'
    | 'Gedung Komersial'
    | 'Gedung Pendidikan'
  mulaiPelaksanaan: string
  selesaiPelaksanaan: string
  lokasi: string
  gambarProyek: GambarProyek[]
}
interface GambarProyek {
  id: number
  url: string
}
export type TPorto = {
  data: TypePorto
}

export interface IPortfolio {
  id: number
  title: string
  slug: string
  mitraKlien: string
  ringkasan: string
  tipeBangunan: string
  mulaiPelaksanaan?: string | undefined
  selesaiPelaksanaan?: string | undefined
  tanggalPelaksanaan: string
  lokasi: string
  thumbnail: File
  gambarProyek: {
    id: number
    url: string
    portfolioProyekId: number
  }[]
  createdAt: string
}

export interface IPortfolioResponse {
  success: boolean
  error: Error
  page?: number
  limit?: number
  totalPage?: number
  totalItem?: number
  data: IPortfolio[]
}

// constants/portfolio.ts
export const CATEGORY_DATA = [
  { value: 'semua', label: 'Semua' },
  { value: 'perkantoran-dan-gudang', label: 'Perkantoran dan Gudang' },
  { value: 'gedung-hunian', label: 'Gedung Hunian' },
  { value: 'gedung-pendidikan', label: 'Gedung Pendidikan' },
  { value: 'gedung-kesehatan', label: 'Gedung Kesehatan' },
] as const

export interface IProduk {
  id: number
  produk: string // filter search
  harga: number
  thumbnail: string
  berat: number
  kategori: string // filter select
  subKategori: string // filter search
  stok: number
  tanggal: string | number
}

export interface IArtikel {
  id: number
  title: string
  slug: string
  content: string
  tags: string[]
  thumbnail: string
  gambar: IGambarArtikel[]
  seo: ISeoArtikel
  createdAt: string
  author: string
  category: string
}
export interface IGambarArtikel {
  id: number
  url: string
  artikelId: number
}
export interface ISeoArtikel {
  id: number
  pageTitle: string
  type: string
  metaDescription: string
  keywords: string[]
}

export interface IArtikelDetail {
  id: number
  title: string
  refrensi: string
  category: string
  content: string
  slug: string
  thumbnail: string
  createdAt: string
  author: string
  seo: ISeo
}

export interface ISeo {
  id: number
  type?: string
  pageTitle: string
  metaDescription: string
  keywords: string[]
  createdAt: string
  updatedAt: string
}

export interface ITestimoniResponse {
  success: boolean
  page: number
  limit: number
  totalPage: number
  totalItem: number
  data: ITestimoniTable[]
}
export interface ITestimoniTable {
  id: number
  company: string
  testi: string
  title: string
  author: string
  image: string
  createdAt: string
  updatedAt: string
}

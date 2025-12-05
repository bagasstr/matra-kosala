'use client'

import type {
  DataEntity,
  IArtikel,
} from '@/app/(admin)/admin/dashboard/artikel/artikel'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import {
  categoryAtomArtikel,
  pageArtikel,
  selectedItemArtikel,
  stateDeleteArtikel,
} from '@/hooks/jotaiHooks'
import { clientEnv } from '@/lib/client'
import { useAtom, useAtomValue } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'
import DetailArtikel from './DetailArtikel'
import TambahArtikel from './TambahArtikel'
import DOMPurify from 'dompurify'
import { DisplayCardContentArtikel } from '@/components/DisplayContent'
import DeleteArtikel from './DeleteArtikel'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface IArtikelProps {
  data: IArtikel
  ITEMS_PER_PAGE: number
  isLoading: boolean
  kategori: string[]
}
export default function ArtikelTable({
  data,
  ITEMS_PER_PAGE,
  isLoading,
  kategori,
}: IArtikelProps) {
  const [selectedKategori, setSelectedKategori] =
    useAtom<string>(categoryAtomArtikel)
  const [selectedItem, setSeletedItem] = useAtom<number[]>(selectedItemArtikel)
  const [page, setPage] = useAtom<number>(pageArtikel)
  const stateDelete = useAtomValue(stateDeleteArtikel)
  // Filter data
  const filteredData = useMemo(() => {
    if (!data) return []
    return selectedKategori
      ? data.data?.filter(
          (item: DataEntity) =>
            item.category.toLowerCase() === selectedKategori.toLowerCase()
        )
      : data.data
  }, [data?.data, selectedKategori])

  // Pagination handlers
  const handleFirstPage = useCallback(() => setPage(1), [])
  const handleLastPage = useCallback(() => {
    const totalPages = data.totalPage || 1
    setPage(totalPages)
  }, [data?.totalPage, ITEMS_PER_PAGE])
  const handleNextPage = useCallback(() => setPage((p) => p + 1), [])
  const handlePrevPage = useCallback(
    () => setPage((p) => Math.max(1, p - 1)),
    []
  )

  // Handle category change
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedKategori(category)
    setPage(1)
  }, [])

  // Handle remove filter
  const handleRemoveFilter = useCallback(() => {
    setSelectedKategori('')
    setPage(1)
  }, [])

  const kategories = (kategori: string) => {
    switch (kategori) {
      case 'matra_kosala':
        return 'Matra Kosala'
      case 'seputar_konstruksi':
        return 'Seputar Konstruksi'
      case 'tips_dan_pedoman':
        return 'Tips dan Pedoman'
      default:
        return ''
    }
  }

  const handleCheckItem = (id: number) => {
    setSeletedItem((item: number[]) => {
      if (item.includes(id)) {
        return item.filter((i) => i !== id)
      } else {
        return [...item, id]
      }
    })
  }

  return (
    <div className='space-y-6'>
      <div className={cn('')}>
        <h1 className={cn('text-xl font-semibold mb-4')}>Data Artikel</h1>
      </div>
      {/* Filter Section */}
      <div className='flex justify-between gap-x-3 items-center'>
        <Select value={selectedKategori} onValueChange={handleCategoryChange}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Pilih Kategori' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter Kategori</SelectLabel>
              {kategori.map((category) => (
                <SelectItem key={category} value={category}>
                  {kategories(category)}
                </SelectItem>
              ))}
              {selectedKategori && (
                <Button
                  type='button'
                  className='h-8 mt-4 w-full'
                  onClick={handleRemoveFilter}>
                  Reset filter
                </Button>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className='flex gap-x-4'>
          <TambahArtikel />
          <DeleteArtikel />
        </div>
      </div>

      {/* Articles Grid */}
      <div className='grid grid-cols-4 gap-4'>
        {isLoading ? (
          // Loading skeletons
          Array(ITEMS_PER_PAGE)
            .fill(0)
            .map((_, idx) => (
              <Card key={idx} className='border rounded-sm shadow'>
                <CardHeader className='p-2'>
                  <Skeleton className='w-[200px] h-[150px]' />
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-6 w-24' />
                  <Skeleton className='h-6 w-[150px]' />
                </CardHeader>
              </Card>
            ))
        ) : filteredData?.length === 0 ? (
          <div className='col-span-4 text-center py-8'>
            Tidak ada artikel untuk kategori ini
          </div>
        ) : (
          filteredData?.map((artikel: DataEntity) => (
            <Card
              key={artikel.id}
              className='relative border rounded-sm shadow pb-2'>
              {stateDelete && (
                <div className='absolute right-2 top-2 flex items-center justify-center z-40'>
                  <Checkbox
                    className='size-5 bg-muted border-none'
                    checked={selectedItem.includes(artikel.id)}
                    onCheckedChange={() => handleCheckItem(artikel.id)}
                  />
                </div>
              )}
              <CardHeader className='flex flex-col justify-between h-full'>
                <div className='p-2 space-y-3'>
                  <div className='relative w-full h-[150px]'>
                    <Image
                      src={`${clientEnv.BASE_URL}/${artikel.thumbnail}`}
                      alt={artikel.title}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <CardDescription className='line-clamp-2'>
                    {artikel.category.trim().replace(/_/g, ' ')}
                  </CardDescription>
                  <CardTitle className='line-clamp-2 mt-2'>
                    {artikel.title}
                  </CardTitle>
                  <CardContent className='line-clamp-2'>
                    <DisplayCardContentArtikel
                      htmlContent={artikel.seo.metaDescription}
                    />
                  </CardContent>
                </div>
                <div className='mx-auto w-10/12'>
                  <DetailArtikel slug={artikel.slug} />
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className='flex justify-center items-center gap-2'>
        <Button
          variant='outline'
          onClick={handleFirstPage}
          disabled={page === 1 || isLoading}>
          First page
        </Button>
        <Button
          variant='outline'
          onClick={handlePrevPage}
          disabled={page === 1 || isLoading}>
          Previous
        </Button>
        <span className='flex items-center px-4'>Page {page}</span>
        <Button
          variant='outline'
          onClick={handleNextPage}
          disabled={
            (filteredData && filteredData.length < ITEMS_PER_PAGE) || isLoading
          }>
          Next
        </Button>
        <Button
          variant='outline'
          onClick={handleLastPage}
          disabled={
            (filteredData && filteredData.length < ITEMS_PER_PAGE) || isLoading
          }>
          Last page
        </Button>
      </div>
    </div>
  )
}

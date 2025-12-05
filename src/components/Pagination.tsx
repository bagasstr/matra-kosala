import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { page } from '@/hooks/jotaiHooks'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { buttonVariants } from './ui/button'

interface IPaginationPageProp {
  totalPages: number
}
export default function PaginationPage({ totalPages }: IPaginationPageProp) {
  const [activePage, setActivePage] = useAtom(page)
  const handlePervious = () => {
    if (typeof activePage === 'number' && activePage > 1) {
      setActivePage(activePage - 1)
    }
  }
  const handleNext = () => {
    if (typeof activePage === 'number' && activePage < totalPages) {
      setActivePage(activePage + 1)
    }
  }
  const pageNumber = useMemo(() => {
    const maxVisiblePage = 5
    const page: number[] = []
    if (totalPages <= maxVisiblePage) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }
    if (activePage <= Math.ceil(maxVisiblePage / 2)) {
      return [
        ...Array.from({ length: maxVisiblePage - 1 }, (_, index) => index + 1),
        totalPages,
      ]
    }
    if (activePage >= totalPages - Math.floor(maxVisiblePage / 2)) {
      return [
        1,
        ...Array.from(
          { length: maxVisiblePage - 1 },
          (_, index) => totalPages - maxVisiblePage + 2 + index
        ),
      ]
    }
    return [
      1,
      ...Array.from({ length: 3 }, (_, index) => activePage - 1 + index),
      totalPages,
    ]
  }, [activePage, totalPages])

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              size={'default'}
              className='cursor-pointer font-medium text-primary-dark'
              onClick={handlePervious}
            />
          </PaginationItem>

          {pageNumber.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => setActivePage(page)}
                className={`
                cursor-pointer 
                font-semibold 
                
                ${page === activePage ? buttonVariants({ variant: 'default', size: 'sm', className: 'bg-primary-dark hover:bg-primary-dark hover:text-white' }) : 'text-primary-dark bg-primary-accent hover:bg-primary-accent hover:text-primary-dark'}
              `}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              size={'default'}
              className='cursor-pointer font-medium text-primary-dark'
              onClick={handleNext}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex justify-center gap-4 items-center h-screen w-screen flex-col'>
      <h1 className='text-2xl font-bold'>Oops!</h1>
      <p className={cn('')}>Halaman tidak ditemukan</p>
      <Link href='/'>
        <Button className={cn('rounded bg-primary-dark')}>
          Kembali ke beranda
        </Button>
      </Link>
    </div>
  )
}

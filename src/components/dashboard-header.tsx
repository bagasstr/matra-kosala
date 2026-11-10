'use client'

import { CalendarDays } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

const TITLES: Record<string, string> = {
  vendor: 'Data Vendor',
  portofolio: 'Portofolio',
  produk: 'Produk',
  artikel: 'Artikel',
  testimoni: 'Testimoni',
  seo: 'SEO',
}

export function DashboardHeader() {
  const section = usePathname().split('/')[3] ?? ''
  const title = TITLES[section] ?? 'Overview'
  const today = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <header className='sticky top-0 z-10 flex h-16 shrink-0 items-center gap-3 border-b bg-card/80 px-4 backdrop-blur md:px-6'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='h-5' />
      <div className='leading-tight'>
        <p className='text-xs text-muted-foreground'>Admin</p>
        <h1 className='text-sm font-semibold'>{title}</h1>
      </div>
      <div
        suppressHydrationWarning
        className='ml-auto hidden items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground sm:flex'>
        <CalendarDays className='size-3.5' />
        {today}
      </div>
    </header>
  )
}

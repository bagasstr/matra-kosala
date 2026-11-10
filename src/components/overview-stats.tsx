'use client'

import { useQuery } from '@tanstack/react-query'
import {
  ArrowUpRight,
  BookImage,
  BookOpenCheck,
  BookUser,
  Newspaper,
  SearchCheck,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { clientEnv } from '@/lib/client'
import { cn } from '@/lib/utils'

type ArtikelItem = {
  id: number
  title: string
  category: string
  slug: string
  createdAt: string
}

const countOf = (d: unknown): number => {
  if (Array.isArray(d)) return d.length
  const o = d as { totalItem?: number; data?: unknown[] } | null
  return o?.totalItem ?? o?.data?.length ?? 0
}

const getJson = async (url: string) => {
  const res = await fetch(url, { cache: 'no-cache' })
  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error('Gagal mengambil data')
  }
  return res.json()
}

const STATS: {
  key: string
  title: string
  href: string
  icon: LucideIcon
  tone: string
  url: () => string
}[] = [
  {
    key: 'artikel',
    title: 'Artikel',
    href: '/admin/dashboard/artikel',
    icon: Newspaper,
    tone: 'bg-indigo-100 text-indigo-600',
    url: () => `${clientEnv.BASE_URL}/api/artikel?page=1&limit=1`,
  },
  {
    key: 'portofolio',
    title: 'Portofolio',
    href: '/admin/dashboard/portofolio',
    icon: BookImage,
    tone: 'bg-emerald-100 text-emerald-600',
    url: () => `${clientEnv.API_URL}/portfolio?page=1&limit=1000`,
  },
  {
    key: 'testimoni',
    title: 'Testimoni',
    href: '/admin/dashboard/testimoni',
    icon: BookOpenCheck,
    tone: 'bg-amber-100 text-amber-600',
    url: () => `${clientEnv.API_URL}/testimoni?page=1&limit=1000`,
  },
  {
    key: 'vendor',
    title: 'Data Vendor',
    href: '/admin/dashboard/vendor',
    icon: BookUser,
    tone: 'bg-rose-100 text-rose-600',
    url: () => `${clientEnv.API_URL}/vendor`,
  },
]

const QUICK_LINKS = [
  { title: 'Tulis artikel baru', href: '/admin/dashboard/artikel', icon: Newspaper },
  { title: 'Tambah portofolio', href: '/admin/dashboard/portofolio', icon: BookImage },
  { title: 'Kelola testimoni', href: '/admin/dashboard/testimoni', icon: BookOpenCheck },
  { title: 'Atur SEO', href: '/admin/dashboard/seo', icon: SearchCheck },
]

function StatCard({ stat }: { stat: (typeof STATS)[number] }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['overview', stat.key],
    queryFn: async () => countOf(await getJson(stat.url())),
  })
  const Icon = stat.icon

  return (
    <Link href={stat.href} className='group'>
      <Card className='h-full border-0 shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:shadow-md'>
        <CardContent className='flex items-center gap-4 p-5'>
          <div className={cn('rounded-xl p-3', stat.tone)}>
            <Icon className='size-6' />
          </div>
          <div className='min-w-0'>
            <p className='text-sm text-muted-foreground'>{stat.title}</p>
            <p className='text-2xl font-bold leading-tight'>
              {isLoading ? '…' : isError ? '-' : data}
            </p>
          </div>
          <ArrowUpRight className='ml-auto size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100' />
        </CardContent>
      </Card>
    </Link>
  )
}

function RecentArticles() {
  const { data, isLoading } = useQuery({
    queryKey: ['overview', 'recent-artikel'],
    queryFn: async (): Promise<ArtikelItem[]> => {
      const json = await getJson(
        `${clientEnv.BASE_URL}/api/artikel?page=1&limit=5`,
      )
      return json?.data ?? []
    },
  })

  return (
    <Card className='border-0 shadow-sm lg:col-span-2'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='text-base'>Artikel terbaru</CardTitle>
        <Link
          href='/admin/dashboard/artikel'
          className='text-xs font-medium text-primary hover:underline'>
          Lihat semua
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className='py-6 text-center text-sm text-muted-foreground'>
            Memuat…
          </p>
        ) : !data?.length ? (
          <p className='py-6 text-center text-sm text-muted-foreground'>
            Belum ada artikel.
          </p>
        ) : (
          <ul className='divide-y'>
            {data.map((a) => (
              <li
                key={a.id}
                className='flex items-center justify-between gap-4 py-3'>
                <div className='min-w-0'>
                  <p className='truncate text-sm font-medium'>{a.title}</p>
                  <p className='text-xs text-muted-foreground'>
                    {a.category?.replaceAll('_', ' ')}
                  </p>
                </div>
                <time className='shrink-0 text-xs text-muted-foreground'>
                  {new Date(a.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

export function OverviewStats() {
  return (
    <div className='space-y-8'>
      <div className='rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-sm md:p-8'>
        <h2 className='text-2xl font-bold tracking-tight'>
          Selamat datang kembali 👋
        </h2>
        <p className='mt-1 text-sm text-indigo-100'>
          Kelola artikel, portofolio, testimoni, dan data Matrakosala dari satu
          tempat.
        </p>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {STATS.map((s) => (
          <StatCard key={s.key} stat={s} />
        ))}
      </div>

      <div className='grid gap-4 lg:grid-cols-3'>
        <RecentArticles />
        <Card className='border-0 shadow-sm'>
          <CardHeader>
            <CardTitle className='text-base'>Aksi cepat</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-2'>
            {QUICK_LINKS.map(({ title, href, icon: Icon }) => (
              <Link
                key={title}
                href={href}
                className='flex items-center gap-3 rounded-lg border bg-background px-3 py-2.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground'>
                <Icon className='size-4 text-primary' />
                {title}
                <ArrowUpRight className='ml-auto size-4 text-muted-foreground' />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

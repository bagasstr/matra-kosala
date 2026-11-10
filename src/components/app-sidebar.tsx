'use client'

import * as React from 'react'
import {
  BookImage,
  BookOpenCheck,
  BookUser,
  LayoutDashboard,
  Newspaper,
  SearchCheck,
  ShoppingCart,
} from 'lucide-react'

import { NavMain, type NavGroup } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Utama',
    items: [
      { title: 'Overview', url: '/admin/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Konten',
    items: [
      { title: 'Artikel', url: '/admin/dashboard/artikel', icon: Newspaper },
      {
        title: 'Portofolio',
        url: '/admin/dashboard/portofolio',
        icon: BookImage,
      },
      {
        title: 'Testimoni',
        url: '/admin/dashboard/testimoni',
        icon: BookOpenCheck,
      },
      {
        title: 'Produk',
        url: '/admin/dashboard/produk',
        icon: ShoppingCart,
        disable: true,
      },
    ],
  },
  {
    label: 'Manajemen',
    items: [
      { title: 'Data Vendor', url: '/admin/dashboard/vendor', icon: BookUser },
      { title: 'SEO', url: '/admin/dashboard/seo', icon: SearchCheck },
    ],
  },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader className='border-b border-sidebar-border'>
        <div className='flex items-center gap-3 p-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0'>
          <div className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground'>
            M
          </div>
          <div className='grid text-left leading-tight group-data-[collapsible=icon]:hidden'>
            <span className='text-sm font-semibold text-white'>
              Matrakosala
            </span>
            <span className='text-xs text-sidebar-foreground/70'>
              Admin Panel
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={NAV_GROUPS} />
      </SidebarContent>
      <SidebarFooter className='border-t border-sidebar-border'>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

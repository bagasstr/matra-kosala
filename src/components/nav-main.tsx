'use client'

import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export type NavItem = {
  title: string
  url: string
  disable?: boolean
  icon?: LucideIcon
}

export type NavGroup = { label: string; items: NavItem[] }

export function NavMain({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname()

  return (
    <>
      {groups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel className='text-[11px] uppercase tracking-wider'>
            {group.label}
          </SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map(({ title, url, disable, icon: Icon }) => {
              const isActive =
                pathname === url ||
                (url !== '/admin/dashboard' && pathname.startsWith(`${url}/`))
              return (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton
                    asChild
                    disabled={disable}
                    isActive={isActive}
                    tooltip={title}
                    className='data-[active=true]:bg-sidebar-primary data-[active=true]:font-medium data-[active=true]:text-sidebar-primary-foreground'>
                    <Link
                      href={url}
                      prefetch
                      aria-disabled={disable}
                      className={cn(
                        disable && 'pointer-events-none opacity-50',
                      )}>
                      {Icon && <Icon className='size-4' />}
                      <span>{title}</span>
                      {disable && (
                        <span className='ml-auto rounded bg-sidebar-accent px-1.5 py-0.5 text-[10px]'>
                          Soon
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}

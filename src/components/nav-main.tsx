'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { url } from 'inspector'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    disable?: boolean
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const [isActiveUrl, setActiveUrl] = useState<string | null>(null)
  const handleActive = (url: string) => {
    setActiveUrl(url)
    localStorage.setItem('isActiveUrl', url)
  }
  useEffect(() => {
    const currentUrl = localStorage.getItem('isActiveUrl')
    if (currentUrl) {
      setActiveUrl(currentUrl)
    }
  }, [isActiveUrl])
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            disabled={item.disable}
            defaultOpen={item.isActive}
            className='group/collapsible'>
            <SidebarMenuItem
              className={`${isActiveUrl === item.url ? 'bg-secondary rounded-lg' : ''}`}>
              <SidebarMenuButton
                disabled={item.disable}
                tooltip={item.title}
                onClick={() => handleActive(item.url)}>
                <Link
                  href={item.url}
                  prefetch={true}
                  className='w-full flex items-center gap-x-2'>
                  <div className=''>
                    {item.icon && <item.icon className='size-5' />}
                  </div>
                  <span>{item.title}</span>
                  <ChevronRight className='ml-auto transition-transform duration-200' />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

import '@/app/globals.css'
import { AppSidebar } from '@/components/app-sidebar'
import { DashboardHeader } from '@/components/dashboard-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='bg-background'>
        <DashboardHeader />
        <main className='mx-auto w-full max-w-7xl flex-1 p-4 md:p-8'>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

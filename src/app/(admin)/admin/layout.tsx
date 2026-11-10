import '@/app/globals.css'

import { AdminTheme } from '@/components/admin-theme'
import QueryProvider from '@/lib/queryProvider'
import { Toaster } from 'sonner'
import ProgressBars from '@/lib/progressBar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`antialiased min-h-screen w-full flex flex-col`}>
      <AdminTheme />
      <QueryProvider>
        <Toaster position='top-center' />
        <ProgressBars>{children}</ProgressBars>
      </QueryProvider>
    </div>
  )
}

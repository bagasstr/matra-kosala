import { Toaster } from 'sonner'

export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div className='bg-primary-accent py-4 fixed top-0 z-10 w-full'>
        <h1 className='text-center text-2xl font-bold text-primary-dark'>
          Isi Form Penawaran
        </h1>
      </div>
      <div className='py-16 h-[100dvh]'>{children}</div>
      <Toaster position='top-center' />
    </main>
  )
}

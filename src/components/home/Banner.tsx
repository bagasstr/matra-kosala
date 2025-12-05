'use client'
import { Button } from '@/components/ui/button'
import { buttonCompro } from '@/hooks/jotaiHooks'
import { useAtom } from 'jotai'
import { Download, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Banner() {
  const [, setIsOpen] = useAtom(buttonCompro)
  return (
    <section className='relative w-full h-screen md:py-20 py-36'>
      {/* Background Image with Dark Overlay */}
      <div className='absolute inset-0'>
        <Image
          src='/hero.png'
          alt='Hero Background'
          fill
          quality={100}
          className='object-cover'
          priority
        />
        {/* Dark overlay - adjust opacity as needed */}
        <div className='absolute inset-0 bg-black/40 md:bg-transparent'></div>
      </div>

      {/* Content Container */}
      <div className='relative mx-auto md:py-10 px-4 md:max-w-2xl lg:max-w-5xl'>
        {/* Top Bar */}
        <div className='flex flex-col justify-between gap-4 text-white md:flex-row md:items-center font-semibold '>
          <span className='text-sm  border-b-[1px] border-white w-fit'>
            GENERAL CONTRACTOR
          </span>
          <div className='hidden md:block'>
            <h5 className='text-sm '>ISO. 9001 TAHUN 2015</h5>
          </div>
          <div className='md:flex gap-2 hidden items-center'>
            <span className='text-xl'>15</span>
            <span className='text-sm uppercase leading-tight '>
              Tahun Pengalaman
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className='md:mt-20 mt-32 max-w-7xl mx-auto text-white'>
          <h1 className='leading-tight md:w-[70%] text-[clamp(1.5rem,1.1892rem+1.6575vw,2.25rem)] font-bold'>
            Rancang, Bangun, dan Wujudkan Proyek Anda Bersama Kami
          </h1>
          <div className='absolute right-2 -top-[1px] md:hidden [writing-mode:vertical-lr]'>
            <h5 className='text-sm font-medium'>ISO. 9001 TAHUN 2015</h5>
          </div>
          <p className='mt-6 text-[clamp(0.875rem,0.7714rem+0.5525vw,1.125rem)] leading-relaxed font-normal text-white md:w-[50%] w-[100%]'>
            Dengan pengalaman dan teknologi terbaru, kami hadir untuk memberikan
            solusi konstruksi yang efisien dan berkualitas
          </p>
        </div>

        {/* Buttons */}
        <div className='mt-8 flex gap-5 flex-col md:flex-row md:w-full w-fit'>
          <Button
            variant='outline'
            onClick={() => setIsOpen(true)}
            className='group border cursor-pointer border-white text-white bg-transparent font-medium'
            asChild>
            <div className=''>
              <Download className='mr-2 h-4 w-4 animate-bounce' />
              company profile
            </div>
          </Button>

          <Button
            className='group bg-primary-dark text-white hover:bg-accent-light hover:text-primary-dark font-medium border hover:border-primary-dark transition-colors duration-300 border-white'
            asChild>
            <Link
              href='https://wa.me/6285697093044?text=saya%20ingin%20mendapatkan%20sesi%20konsultasi%20gratis%20dengan%20tenaga%20ahli%20matra%20kosala'
              target='_blank'
              rel='noopener noreferrer'>
              konsultasi segera
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { services } from '@/lib/data'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

interface ServicesProps {
  showButton?: boolean
  showDescription?: boolean
}
export default function Services({
  showButton = true,
  showDescription = true,
}: ServicesProps) {
  return (
    <section className='py-12'>
      <div className='container w-full mx-auto md:max-w-2xl lg:max-w-5xl px-4'>
        <div className='relative group hidden lg:block'>
          {/* Elemen sebelum hover */}
          <div className='flex items-center space-x-4'>
            <div className='w-2 h-12 bg-primary-dark transition-transform duration-500 group-hover:translate-x-2' />
            <h1 className='text-3xl font-bold text-accent-light uppercase transition-transform duration-500 group-hover:translate-x-4'>
              Layanan & Jasa
            </h1>
          </div>

          {/* Elemen saat hover */}
          <h1 className='absolute inset-0 flex items-center justify-center text-3xl font-bold bg-accent-light w-full p-2 mx-auto text-primary-dark uppercase opacity-0 group-hover:opacity-100 group-hover:animate-slide-in-center transition-opacity duration-500'>
            Layanan & Jasa
          </h1>
        </div>
        <div className='bg-primary-accent py-4 block lg:hidden'>
          <h1 className='text-primary-dark text-3xl rounded-sm font-bold uppercase text-center'>
            Layanan & Jasa
          </h1>
        </div>
        <h2 className='text-[clamp(20px,4vw,30px)] text-center text-primary mt-14 font-semibold'>
          Solusi untuk Kebutuhan Anda
        </h2>
        <div className='md:max-w-xl mx-auto'>
          <p className='font-normal leading-relaxed text-center text-[clamp(14px,3.5vw,18px)] mt-3 mb-12'>
            Layanan lengkap yang disesuaikan dengan kebutuhan Anda. Solusi
            konstruksi yang tertintegrasi dalam satu tempat
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative text-center group ${
                index === 3
                  ? 'col-span-1  mt-4 mx-auto lg:mt-0 lg:w-full lg:col-span-1'
                  : ''
              }`}>
              <div>
                {/* Judul dengan warna sesuai listColors */}
                <h2
                  className='text-lg md:text-2xl font-bold mb-4 '
                  style={{ color: service.textColor }}
                  dangerouslySetInnerHTML={{
                    __html: service.title,
                  }}
                />
                <div className='relative aspect-[3/2] md:aspect-square'>
                  <Image
                    src={service.imageSrc}
                    alt={service.altText}
                    fill // Sesuaikan dengan resolusi gambar
                    className='md:hover:opacity-30 object-cover md:transition-opacity md:duration-300'
                  />
                  {/* Teks muncul saat hover */}
                  <div className='absolute inset-0 hidden md:flex items-center justify-center md:bg-black/85 opacity-0 md:hover:opacity-100 md:transition-opacity duration-300 text-white font-semibold'>
                    <ul className='space-y-2 text-left '>
                      {service.accordionContent.map((item, i) => (
                        <li key={i} className='text-sm'>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Menampilkan deskripsi hanya jika showDescription true */}
              {showDescription && service.description && (
                <p className='text-sm text-muted-foreground mt-2'>
                  Tab untuk melihat detail
                </p>
              )}

              <div
                className='h-2 mt-2 hidden md:block'
                style={{
                  backgroundColor: service.listColors,
                }}></div>

              <Accordion type='single' collapsible className='mt-1 md:hidden'>
                <AccordionItem value={service.title} className=''>
                  <AccordionTrigger
                    className={` font-semibold p-2 w-full text-center`} // Added w-full and text-center for centering
                    style={{
                      color: service.textColor,
                      backgroundColor: service.listColors,
                      display: 'flex', // Add flex display for alignment
                      justifyContent: 'center', // Center horizontally
                      alignItems: 'center', // Center vertically
                    }}>
                    Tap untuk lihat detail
                  </AccordionTrigger>

                  <AccordionContent
                    className='rounded-b-sm p-2'
                    style={{
                      backgroundColor: service.listColors,
                    }}>
                    {service.accordionContent.map((item, i) => (
                      <li
                        key={i}
                        className='text-paragraph md:text-sm list-outside list-none text-left text-black/90 leading-relaxed'>
                        {item}
                      </li>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>

        {/* Menampilkan tombol hanya jika showButton true */}
        {showButton && (
          <div className='flex justify-end md:justify-center pt-14'>
            <Button
              className='group bg-primary-dark text-white hover:bg-accent-light hover:text-primary-dark font-medium border border-white hover:border-primary-dark py-5 transition-colors duration-300'
              asChild>
              <Link href='/jasakonstruksi' className='font-semibold text-base'>
                Cek Layanan Unggulan
                <ArrowRight className='scale-125' />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

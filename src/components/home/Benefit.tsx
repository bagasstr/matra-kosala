'use client'

import Image from 'next/image'
import layanan1 from '../../../public/IconLayanan1.png'
import layanan2 from '../../../public/IconLayanan2.png'
import layanan3 from '../../../public/IconLayanan3.png'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CheckSquare, Square } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'PROJECT SELESAI',
    subtitle: 'TEPAT WAKTU',
  },
  {
    title: 'KUALITAS & MUTU',
    subtitle: 'BANGUNAN TERJAGA',
  },
  {
    title: 'HARGA TERBAIK &',
    subtitle: 'HASIL MAKSIMAL',
  },
]

export default function Benefit() {
  // const isMobile = useMediaQuery({ maxWidth: 767 })
  // const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 })
  // const isDesktop = useMediaQuery({ minWidth: 1024 })
  return (
    <>
      {/* {isMobile && <MobileBenefit />}
         {isDesktop && <DesktopBenefit />} */}
      <div className='md:hidden'>
        <MobileBenefit />
      </div>
      <div className='hidden md:block lg:hidden'>
        <TabletBenefit />
      </div>
      <div className='hidden lg:block'>
        <DesktopBenefit />
      </div>
    </>
  )
}

function DesktopBenefit() {
  return (
    <div className='py-12 group relative'>
      <div className='container mx-auto lg:max-w-5xl px-4 relative'>
        {/* Header */}
        <div className='flex justify-center items-center text-center mb-10'>
          <h1 className='text-4xl font-bold bg-primary-light w-full p-2 md:mx-auto text-white uppercase'>
            benefit untuk anda
          </h1>
        </div>

        <div className='grid md:grid-cols-2 gap-8 relative'>
          {/* Left Column - Benefits */}
          <div className='space-y-8'>
            <div className='relative flex items-start'>
              <div className='flex-1'>
                <h3 className='font-semibold text-2xl mb-2  transition-all duration-300'>
                  PERCEPATAN
                </h3>
                <p className='w-[65%] transition-all duration-300'>
                  Penyelesaian pekerjaan dengan standar produktifitas tinggi.
                </p>
                <div className='mt-4 h-2'>
                  <div className='h-full bg-gray-200 group-hover:w-full w-96 transition-all duration-500'></div>
                </div>
              </div>
              <div className='absolute left-[60%] top-0 transition-all duration-500 group-hover:translate-x-16 group-hover:opacity-100 opacity-50'>
                <Image
                  src={layanan1}
                  width={100}
                  height={100}
                  alt='Benefit Matra Kosala'
                  className='transition-transform duration-500 group-hover:translate-x-[-31px]'
                />
              </div>
            </div>

            <div className='relative flex items-start'>
              <div className='flex-1'>
                <h3 className='font-semibold text-2xl mb-2  transition-all duration-300'>
                  SUPPLIER
                </h3>
                <p className='w-[60%] transition-all duration-300'>
                  Support dari Partner Brand untuk menyuplai material unggulan
                  dalam kondisi yang terbaik.
                </p>
                <div className='mt-4 h-2'>
                  <div className='h-full bg-gray-200 group-hover:w-full w-96 transition-all duration-500'></div>
                </div>
              </div>
              <div className='absolute left-[60%] top-0 transition-all duration-500 group-hover:translate-x-16 group-hover:opacity-100 opacity-50'>
                <Image
                  src={layanan2}
                  width={100}
                  height={100}
                  alt='Benefit Matra Kosala'
                  className='transition-transform duration-500 group-hover:translate-x-10'
                />
              </div>
            </div>

            <div className='relative flex items-start'>
              <div className='flex-1'>
                <h3 className='font-semibold text-2xl mb-2  transition-all duration-300'>
                  STRATEGI
                </h3>
                <p className='w-[60%] transition-all duration-300'>
                  Komitmen dan metodologi penghematan biaya, tenaga ahli
                  berpengalaman, dan manajemen yang profesional.
                </p>
                <div className='mt-4 h-2'>
                  <div className='h-full bg-gray-200 group-hover:w-full w-96 transition-all duration-500'></div>
                </div>
              </div>
              <div className='absolute left-[60%] top-0 transition-all duration-500 group-hover:translate-x-16 group-hover:opacity-100 opacity-50'>
                <Image
                  src={layanan3}
                  width={100}
                  height={100}
                  alt='Benefit Matra Kosala'
                  className='transition-transform duration-500 group-hover:translate-x-28'
                />
              </div>
            </div>
          </div>

          {/* Right Column - Cards (Posisi Pojok Kanan) */}
          <div className='absolute top-0 right-0 space-y-8'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className='border-2 border-primary-dark w-[400px] flex items-center p-8 group-hover:bg-indigo-100 transition-all duration-300'>
                <CardContent className='flex items-center space-x-4 p-0'>
                  {/* Square Icon */}
                  <div className='relative text-primary-content w-12 h-12'>
                    <Square
                      size={48}
                      className='absolute group-hover:opacity-0 transition-opacity duration-300'
                    />
                    <CheckSquare
                      size={48}
                      className='absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    />
                  </div>
                  {/* Teks */}
                  <div className='text-left transition-all duration-300'>
                    <h3 className='text-lg font-bold'>{feature.title}</h3>
                    <p className='text-lg font-bold'>{feature.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Teks Tambahan Saat Hover */}
        <div className='mt-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
          <p className='text-2xl font-bold w-full p-2 mx-auto text-primary-dark uppercase'>
            HASIL MAKSIMAL, BEBAN MINIMAL
          </p>
        </div>
      </div>
    </div>
  )
}
function TabletBenefit() {
  return (
    <div className='py-12 group relative'>
      <div className='container mx-auto md:max-w-2xl px-4 relative'>
        {/* Header */}
        <div className='flex justify-center items-center text-center mb-10'>
          <h1 className='text-3xl font-bold bg-primary-light w-full p-2 md:mx-auto text-white uppercase'>
            benefit untuk anda
          </h1>
        </div>

        <div className='grid md:grid-cols-2 gap-4 relative'>
          {/* Left Column - Benefits */}
          <div className='space-y-4'>
            <div className='relative flex items-start'>
              <div className='flex-1'>
                <h3 className='font-semibold text-2xl mb-2  transition-all duration-300'>
                  PERCEPATAN
                </h3>
                <p className='w-[65%] transition-all text-base duration-300'>
                  Penyelesaian pekerjaan dengan standar produktifitas tinggi.
                </p>
                <div className='mt-4 h-2'>
                  <div className='h-full bg-gray-200 group-hover:w-full w-96 transition-all duration-500'></div>
                </div>
              </div>
              <div className='absolute left-[65%] top-0 transition-all duration-500 group-hover:translate-x-16 group-hover:opacity-100 opacity-50'>
                <Image
                  src={layanan1}
                  width={80}
                  height={80}
                  alt='Benefit Matra Kosala'
                  className='transition-transform duration-500 group-hover:translate-x-[-45px]'
                />
              </div>
            </div>

            <div className='relative flex items-start'>
              <div className='flex-1'>
                <h3 className='font-semibold text-2xl mb-2  transition-all duration-300'>
                  SUPPLIER
                </h3>
                <p className='w-[60%] transition-all duration-300'>
                  Support dari Partner Brand untuk menyuplai material unggulan
                  dalam kondisi yang terbaik.
                </p>
                <div className='mt-4 h-2'>
                  <div className='h-full bg-gray-200 group-hover:w-full w-96 transition-all duration-500'></div>
                </div>
              </div>
              <div className='absolute left-[65%] top-0 transition-all duration-500 group-hover:translate-x-16 group-hover:opacity-100 opacity-50'>
                <Image
                  src={layanan2}
                  width={80}
                  height={80}
                  alt='Benefit Matra Kosala'
                  className='transition-transform duration-500 group-hover:translate-x-[-10px]'
                />
              </div>
            </div>

            <div className='relative flex items-start'>
              <div className='flex-1'>
                <h3 className='font-semibold text-2xl mb-2  transition-all duration-300'>
                  STRATEGI
                </h3>
                <p className='w-[60%] transition-all duration-300'>
                  Komitmen dan metodologi penghematan biaya, tenaga ahli
                  berpengalaman, dan manajemen yang profesional.
                </p>
                <div className='mt-4 h-2'>
                  <div className='h-full bg-gray-200 group-hover:w-full w-96 transition-all duration-500'></div>
                </div>
              </div>
              <div className='absolute left-[65%] top-0 transition-all duration-500 group-hover:translate-x-16 group-hover:opacity-100 opacity-50'>
                <Image
                  src={layanan3}
                  width={80}
                  height={80}
                  alt='Benefit Matra Kosala'
                  className='transition-transform duration-500 group-hover:translate-x-10'
                />
              </div>
            </div>
          </div>

          {/* Right Column - Cards (Posisi Pojok Kanan) */}
          <div className='absolute top-0 right-0 space-y-12'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className='border-2 border-primary-dark w-full flex items-center p-8 group-hover:bg-indigo-100 transition-all duration-300'>
                <CardContent className='flex items-center space-x-4 p-0'>
                  {/* Square Icon */}
                  <div className='relative text-primary-content w-8 h-8'>
                    <Square
                      size={32}
                      className='absolute group-hover:opacity-0 transition-opacity duration-300'
                    />
                    <CheckSquare
                      size={32}
                      className='absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    />
                  </div>
                  {/* Teks */}
                  <div className='text-left transition-all duration-300'>
                    <h3 className='text-base font-bold'>{feature.title}</h3>
                    <p className='text-base font-bold'>{feature.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Teks Tambahan Saat Hover */}
        <div className='mt-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
          <p className='text-2xl font-bold w-full p-2 mx-auto text-primary-dark uppercase'>
            HASIL MAKSIMAL, BEBAN MINIMAL
          </p>
        </div>
      </div>
    </div>
  )
}

function MobileBenefit() {
  return (
    <div className='py-12'>
      <div className='container mx-auto w-full px-4'>
        {/* Header */}
        <div className='flex justify-center items-center text-center mb-10'>
          <h1 className='text-3xl font-bold bg-primary-light w-full p-2 md:mx-auto text-white uppercase'>
            untuk anda
          </h1>
        </div>

        <div className='flex flex-col gap-y-8'>
          {/* Left Column - Benefits */}
          <div className=''>
            <h1 className='font-medium text-lg'>PERCEPATAN</h1>
            <div className='flex items-center flex-col gap-y-8 mt-4'>
              <motion.div
                style={{ willChange: 'transform, opacity' }}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className='flex items-center justify-evenly px-2 py-8 bg-gradient-to-r from-transparent to-primary-content/40 w-full'>
                <div className='relative w-14 h-14'>
                  <Image
                    src={layanan1}
                    fill
                    objectFit='contain'
                    alt='layanan1'
                  />
                </div>

                <div className='flex items-center justify-end gap-x-2'>
                  <CheckSquare size={30} />
                  <p className='text-xs w-[7rem] text-primary-content font-semibold uppercase'>
                    project selesai tepat waktu
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
          <div className=''>
            <h1 className='font-medium text-lg'>SUPPLIER</h1>
            <div className='flex items-center flex-col gap-y-8 mt-4'>
              <motion.div
                style={{ willChange: 'transform, opacity' }}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className='flex items-center justify-evenly px-2 py-8 bg-gradient-to-r from-transparent to-primary-light/40 w-full'>
                <div className='relative size-14'>
                  <Image
                    src={layanan2}
                    fill
                    objectFit='contain'
                    alt='layanan1'
                  />
                </div>

                <div className='flex items-center justify-end gap-x-2'>
                  <CheckSquare size={30} />
                  <p className='text-xs w-[7rem] text-primary-light font-semibold uppercase'>
                    KUALITAS & MUTU BANGUNAN TERJAGA
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
          <div className=''>
            <h1 className='font-medium text-lg'>STRATEGI</h1>
            <div className='flex items-center flex-col gap-y-8 mt-4'>
              <motion.div
                style={{ willChange: 'transform, opacity' }}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className='flex items-center justify-evenly px-2 py-8 bg-gradient-to-r from-transparent to-primary-dark/40 w-full'>
                <div className='relative size-14'>
                  <Image
                    src={layanan3}
                    fill
                    objectFit='contain'
                    alt='layanan1'
                  />
                </div>

                <div className='flex items-center justify-end gap-x-2'>
                  <CheckSquare size={30} />
                  <p className='text-xs w-[7rem] text-primary-dark font-semibold uppercase'>
                    Harga TERBAIK & HASIL MAKSIMAL
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Teks Tambahan Saat Hover */}
        <div className='mt-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
          <p className='text-2xl font-bold w-full p-2 mx-auto text-primary-dark uppercase'>
            HASIL MAKSIMAL, BEBAN MINIMAL
          </p>
        </div>
      </div>
    </div>
  )
}

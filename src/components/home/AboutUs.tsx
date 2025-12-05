// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
// import { ImageCarousel } from "../image-carousel";
// import { cn } from "@/lib/utils";
// import { images, texts } from "@/lib/data";

// export default function AboutUs() {
//   const [current, setCurrent] = useState(0); // Slide aktif

//   const handleDotClick = (index: number) => {
//     setCurrent(index); // Perbarui indeks slide aktif
//   };

//   return (
//     <section className="py-24">
//       <div className="container mx-auto max-w-7xl px-4 py-8">
//         <div className="space-y-8">
//           {/* Header Section */}
//           <div className="relative group">
//             {/* Elemen sebelum hover */}
//             <div className="flex md:items-center items-start space-x-4">
//               <div className="w-2 h-12 bg-primary-dark transition-transform duration-500 group-hover:translate-x-2" />
//               <h1 className="text-3xl font-bold text-accent-light uppercase transition-transform duration-500 group-hover:translate-x-4">
//                 Tentang kami
//               </h1>
//             </div>

//             {/* Elemen saat hover */}
//             <h1 className="absolute inset-0 flex items-center justify-center text-3xl font-bold bg-accent-light w-full md:w-[49%]  p-2 mx-auto md:mx-0 text-primary-dark uppercase opacity-0 group-hover:opacity-100 group-hover:animate-slide-in-center transition-opacity duration-500">
//               Tentang kami
//             </h1>
//           </div>

//           {/* Main Content Grid */}
//           <div className="grid lg:grid-cols-2 gap-8">
//             {/* Left Column */}
//             <div className="space-y-4 hidden md:block">
//               <div className="relative h-[300px] w-full">
//                 <Image
//                   src="/about.png"
//                   alt="Construction Site"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="flex justify-end items-center pt-5">
//                 <Button
//                   variant="outline"
//                   className="flex items-center space-x-2 border-2 bg-accent-light border-primary-dark text-primary-dark font-semibold hover:bg-primary-dark hover:text-white"
//                 >
//                   <span>selengkapnya</span>
//                   <ArrowRight className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//             {/* Right Column */}
//             <div className="space-y-6">
//               <div className="hidden md:block">
//                 <h2 className="text-2xl font-bold text-primary-content">
//                   15 TAHUN MELAYANI
//                 </h2>
//                 <p className=" leading-relaxed">
//                   PT MATRA KOSALA DIGDAYA adalah Perusahaan Swasta yang berdiri
//                   pada tahun 2009, berdomisili di Jakarta Barat, dan bergerak
//                   sebagai perusahaan Jasa Konstruksi Umum (General Contractor).
//                 </p>
//               </div>
//               {/* Carousel */}
//               <div className="space-y-4">
//                 <ImageCarousel
//                   images={images}
//                   current={current}
//                   onDotClick={handleDotClick}
//                 />
//                 {/* Teks yang Bergerak Bersama Carousel */}
//                 <div className="space-y-4 w-full hidden md:block">
//                   <div className="flex items-center justify-between bg-primary-content text-xl font-bold w-full p-4 text-white">
//                     <h2 className="text-center w-full">
//                       {texts[current].title}
//                     </h2>
//                     <ArrowRight className="h-6 w-6" />
//                   </div>
//                   <p className="leading-relaxed">{texts[current].content}</p>
//                   {/* Navigasi Dots */}
//                   <div className=" justify-center space-x-2 hidden md:flex">
//                     {images.map((_, index) => (
//                       <button
//                         key={index}
//                         className={cn(
//                           "w-full h-4  transition-all duration-300 focus:outline-none",
//                           current === index
//                             ? "bg-primary-dark"
//                             : "bg-gray-300 hover:bg-gray-400"
//                         )}
//                         onClick={() => handleDotClick(index)}
//                         aria-label={`Go to slide ${index + 1}`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="md:hidden block space-y-5">
//                 <h2 className="text-2xl font-bold text-primary-content">
//                   15 TAHUN MELAYANI
//                 </h2>
//                 <p className="text-gray-600 leading-relaxed">
//                   PT MATRA KOSALA DIGDAYA adalah Perusahaan Swasta yang berdiri
//                   pada tahun 2009, berdomisili di Jakarta Barat, dan bergerak
//                   sebagai perusahaan Jasa Konstruksi Umum (General Contractor).
//                 </p>
//               </div>
//               <div className="flex justify-start items-center pt-5  md:hidden">
//                 <Button
//                   variant="outline"
//                   className="flex items-center space-x-2 border-2 bg-accent-light border-primary-dark text-primary-dark font-semibold hover:bg-primary-dark hover:text-white"
//                 >
//                   <span>selengkapnya ...</span>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react' // Swiper React components
import { Navigation, Pagination, Autoplay } from 'swiper/modules' // Swiper modules
import 'swiper/css' // Swiper styles
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { images, texts } from '@/lib/data'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function AboutUs() {
  const paginationRef = useRef<SwiperRef>(null)
  const swiperRef = useRef<SwiperRef>(null)
  const [current, setCurrent] = useState(0)
  const handlePagination = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index)
      setCurrent(index)
    }
  }
  return (
    <div className='py-12'>
      <div className='container w-full mx-auto md:max-w-2xl lg:max-w-5xl px-4'>
        <div className=''>
          {/* Header Section */}
          <div className='relative group px-4 mb-10 hidden md:hidden lg:block'>
            {/* Elemen sebelum hover */}
            <div className='flex md:items-center items-start space-x-4'>
              <div className='w-2 h-12 bg-primary-dark transition-transform duration-500 group-hover:translate-x-2' />
              <h1 className='text-3xl font-bold text-accent-light uppercase transition-transform duration-500 group-hover:translate-x-4'>
                Tentang kami
              </h1>
            </div>

            {/* Elemen saat hover */}
            <h1 className='absolute inset-0 flex items-center justify-center text-3xl font-bold bg-accent-light w-full md:w-[49%] p-2 mx-auto md:mx-0 text-primary-dark uppercase opacity-0 group-hover:opacity-100 group-hover:animate-slide-in-center transition-opacity duration-500'>
              Tentang kami
            </h1>
          </div>
          <div className='bg-primary-accent mx-4 lg:hidden'>
            <h1 className='text-primary-dark text-center text-2xl font-bold uppercase p-4'>
              TENTANG KAMI
            </h1>
          </div>

          {/* Main Content Grid */}
          <div className='grid lg:grid-cols-2 gap-8 mt-10'>
            {/* Left Column */}
            <div className='space-y-4 hidden md:hidden lg:block lg:px-4'>
              <div className='relative h-[300px] md:w-screen lg:mx-auto lg:w-full'>
                <Image
                  src='/about.png'
                  alt='Construction Site'
                  fill
                  className='object-cover '
                />
              </div>
              <div className='flex justify-end items-center pt-5'>
                <Link href='/profile'>
                  <Button
                    role='button'
                    variant='outline'
                    className='flex items-center gap-x-2 border-2 bg-accent-light border-primary-dark hover:bg-primary-dark text-primary-dark hover:text-white'>
                    <span className='text-base font-semibold'>
                      Selengkapnya
                    </span>
                    <ArrowRight className='scale-125' />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className='space-y-6 w-screen md:w-full'>
              <div className='hidden lg:block'>
                <h2 className='text-heading font-bold text-primary-content md:px-4'>
                  15 TAHUN MELAYANI
                </h2>
                <p className='md:text-base text-paragraph leading-relaxed  mt-4 font-normal md:px-4'>
                  PT MATRA KOSALA DIGDAYA adalah Perusahaan Swasta yang berdiri
                  pada tahun 2009, berdomisili di Jakarta Barat, dan bergerak
                  sebagai perusahaan Jasa Konstruksi Umum (General Contractor).
                </p>
              </div>
              {/* Swiper Carousel */}
              <div className='space-y-4 px-4 flex justify-start flex-col items-start'>
                <div className='w-full flex justify-start'>
                  <div className='w-full h-full flex justify-center flex-col items-center'>
                    <div className='w-full h-full'>
                      <Swiper
                        ref={swiperRef}
                        onSlideChange={(swiper: any) => {
                          setCurrent(swiper.activeIndex)
                        }}
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        centeredSlides={false}
                        //  navigation
                        style={{ margin: '0 0' }}
                        className='w-full h-full mx-0 md:w-[600px] md:h-[400px] lg:w-full'
                        autoplay={false}>
                        {images.map((image, index) => (
                          <SwiperSlide key={index}>
                            <div className='relative aspect-[3/2] h-full md:w-[600px] lg:w-full md:h-[400px]'>
                              <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className='object-bottom'
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    {/* Pagination Mobile */}
                    <div className='space-x-2 mt-4 lg:hidden'>
                      {images.map((_, index) => (
                        <button
                          key={index}
                          className={cn(
                            'rounded-full w-2 h-2 md:w-2 md:h-2  transition-all duration-300 focus:outline-none',
                            current === index
                              ? 'bg-primary-dark'
                              : 'bg-gray-300 hover:bg-gray-400'
                          )}
                          onClick={() => handlePagination(index)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Teks yang Bergerak Bersama Carousel */}
                <div className='space-y-4 w-full hidden lg:block'>
                  <div className='flex items-center justify-between bg-primary-content text-xl font-bold w-full p-4 text-white'>
                    <h2 className='text-center w-full'>
                      {texts[current].title}{' '}
                      {/* Tetap statis untuk setiap slide */}
                    </h2>
                    <ArrowRight className='h-6 w-6' />
                  </div>
                  <p className='leading-relaxed font-normal text-paragraph md:text-base'>
                    {texts[current].content}
                  </p>
                </div>
              </div>
              <div className='justify-center space-x-2 px-4 hidden lg:flex'>
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      'w-full h-1  transition-all duration-300 focus:outline-none',
                      current === index
                        ? 'bg-primary-dark'
                        : 'bg-gray-300 hover:bg-gray-400'
                    )}
                    onClick={() => handlePagination(index)}
                  />
                ))}
              </div>

              <div className='lg:hidden space-y-5 px-4'>
                <h2 className='text-2xl font-bold text-primary-content'>
                  15 TAHUN MELAYANI
                </h2>
                <p className='md:text-base text-paragraph leading-relaxed font-normal '>
                  PT MATRA KOSALA DIGDAYA adalah Perusahaan Swasta yang berdiri
                  pada tahun 2009, berdomisili di Jakarta Barat, dan bergerak
                  sebagai perusahaan Jasa Konstruksi Umum (General Contractor).
                </p>
              </div>
              <div className='flex justify-start px-4 items-center pt-5 md:hidden'>
                <Button
                  variant='outline'
                  className='flex items-center space-x-2 border-2 bg-accent-light border-primary-dark text-primary-dark font-semibold hover:bg-primary-dark hover:text-white'>
                  <span>selengkapnya ...</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

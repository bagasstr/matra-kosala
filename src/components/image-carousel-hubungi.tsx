'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

interface ImageCarouselProps {
  images: { src: string; alt: string }[]
  current: number
  onDotClick: (index: number) => void
}
export function ImageCarouselHubungi({
  images,
  current,
  onDotClick,
}: ImageCarouselProps) {
  return (
    <div className='space-y-4'>
      {/* Carousel */}
      <Carousel setApi={(api) => api?.scrollTo(current)}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className='flex aspect-[16/9] items-center justify-center p-0 relative'>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={100} // Kualitas maksimum
                    className='object-cover'
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots Navigation */}
      <div className='md:hidden flex justify-center space-x-2'>
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none  ${
              current === index
                ? 'bg-primary-dark'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => onDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

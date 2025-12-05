'use client'

import { Card, CardContent } from '@/components/ui/card'
import CountUp from 'react-countup'
import { useEffect, useState } from 'react'

const statsData = [
  { end: 15, suffix: '+', label: 'Tahun Pengalaman', bgClass: 'bg-white' },
  {
    end: 100,
    suffix: '%',
    label: 'Proyek Selesai',
    bgClass: 'bg-accent-light text-primary-dark',
  },
  { end: 99, suffix: '+', label: 'Klien Puas', bgClass: 'bg-white' },
  { end: 21, suffix: '+', label: 'Mitra Kami', bgClass: 'bg-white' },
]

export default function Stats() {
  const [startCount, setStartCount] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('stats-section')
      if (section) {
        const sectionTop = section.getBoundingClientRect().top
        const triggerPoint = window.innerHeight * 0.8 // Trigger ketika 80% viewport
        if (sectionTop <= triggerPoint) {
          setStartCount(true)
        }
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id='stats-section' className='py-24'>
      <div className='container mx-auto w-[65%] md:max-w-2xl lg:max-w-5xl'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {statsData.map((stat, index) => (
            <Card
              key={index}
              className={`md:py-8 py-10 ${stat.bgClass} border-primary-dark border-2`}>
              <CardContent className='flex md:flex-col items-center justify-center gap-x-2'>
                <div className='lg:text-4xl md:text-3xl text-2xl font-bold'>
                  {startCount && (
                    <CountUp
                      start={0}
                      end={stat.end}
                      duration={2}
                      suffix={stat.suffix}
                    />
                  )}
                </div>
                <p className='~text-sm/base md:text-center md:mt-2 font-bold'>
                  {stat.label.split(' ').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

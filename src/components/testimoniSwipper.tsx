'use client'
import type { ITestimoniTable } from '@/types/type'
import CustomCardTesti from './ui/customCardTesti'

export default function TestimoniGrid({
  data,
  isError,
}: {
  data: ITestimoniTable[]
  isError: string | boolean | null
}) {
  return (
    <section className='py-16'>
      <div className='container w-full mx-auto md:max-w-2xl lg:max-w-5xl px-4'>
        <div className='w-full'>
          <div className='flex justify-center items-center bg-primary-light space-x-4 w-full mb-24 md:max-w-sm lg:max-w-lg md:w-full mx-auto md:mx-0'>
            <h1 className='text-3xl font-bold text-center w-full p-2 text-white uppercase'>
              Testimoni
            </h1>
          </div>

          {isError ? (
            <p className='text-center'>{isError}</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {data.map((item: ITestimoniTable, index: number) => (
                <div key={index} className='flex justify-center'>
                  <CustomCardTesti
                    image={item.image}
                    name={item.author}
                    institute={item.company}
                    title={item.title}
                    desc={item.testi}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

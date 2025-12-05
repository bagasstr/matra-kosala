import Image from 'next/image'

export default function GambarProduk({ row }: { row: string }) {
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
   return (
      <div className='relative w-16 h-16'>
         <Image
            src={`${baseUrl}${row}`}
            fill
            className='object-cover'
            quality={100}
            alt=''
         />
      </div>
   )
}

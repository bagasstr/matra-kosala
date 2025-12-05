import Image from 'next/image'
import Kantor from '../../public/kantor.png'

interface BannerProps {
  title: string // Properti untuk teks judul
}

export default function HeaderArtikel() {
  return (
    <div className='flex justify-center items-center lg:justify-start space-x-4 text-center mb-10'>
      <h1 className='text-4xl font-bold bg-primary-light w-full p-2 mx-auto text-white uppercase lg:w-[50%] lg:mx-0'>
        Berita & Artikel
      </h1>
    </div>
  )
}

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Building } from 'lucide-react'

const imageshubungi = [
  '/layanan-page-3.png',
  '/layanan-page-2.png',
  '/layanan-page-1.png',
]

const textshubungi = [
  { title: 'Konstruksi Gedung Bangunan' },
  { title: 'Desain Bangunan' },
  { title: 'Rencana Anggaran Biaya' },
]
const textshubungis = [
  { title: 'Persiapan,Struktur,Arsitektur,MEP,Landscape,Renovasi' },
  { title: 'Gambar Kerja , Desain 3D' },
  { title: 'Rencana Mutu , Perhitungan Biaya' },
]

export default function HeaderLayanan() {
  return (
    <section className='py-24'>
      <div className='container px-4 md:max-w-2xl lg:max-w-5xl mx-auto'>
        {/* Header */}
        <div className='flex justify-center bg-accent-light lg:bg-transparent lg:justify-end items-end mb-10 w-full'>
          <h1 className='text-2xl font-bold p-2 lg:w-fit lg:px-4 lg:bg-primary-accent text-primary-dark uppercase'>
            LAYANAN UNGGULAN
          </h1>
        </div>

        {/* Services Grid */}
        <div className='grid grid-cols-12 md:grid-cols-8 lg:grid-cols-12 gap-6 md:grid-rows-1'>
          {/* Left Column */}
          <div className='col-span-12 md:col-span-3 lg:col-span-5 space-y-6'>
            {/* Desain Bangunan Card */}
            <Card className=''>
              <CardContent className='p-0'>
                <div className='relative aspect-square group overflow-hidden'>
                  {/* Gambar */}
                  <Image
                    src={imageshubungi[0] || '/path-to-default-image.jpg'}
                    fill
                    alt={textshubungi[0]?.title || 'Default Image'}
                    className='w-auto h-auto object-cover'
                  />

                  {/* Overlay dengan "Lihat Detail..." */}
                  <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:hidden'>
                    <span className='text-white text-base font-bold'>
                      Lihat detail...
                    </span>
                  </div>

                  {/* Overlay dan Text saat hover */}
                  <div className='absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:bg-opacity-70 group-hover:opacity-100'>
                    <ul className='list-disc list-inside space-y-1'>
                      {textshubungis[0]?.title.split(',').map((item, index) => (
                        <li
                          key={index}
                          className='text-white text-xl font-bold'>
                          {item.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className='flex items-center justify-between bg-primary-light text-xl font-bold w-full p-4 text-white mt-4'>
                  <h2 className='text-center w-full'>
                    {textshubungi[0]?.title || 'Default Title'}
                  </h2>
                </div>
              </CardContent>
            </Card>

            {/* Rencana Anggaran Card */}
            <Card className=''>
              <CardContent className='p-0'>
                <div className='relative aspect-square group overflow-hidden'>
                  {/* Gambar */}
                  <Image
                    src={imageshubungi[2] || '/path-to-default-image.jpg'}
                    alt={textshubungi[2]?.title || 'Default Image'}
                    fill
                    className='object-cover'
                  />

                  {/* Overlay dengan "Lihat Detail..." */}
                  <div className='absolute inset-0 group-hover:hidden bg-black bg-opacity-40 flex items-center justify-center'>
                    <span className='text-white text-base font-bold'>
                      Lihat detail...
                    </span>
                  </div>

                  {/* Overlay dan Text saat hover */}
                  <div className='absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:bg-opacity-70 group-hover:opacity-100'>
                    <ul className='list-disc list-inside space-y-1'>
                      {textshubungis[2]?.title.split(',').map((item, index) => (
                        <li
                          key={index}
                          className='text-white text-xl font-bold'>
                          {item.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className='flex items-center justify-between bg-primary-light text-xl font-bold w-full p-4 text-white mt-4'>
                  <h2 className='text-center w-full'>
                    {textshubungi[2]?.title || 'Default Title'}
                  </h2>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Konstruksi Gedung */}
          <div className='col-span-12 md:col-span-5 lg:col-span-7'>
            <Card className='h-full overflow-hidden'>
              <div className='col-span-12 lg:col-span-7'>
                <Card className=''>
                  <CardContent className='p-0'>
                    <div className='relative aspect-square md:aspect-[3/2] lg:aspect-square group overflow-hidden'>
                      {/* Gambar */}
                      <Image
                        src={imageshubungi[1] || '/path-to-default-image.jpg'}
                        alt={textshubungi[1]?.title || 'Default Image'}
                        fill
                        className='w-full h-auto object-cover'
                      />

                      {/* Overlay dengan "Lihat Detail..." */}
                      <div className='absolute inset-0 group-hover:hidden bg-black bg-opacity-40 flex items-center justify-center'>
                        <span className='text-white text-base font-bold'>
                          Lihat detail...
                        </span>
                      </div>

                      {/* Overlay dan Text saat hover */}
                      <div className='absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:bg-opacity-70 group-hover:opacity-100'>
                        <ul className='list-disc list-inside space-y-1'>
                          {textshubungis[1]?.title
                            .split(',')
                            .map((item, index) => (
                              <li
                                key={index}
                                className='text-white text-xl font-bold'>
                                {item.trim()}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    <div className='flex items-center justify-between bg-primary-content text-xl font-bold w-full p-4 text-white mt-4'>
                      <h2 className='text-center w-full'>
                        {textshubungi[1]?.title || 'Default Title'}
                      </h2>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <CardContent className='p-0 h-full'>
                <div className='h-full'>
                  <div className='flex flex-col justify-between py-4'>
                    <div className='space-y-5'>
                      <h2 className='text-base'>
                        Percayakan proyek konstruksi Anda kepada kami. Dengan
                        pengalaman lebih dari 15 tahun, kami menawarkan layanan
                        unggulan seperti :
                      </h2>
                      <ul className='list-disc w-full list-outside space-y-1 text-base font-semibold text-primary-dark ml-8'>
                        <li>Desain bangunan yang kreatif</li>
                        <li>Mutu dan biaya yang optimal</li>
                        <li>Pelaksanaan Konstruksi yang profesional</li>
                      </ul>
                      <h2 className='text-base'>
                        Kami akan memandu Anda dari tahap awal hingga akhir
                        proyek, memastikan hasil akhir yang sesuai dengan
                        harapan Anda. Nikmati proses pembangunan yang lancar dan
                        bebas dari kerumitan
                      </h2>
                      <div className='md:pt-0 pt-9 flex justify-end md:justify-start'>
                        <Link
                          href='https://wa.me/6285697093044?text=Halo,%20saya%20ingin%20memulai%20proyek%20dengan%20Matra%20Kosala.%20Bisakah%20saya%20mendapatkan%20informasi%20lebih%20lanjut?'
                          target='_blank'
                          rel='noopener noreferrer'>
                          <Button className='bg-primary-dark text-white hover:bg-accent-light hover:text-primary-dark font-medium border-2 border-transparent hover:border-primary-dark transition-colors duration-300'>
                            <Building className='h-4 w-4 mr-2' />
                            Mulai Proyek Anda
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

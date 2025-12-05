import Image from 'next/image'
import Marquee from 'react-fast-marquee'

interface ClientProps {
  heading?: string
}
export default function Client({ heading = '' }: ClientProps) {
  const clients = [
    { src: '/MUI.png', alt: 'Logo 1' },
    { src: '/PUPR.png', alt: 'Logo 2' },
    { src: '/RRI.png', alt: 'Logo 3' },
    { src: '/KEMENKES.png', alt: 'Logo 4' },
    { src: '/BRI.png', alt: 'Logo 5' },
    { src: '/TRAD.png', alt: 'Logo 6' },
    { src: '/ABIPRAYA.png', alt: 'Logo 7' },
  ]

  return (
    <div className='py-12'>
      <div className='container mx-auto md:max-w-2xl lg:max-w-5xl px-4'>
        <div className='flex justify-center items-center space-x-4  text-center mb-10'>
          <h1 className='text-3xl font-bold bg-primary-dark w-full p-2 mx-auto text-white uppercase'>
            Klien Kami
          </h1>
        </div>
        <p className='text-center md:text-2xl text-lg mb-14 font-medium'>
          Dipercaya oleh Mereka, Dipercaya oleh Anda
        </p>
        <Marquee gradient={false} speed={50}>
          {clients.map((client, index) => (
            <div
              key={index}
              className='flex items-center justify-center md:mx-14 mx-6 border bg-white p-2 shadow-md'>
              <div className='w-20 h-20 relative'>
                <Image
                  src={client.src}
                  alt={client.alt}
                  fill
                  className='object-contain'
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  )
}

import Banner from '@/components/home/Banner'
import Client from '@/components/home/Client'
import Faq from '@/components/home/Faq'
import Services from '@/components/home/Services'
import Stats from '@/components/home/Stats'
import Testimoni from '@/components/home/Testimoni'
import Hubungi from '@/components/home/Hubungi'
import AboutUs from '@/components/home/AboutUs'
import Benefit from '@/components/home/Benefit'
import ModalPenawaran from '@/components/modalPenawaran'
import ModalCompro from '@/components/modalCompro'
import PortofolioContent from '@/components/home/Portofolio'
import '../globals.css'

export default function Home() {
  return (
    <>
      <ModalPenawaran submit='Kirim' />
      <ModalCompro />
      <Banner />
      <Stats />
      <div className='h-1 bg-primary-light max-w-[1000px] md:mx-auto mx-4 '></div>
      <AboutUs />
      <div className='h-1 bg-primary-light max-w-[1000px] md:mx-auto mx-4 '></div>
      <Services showDescription={false} />
      <div className='h-1 bg-primary-light max-w-[1000px] md:mx-auto mx-4 '></div>
      <Client heading='Klien Kami' />
      <div className='h-1 bg-primary-light max-w-[1000px] md:mx-auto mx-4 '></div>
      <PortofolioContent heading='Portofolio Kami' />
      <div className='h-1 bg-primary-light max-w-[1000px] md:mx-auto mx-4 '></div>
      <Benefit />
      <div className='h-1 bg-primary-light max-w-[1000px] md:mx-auto mx-4 '></div>
      <Testimoni />
      <div className='h-1 bg-primary-light max-w-[1000px] md:mx-auto mx-4 '></div>
      <Hubungi />
      <div className='h-1 bg-primary-light max-w-[1000px] md:mx-auto mx-4 '></div>
      <Faq />
    </>
  )
}

import { Provider } from 'jotai'
import Footer from '../Footer'
import ModalPenawaran from '../modalPenawaran'
import Navbar from '../Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='max-h-[100dvh] flex flex-col'>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

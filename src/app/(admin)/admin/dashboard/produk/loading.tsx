import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'

const Loading = () => {
   return (
      <div className='flex items-center justify-center min-h-[400px]'>
         <LoaderCircle className='animate-spin ' />
      </div>
   )
}
export default Loading

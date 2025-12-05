import CustomCardTesti from './customCardTesti'
import { Skeleton } from './skeleton'

export default function SkeletonTesti() {
   return (
      <div className='grid grid-cols-1 md:grid-cols-2 items-center w-screen md:justify-between gap-x-4'>
         <div className='flex items-center px-4 gap-x-4'>
            <div className='w-fit'>
               <div className='flex gap-x-2'>
                  <Skeleton className='w-16 h-20' />
                  <Skeleton className='w-24 h-20' />
               </div>
               <Skeleton className='w-full h-14 mt-2' />
            </div>
            <div className='w-full space-y-4'>
               <Skeleton className='w-[150px] h-4' />
               <Skeleton className='w-full h-2 mt-2' />
               <Skeleton className='w-full h-3' />
               <Skeleton className='w-full h-2' />
               <Skeleton className='w-full h-2' />
            </div>
         </div>
         <div className='items-center hidden md:flex w-full gap-x-4'>
            <div className='w-fit'>
               <div className='flex gap-x-2'>
                  <Skeleton className='w-16 h-20' />
                  <Skeleton className='w-24 h-20' />
               </div>
               <Skeleton className='w-full h-14 mt-2' />
            </div>
            <div className='w-full space-y-4'>
               <Skeleton className='w-[150px] h-4' />
               <Skeleton className='w-full h-2 mt-2' />
               <Skeleton className='w-full h-3' />
               <Skeleton className='w-full h-2' />
               <Skeleton className='w-full h-2' />
            </div>
         </div>
      </div>
   )
}

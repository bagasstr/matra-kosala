'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import '@/app/nprogress.css'
const ProgressBars = ({ children }: { children: React.ReactNode }) => {
   return (
      <>
         {children}
         <ProgressBar
            height='4px'
            color='#000'
            memo
            options={{
               barSelector: '#nprogress .bar',
               showSpinner: false,
               trickle: false,
               easing: 'ease-in',
               speed: 600,
            }}
            shallowRouting
         />
      </>
   )
}

export default ProgressBars

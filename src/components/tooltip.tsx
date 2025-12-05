import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Info } from 'lucide-react'

export default function TooltipComponent({ text }: { text: string }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Info className='size-5 text-primary-dark' />
      </PopoverTrigger>
      <PopoverContent className='text-xs w-[50%] mx-auto bg-primary-accent text-primary-dark/50 rounded-none'>
        {text}
      </PopoverContent>
    </Popover>
  )
}

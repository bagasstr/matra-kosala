import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'

const StepThree = () => {
  const { control } = useFormContext()
  return (
    <>
      <div className='px-4 space-y-8'>
        <div className=''>
          <Label className='uppercase text-lg font-bold opacity-80 subpixel-antialiased'>
            5. Data Vendor
          </Label>
          {/* Radio Group untuk memilih tipe pengiriman */}
          <div className='space-y-4 mt-8'>
            <FormField
              name='namaPerusahaan'
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn('after:content-["*"] after:text-red-500')}>
                    Nama Perusahaan
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='namaPic'
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn('after:content-["*"] after:text-red-500')}>
                    Nama PIC
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='whatsapp'
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn('after:content-["*"] after:text-red-500')}>
                    WhatsApp
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default StepThree

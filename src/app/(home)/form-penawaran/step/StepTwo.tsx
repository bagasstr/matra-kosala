import { useFormContext, Controller } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Info } from 'lucide-react'
import { useEffect } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const TIPE_PENGIRIMAN = [
  { id: 1, name: 'franco', title: 'FRANCO' },
  { id: 2, name: 'loco', title: 'LOCO' },
]
const TIPE_PAJAK = [
  { id: 1, value: 'INCLPPN', title: 'Include PPN 11%' },
  { id: 2, value: 'EXCLPPN', title: 'Exlude PPN 11%' },
  { id: 3, value: 'NONPPN', title: 'Non-PPN' },
]
const TIPE_PEMBAYARAN = [
  { id: 1, value: 'CBD', title: 'Cash Before Delivery' },
  { id: 2, value: 'COD', title: 'Cash On Delivery' },
  { id: 3, value: 'TEMPO', title: 'TEMPO' },
  { id: 4, value: 'LAINNYA', title: 'LAINNYA' },
]
export default function StepTwo() {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext()
  const selectedPengiriman = watch('spesifikPengiriman.tipePengiriman')
  const selectedPembayaran = watch('pembayaran.tipePembayaran')
  watch(['tipePajak', 'jadwalMuat'])

  // Reset lokasiPengiriman jika pengguna mengubah tipe pengiriman
  // useEffect(() => {
  //   setValue('spesifikPengiriman.lokasiPengiriman', '') // Kosongkan input saat opsi berubah
  // }, [setValue])

  return (
    <div className='px-4 space-y-8'>
      <div className=''>
        <Label className='uppercase text-lg font-bold opacity-80 subpixel-antialiased'>
          2. Pengiriman
        </Label>
        {/* Radio Group untuk memilih tipe pengiriman */}
        <div className='space-y-4 mt-8'>
          <Controller
            name='spesifikPengiriman.tipePengiriman'
            control={control}
            render={({ field, fieldState }) => (
              <>
                <FormLabel>Tipe Pengiriman</FormLabel>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value)
                    selectedPengiriman === 'FRANCO' &&
                      setValue('spesifikPengiriman.lokasiPengiriman', '')
                    selectedPengiriman === 'LOCO' &&
                      setValue('spesifikPengiriman.lokasiPengiriman', '')
                  }}
                  value={field.value}
                  className=''>
                  {TIPE_PENGIRIMAN.map((item) => (
                    <div key={item.id} className='flex items-start gap-3'>
                      <RadioGroupItem value={item.title} id={item.name} />
                      <Label htmlFor={item.name} className='font-normal'>
                        {item.title}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </>
            )}
          />
          <FormField
            name='spesifikPengiriman.lokasiPengiriman'
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='text'
                    {...field}
                    placeholder='Area (Ex. Jabodetabek)'
                    className={`border-2 rounded-md px-3 py-2 focus:ring-2 ${
                      selectedPengiriman ? '' : 'border-gray-300 text-gray-400'
                    }`}
                    disabled={!selectedPengiriman}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='spesifikPengiriman.jadwalMuat'
            control={control}
            render={({ field }) => (
              <FormItem className=''>
                <div className='flex items-center gap-1 group w-fit'>
                  <FormLabel
                    className={cn('after:content-["*"] after:text-red-500')}>
                    Jadwal Muat on Truck
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger className=' text-blue-500'>
                      <Info size={16} />
                    </PopoverTrigger>
                    <PopoverContent className='w-72 text-sm text-opacity-40 font-normal backdrop-blur-xl'>
                      estimasi paling lambat berapa lama item masuk pengiriman
                      setelah po rilis
                    </PopoverContent>
                  </Popover>
                </div>
                <FormControl className=''>
                  <div className='relative flex items-center'>
                    <Input {...field} className='' />
                    <p className='absolute right-4 text-foreground/80 font-normal'>
                      Setelah PO Rilis
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className=''>
        <Label className='uppercase text-lg font-bold opacity-80 subpixel-antialiased'>
          3. Pajak
        </Label>
        <div className='space-y-4 mt-8'>
          <Controller
            name='tipePajak'
            control={control}
            render={({ field, fieldState }) => (
              <>
                <div className='flex items-center gap-1 group w-fit'>
                  <FormLabel
                    className={cn('after:content-["*"] after:text-red-500')}>
                    Tipe Pajak
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger className=' text-blue-500'>
                      <Info size={16} />
                    </PopoverTrigger>
                    <PopoverContent className='w-72 text-sm text-opacity-40 font-normal backdrop-blur-xl'>
                      menentukan apakah harga item sudah termasuk pajak atau
                      belum
                    </PopoverContent>
                  </Popover>
                </div>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className=''>
                  {TIPE_PAJAK.map((item) => (
                    <div key={item.id} className='flex items-start gap-3'>
                      <RadioGroupItem
                        value={item.value}
                        id={item.value}
                        className=''
                      />
                      <Label htmlFor={item.value} className='font-normal'>
                        {item.title}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </>
            )}
          />
        </div>
      </div>
      <div className=''>
        <Label className='uppercase text-lg font-bold opacity-80 subpixel-antialiased'>
          3. Pembayaran
        </Label>
        <div className='space-y-4 mt-8'>
          <Controller
            name='pembayaran.tipePembayaran'
            control={control}
            render={({ field, fieldState }) => (
              <>
                <div className='flex items-center gap-1 group w-fit'>
                  <FormLabel
                    className={cn('after:content-["*"] after:text-red-500')}>
                    Term of Payment
                  </FormLabel>
                </div>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value)
                    selectedPembayaran === 'TEMPO' &&
                      setValue('pembayaran.tempo', '')
                    selectedPembayaran === 'LAINNYA' &&
                      setValue('pembayaran.lainnya', '')
                  }}
                  value={field.value}
                  className=''>
                  {TIPE_PEMBAYARAN.map((item) => (
                    <div key={item.id} className='flex items-start gap-3'>
                      <RadioGroupItem
                        value={item.value}
                        id={item.value}
                        className=''
                      />
                      <Label htmlFor={item.value} className='font-normal'>
                        {item.title}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </>
            )}
          />
          {selectedPembayaran === 'TEMPO' ? (
            <FormField
              name='pembayaran.tempo'
              control={control}
              render={({ field }) => (
                <FormItem className=''>
                  <FormControl className=''>
                    <div className='relative flex items-center'>
                      <Input
                        type='text'
                        {...field}
                        placeholder='14 Hari'
                        className=''
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : selectedPembayaran === 'LAINNYA' ? (
            <FormField
              name='pembayaran.lainnya'
              control={control}
              render={({ field }) => (
                <FormItem className=''>
                  <FormControl className=''>
                    <div className='relative flex items-center'>
                      <Input
                        type='text'
                        {...field}
                        placeholder='Ex. DP 30%, sisa setelah 14 hari'
                        className=''
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

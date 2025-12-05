'use client'

import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { formScheme, TFormScheme } from '@/lib/shcemeZod'

// export const dynamic = 'force-dynamic'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import StepOne from './step/StepOne'
// import dynamic from 'next/dynamic'
// const StepOne = dynamic(() => import('./step/StepOne'), { ssr: false })
import StepTwo from './step/StepTwo'
import StepThree from './step/StepThree'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useAtomValue } from 'jotai'
import { fileName } from '@/hooks/jotaiHooks'
import { toast } from 'sonner'
import { clientEnv } from '@/lib/client'

export default function MultiForm() {
  const [step, setStep] = useState(0)
  const filename = useAtomValue(fileName)

  const handleField: boolean =
    typeof window !== 'undefined' &&
    sessionStorage.getItem('buttonField') === 'true'

  useEffect(() => {
    if (handleField) {
      form.trigger('varian') // Validasi hanya untuk field varian
    }
  }, [handleField])
  const form = useForm<TFormScheme>({
    resolver: zodResolver(formScheme(handleField, filename)),
    mode: 'onChange',
    defaultValues: {
      namaProduk: '',
      document: null,
      varian: [
        {
          namaVarian: '',
          hargaDiskon: '',
          hargaSatuan: '',
          minPembelian: '',
          satuanProduk: 'PCS',
          spesifikVarian: '',
        },
      ],
      spesifikPengiriman: {
        tipePengiriman: undefined,
        lokasiPengiriman: '',
        jadwalMuat: undefined,
      },
      tipePajak: undefined,
      namaPerusahaan: '',
      namaPic: '',
      whatsapp: '',
      pembayaran: {
        tipePembayaran: undefined,
        tempo: '',
        lainnya: '',
      },
    },
  })

  async function onSubmit(data: TFormScheme) {
    const formData = new FormData()
    if (data.document) {
      formData.append('document', data.document?.[0] as File)
    }
    console.log(formData)
    const produk = JSON.stringify({
      namaProduk: data.namaProduk,
      pengiriman: {
        jadwalMuat: Number(data.spesifikPengiriman.jadwalMuat),
        tipePengiriman: data.spesifikPengiriman.tipePengiriman,
        lokasiPengiriman: data.spesifikPengiriman.lokasiPengiriman,
      },
      pajak: {
        tipePajak: data.tipePajak,
      },
      pembayaran: {
        tipePembayaran: data.pembayaran.tipePembayaran,
        tempo: data.pembayaran.tempo,
        lainnya: data.pembayaran.lainnya,
      },
      varian: data.varian.map((v) => ({
        namaVarian: v.namaVarian,
        spesifikVarian: v.spesifikVarian,
        hargaSatuan: Number(v.hargaSatuan),
        hargaDiskon: Number(v.hargaDiskon) ?? '',
        minPembelian: Number(v.minPembelian),
        satuanProduk: v.satuanProduk,
      })),
    })

    formData.append('produk', produk)

    // Informasi vendor
    formData.append('namaPerusahaan', data.namaPerusahaan)
    formData.append('pic', data.namaPic)
    formData.append('whatsapp', data.whatsapp)

    try {
      const response = await fetch(`${clientEnv.API_URL}/vendor`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
        body: formData,
      })

      if (!response.ok) throw new Error('Gagal mengirim data')

      toast.success('Form berhasil dikirim!')
    } catch (error) {
      toast.error('Terjadi kesalahan saat mengirim form')
    }
  }

  const steps = [
    {
      title: '1. Product Anda',
      component: <StepOne />,
      fields: ['namaProduk', 'document', 'varian'],
    },
    {
      title: '2. Pengiriman',
      component: <StepTwo />,
      fields: ['spesifikPengiriman', 'pembayaran', 'jadwalMuat', 'tipePajak'],
    },
    {
      title: '3. Data Vendor',
      component: <StepThree />,
      fields: ['namaPerusahaan', 'namaPic', 'whatsapp'],
    },
  ]

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent form submission
    const currentStep = steps[step]
    let isValid = true
    // Validate current step fields
    for (const field of currentStep.fields) {
      if (field === 'varian') {
        const values = form.getValues('varian')
        const varianPromises = values.map(async (_, index) => {
          const fieldsToValidate = [
            ...(handleField ? [`varian.${index}.namaVarian`] : []),
            `varian.${index}.hargaSatuan`,
            `varian.${index}.minPembelian`,
            `varian.${index}.spesifikVarian`,
          ]

          const results = await Promise.all(
            fieldsToValidate.map((field) =>
              form.trigger(field as keyof TFormScheme)
            )
          )
          return results.every((result) => result)
        })

        const varianResults = await Promise.all(varianPromises)
        isValid = isValid && varianResults.every((result) => result)
      } else {
        const fieldValid = await form.trigger(field as keyof TFormScheme)
        isValid = isValid && fieldValid
      }
    }

    if (isValid) {
      setStep((prev) => prev + 1)
    }
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 py-8'>
          {steps[step].component}
          <div
            className={cn(
              'px-4 w-full',
              step === 0
                ? 'flex items-center justify-between'
                : 'flex justify-between'
            )}>
            {step < steps.length - 2 ? (
              <Link href='/'>
                <Button
                  type='button'
                  variant={'outline'}
                  className='font-medium text-muted-foreground'>
                  Keluar
                </Button>
              </Link>
            ) : (
              <Button
                type='button'
                variant={'outline'}
                className={cn(
                  'font-medium text-muted-foreground',
                  step === 0 && 'hidden'
                )}
                onClick={() => setStep((prev) => Math.max(0, prev - 1))}
                disabled={step === 0}>
                Previous
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button
                type='button'
                className='bg-primary-dark font-medium hover:bg-primary-accent'
                onClick={handleNext}>
                Selanjutnya
              </Button>
            ) : (
              <Button
                type='submit'
                className='bg-primary-dark font-medium hover:bg-primary-accent'>
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </FormProvider>
  )
}

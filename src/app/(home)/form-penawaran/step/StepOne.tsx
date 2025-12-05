'use client'
import TooltipComponent from '@/components/tooltip'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { fileName, hanldleField } from '@/hooks/jotaiHooks'
import { cn } from '@/lib/utils'
import { atom, useAtom } from 'jotai'
import { SquareMinus, SquarePlus, Upload } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import type { z } from 'zod'

const StepOne = () => {
  const { control, trigger, getValues } = useFormContext()
  const [open, setOpen] = useAtom(hanldleField)
  const [filename, setFilename] = useAtom(fileName)
  const [error, setError] = useState('')
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'varian',
  })
  setFilename(getValues('document')?.[0]?.name)

  return (
    <section className=''>
      <div className='px-4'>
        <div className=''>
          <Label className='uppercase text-lg font-bold opacity-80 subpixel-antialiased'>
            1. Produk Anda
          </Label>
          <div className='mt-8'>
            <div className=''>
              <div className='space-y-4'>
                <FormField
                  name='namaProduk'
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={cn(
                          'after:content-["*"] after:text-red-500'
                        )}>
                        Nama Produk
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Nama Produk'
                          className='focus-visible:ring-primary-dark rounded-none'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='document'
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='opacity-80 font-semibold gap-x-2 flex items-center'>
                        Upload Penawaran{' '}
                        <span className='text-muted-foreground text-xs font-normal'>
                          opsional
                        </span>
                        <TooltipComponent text='Upload file dokumen penawaran. Format file harus berupa .pdf' />
                      </FormLabel>
                      <FormControl>
                        <div className='flex items-center gap-x-4'>
                          <div className='relative top-0 left-0 right-0 bottom-0 flex items-center cursor-pointer py-2 border border-input w-[50%] overflow-x-hidden'>
                            <Input
                              type='file'
                              accept='application/pdf'
                              className='rounded-none absolute opacity-0 cursor-pointer w-full h-full'
                              onChange={(e) => {
                                trigger('document')
                                field.onChange(e.target.files)
                              }}
                            />
                            <p className='px-4 text-muted-foreground'>
                              <span className='text-muted-foreground'>
                                {filename || 'Pilih File (.pdf)'}
                              </span>
                            </p>
                          </div>
                          {filename ? (
                            <Button
                              type='button'
                              onClick={() => field.onChange(undefined)}>
                              Hapus File
                            </Button>
                          ) : (
                            <Upload className='text-primary-dark' />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=''>
                <div className=''>
                  {fields.map((field: any, index: number) => (
                    <div className='mt-4' key={field.id}>
                      {index === 0 && (
                        <>
                          <Button
                            type='button'
                            className='bg-transparent shadow-none text-primary-dark hover:bg-transparent'
                            onClick={() => {
                              if (open) {
                                if (fields.length > 1) {
                                  for (let i = fields.length - 1; i > 0; i--) {
                                    remove(i)
                                  }
                                }
                                setOpen(false)
                              } else {
                                setOpen(true)
                              }
                            }}>
                            {open ? (
                              <>
                                <SquareMinus />
                                Tutup Varian {index + 1}
                              </>
                            ) : (
                              <>
                                <SquarePlus />
                                Tambah Varian {index + 1}
                              </>
                            )}
                          </Button>
                          <div className='space-y-4 '>
                            {open && (
                              <FormField
                                name={`varian.${index}.namaVarian`}
                                control={control}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel
                                      className={cn(
                                        'after:content-["*"] after:text-red-500'
                                      )}>
                                      Nama Varian
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type='text'
                                        className={cn('')}
                                        placeholder='nama varian material'
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                            <FormField
                              name={`varian.${index}.spesifikVarian`}
                              control={control}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel
                                    className={cn(
                                      'after:content-["*"] after:text-red-500'
                                    )}>
                                    Spesifikasi Varian
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      className='h-[100px]'
                                      placeholder='Ukuran 2 inch Panjang 2 meter'
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className='grid grid-cols-2 gap-x-4'>
                              <FormField
                                name={`varian.${index}.hargaSatuan`}
                                control={control}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel
                                      className={cn(
                                        'after:content-["*"] after:text-red-500'
                                      )}>
                                      Harga Satuan
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder='Rp.10.000'
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                name={`varian.${index}.satuanProduk`}
                                control={control}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Satuan Produk</FormLabel>
                                    <FormControl>
                                      <Input
                                        type='text'
                                        placeholder='PCS, KG, dst'
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className='grid grid-cols-2 gap-x-4'>
                              <FormField
                                name={`varian.${index}.hargaDiskon`}
                                control={control}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Harga Diskon</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder='Rp.5.000'
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                name={`varian.${index}.minPembelian`}
                                control={control}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel
                                      className={cn(
                                        'after:content-["*"] after:text-red-500'
                                      )}>
                                      Min. Pembelian
                                    </FormLabel>
                                    <FormControl>
                                      <div className='flex items-center relative'>
                                        <Input
                                          className=''
                                          placeholder='1, 2, 3, dst'
                                          {...field}
                                        />
                                        <span className='absolute right-0 mr-4'>
                                          Sat
                                        </span>
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                {fields.map((field: any, index: number) => (
                  <div className='mt-8' key={field.id}>
                    {index >= 1 && (
                      <Button
                        className='bg-transparent shadow-none text-primary-dark hover:bg-transparent'
                        onClick={() => remove(index)}>
                        <SquareMinus />
                        Tutup Varian {index + 1}
                      </Button>
                    )}
                    {/* saat varian lebih dari 1 menampilkan semua field varian, namaVarian, spesifikasi varian, harga satuan, satuan produk, harga diskon, min pembelian*/}
                    {index >= 1 && (
                      <div className=''>
                        <FormField
                          name={`varian.${index}.namaVarian`}
                          control={control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nama Varian</FormLabel>
                              <FormControl>
                                <Input type='text' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name={`varian.${index}.spesifikVarian`}
                          control={control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Spesifikasi Varian</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder='Ukuran 2 inch Panjang 2 meter'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className='flex items-center gap-x-4'>
                          <FormField
                            name={`varian.${index}.hargaSatuan`}
                            control={control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Harga Satuan</FormLabel>
                                <FormControl>
                                  <Input
                                    type='text'
                                    placeholder='Rp.10.000'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            name={`varian.${index}.satuanProduk`}
                            control={control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Satuan Produk</FormLabel>
                                <FormControl>
                                  <Input
                                    type='text'
                                    placeholder='PCS, KG, dst'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='flex items-center gap-x-4'>
                          <FormField
                            name={`varian.${index}.hargaDiskon`}
                            control={control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Harga Diskon</FormLabel>
                                <FormControl>
                                  <Input
                                    type='text'
                                    placeholder='Rp.5.000'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            name={`varian.${index}.minPembelian`}
                            control={control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Min. Pembelian</FormLabel>
                                <FormControl>
                                  <div className='flex items-center relative'>
                                    <Input
                                      type='text'
                                      className=''
                                      placeholder='1, 2, 3, dst'
                                      {...field}
                                    />
                                    <span className='absolute right-0 mr-4'>
                                      Sat
                                    </span>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {open && (
                <Button
                  type='button'
                  className='bg-transparent shadow-none text-primary-dark hover:bg-transparent'
                  onClick={() =>
                    append({
                      namaVarian: '',
                      spesifikVarian: '',
                      hargaSatuan: '',
                      satuanProduk: 'PCS',
                      hargaDiskon: '',
                      minPembelian: '',
                    })
                  }>
                  <SquarePlus />
                  Tambah Varian {fields.length + 1}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default StepOne

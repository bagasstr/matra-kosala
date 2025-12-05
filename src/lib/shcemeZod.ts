import { z } from 'zod'

const formScheme = (handleField: boolean, filename: string) => {
  const pengirimanScheme = z
    .object({
      tipePengiriman: z.enum(['FRANCO', 'LOCO'], {
        required_error: 'Silahkan pilih tipe pengiriman',
      }),
      lokasiPengiriman: z.string(),
      jadwalMuat: z.string({
        required_error: 'Jadwal muat harus diisi',
      }),
    })
    .refine(
      (data) => !(data.tipePengiriman === 'FRANCO' && !data.lokasiPengiriman),
      {
        message: 'Lokasi pengiriman wajib diisi untuk tipe Franco',
        path: ['lokasiPengiriman'],
      }
    )
    .refine(
      (data) => !(data.tipePengiriman === 'LOCO' && !data.lokasiPengiriman),
      {
        message: 'Lokasi pengiriman wajib diisi untuk tipe Loco',
        path: ['lokasiPengiriman'],
      }
    )

  const pembayaranSchema = z
    .object({
      tipePembayaran: z.enum(['CBD', 'COD', 'TEMPO', 'LAINNYA'], {
        required_error: 'Silahkan pilih tipe pembayaran',
      }),
      tempo: z.string().optional(),
      lainnya: z.string().optional(),
    })
    .refine((data) => !(data.tipePembayaran === 'TEMPO' && !data.tempo), {
      message: 'Jangka waktu tempo harus diisi',
      path: ['tempo'],
    })
    .refine((data) => !(data.tipePembayaran === 'LAINNYA' && !data.lainnya), {
      message: 'Keterangan pembayaran lainnya harus diisi',
      path: ['lainnya'],
    })

  const varianSchema = z.object({
    namaVarian: handleField
      ? z.string().refine((value) => (value === '' ? null : value), {
          message: 'Nama varian tidak boleh kosong',
        })
      : z.string().nullable(),
    spesifikVarian: z.string({
      required_error: 'Spesifikasi varian harus diisi',
    }),
    hargaSatuan: z.string().superRefine((value, ctx) => {
      if (value === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Harga satuan harus diisi',
        })
      }
      const parseNum = parseFloat(value)
      if (isNaN(parseNum)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Harga satuan harus berupa angka',
        })
      }
    }),
    satuanProduk: z.string({
      required_error: 'Satuan produk harus diisi',
    }),
    hargaDiskon: z
      .string()
      .superRefine((value, ctx) => {
        if (value === '') {
          return
        }
        const parseNum = parseFloat(value)
        if (isNaN(parseNum)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Harga diskon harus berupa angka',
          })
        }
      })
      .optional(),
    minPembelian: z.string().superRefine((value, ctx) => {
      if (value === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Harga satuan harus diisi',
        })
      }
      const parseNum = parseInt(value)
      if (isNaN(parseNum)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Minimal pembelian harus berupa angka',
        })
      }
    }),
  })

  return z.object({
    // step 1 produk
    namaProduk: z.string().min(1, 'Nama produk harus diisi'),
    document: z
      .custom<FileList | null>()
      .refine((files) => !files || files[0].type === 'application/pdf', {
        message: 'Hanya file PDF yang diperbolehkan',
      })
      .refine((files) => !files || files[0].size <= 5 * 1024 * 1024, {
        message: 'Ukuran file tidak boleh lebih dari 5MB',
      })
      .optional(),
    // varian menggunakan useFieldArray
    varian: z.array(varianSchema),

    // step 2 pengiriman
    spesifikPengiriman: pengirimanScheme,
    tipePajak: z.enum(['INCLPPN', 'EXCLPPN', 'NONPPN'], {
      required_error: 'Silahkan pilih tipe pajak',
    }),
    pembayaran: pembayaranSchema,

    // step 3 data vendor
    namaPerusahaan: z.string().min(1, 'Nama perusahaan harus diisi'),
    namaPic: z.string().min(1, 'Nama PIC harus diisi'),
    whatsapp: z.string().regex(/^[0-9]+$/, 'Nomor WhatsApp hanya boleh angka'),
  })
}

export type TFormScheme = z.infer<ReturnType<typeof formScheme>>

export { formScheme }

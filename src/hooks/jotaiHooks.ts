import type { IPortfolio, ISeo } from '@/types/type'
import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
export const buttonCompro = atomWithStorage('buttonCompro', false)
export const buttonPenawaran = atom(false)

export const itemsAtom = atom<IPortfolio[]>([])
export const categoryAtom = atom<string>('')
export const page = atom<number>(1)

export interface IPortfolioo {
  data: IPortfolio
}
// export interface ISeoAtom {
//   data: ISeo
// }
export const editablePorto = atom<IPortfolioo>()
export const editableSeo = atom<ISeo>()

export const itemsAtomArtikel = atom([])
export const categoryAtomArtikel = atom<string>('')
export const pageArtikel = atom<number>(1)

export const formPenawaranAtom = atomWithStorage('formPenawaran', {
  namaPerusahaan: '',
  namaPic: '',
  whatsapp: 0,
  namaProduk: '',
  document: '',
  varian: [
    {
      namaVarian: '',
      spesifikVarian: '',
      hargaSatuan: undefined,
      satuanProduk: 'PCS',
      hargaDiskon: undefined,
      minPembelian: undefined,
    },
  ],
  spesifikPengiriman: {
    tipePengiriman: 'FRANCO',
    lokasiPengiriman: '',
  },
  jadwalMuat: undefined,
  tipePajak: 'INCLPPN',
  pembayaran: {
    tipePembayaran: 'CBD',
    tempo: '',
    lainnya: '',
  },
})

export const hanldleField = atomWithStorage<string | boolean>(
  'buttonField',
  false,
  createJSONStorage(() => sessionStorage)
)

export const fileName = atom<string>('')

export const stateDeleteArtikel = atom<boolean>(false)
export const selectedItemArtikel = atom<number[]>([])
export const editedArtikel = atom<boolean>(false)

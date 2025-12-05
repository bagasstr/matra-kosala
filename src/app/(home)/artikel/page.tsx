import PageArtikel from '@/components/artikel/PageArtikel'
import { Suspense } from 'react'

export default function Artikel() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PageArtikel />
      </Suspense>
    </>
  )
}

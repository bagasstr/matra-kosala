'use client'
import { Button } from '@/components/ui/button'
import { selectedItemArtikel, stateDeleteArtikel } from '@/hooks/jotaiHooks'
import { clientEnv } from '@/lib/client'
import { cn } from '@/lib/utils'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { toast } from 'sonner'

const DeleteArtikel = () => {
  const [stateDelete, setStateDelete] = useAtom(stateDeleteArtikel)
  const [selectedItem, setSelectedItem] = useAtom(selectedItemArtikel)

  const handleDelete = async () => {
    try {
      const res = await fetch(`${clientEnv.API_URL}/artikel`, {
        method: 'DELETE',
        body: JSON.stringify({ ids: selectedItem }),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message)
      }
      const ress = await res.json()
      setSelectedItem([])
      toast.success(ress.message)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
    setTimeout(() => {
      window.location.reload()
    }, 500)
    setStateDelete(false)
  }

  return (
    <>
      <div className={cn()}>
        {selectedItem.length > 0 ? (
          <>
            <Button
              type='button'
              variant={'secondary'}
              className='rounded'
              onClick={handleDelete}>
              Delete Artikel {selectedItem.length}
            </Button>
          </>
        ) : (
          <Button
            type='button'
            variant={'destructive'}
            className='rounded'
            onClick={() => setStateDelete((prev) => !prev)}>
            Delete Artikel
          </Button>
        )}
      </div>
    </>
  )
}
export default DeleteArtikel

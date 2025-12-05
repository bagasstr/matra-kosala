'use client'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { IProduk } from '@/types/type'
import { clientEnv } from '@/lib/client'

interface DeleteButtonProps {
  rowId: number
  className?: string
}
type IHandleDelete = () => Promise<void>

export function DeleteButtonColumn({
  rowId,
  className,
}: DeleteButtonProps): JSX.Element {
  const [showDialog, setShowDialog] = useState(false)
  const queryClient = useQueryClient()

  const deleteVendorMutation = useMutation({
    mutationFn: async (): Promise<IProduk> => {
      const response = await fetch(`${clientEnv.API_URL}/vendor/${rowId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Gagal menghapus data')
      }

      return response.json()
    },
  })
  const handleDelete = async (): Promise<void> => {
    toast.promise(deleteVendorMutation.mutateAsync(), {
      loading: 'Menghapus data...',
      success: () => {
        queryClient.invalidateQueries({ queryKey: ['vendor'] })
        setShowDialog(false)
        return 'Data vendor berhasil dihapus'
      },
      error: (error: Error) => {
        setShowDialog(false)
        return error.message || 'Terjadi kesalahan saat menghapus data'
      },
    })
  }

  return (
    <>
      <Button
        variant='destructive'
        className={`h-9 rounded-sm px-3 ${className}`}
        onClick={(e) => {
          e.preventDefault()
          setShowDialog(true)
        }}>
        <Trash2 className='h-4 w-4' />
        Hapus
      </Button>

      {showDialog && (
        <AlertDialog
          open={showDialog}
          onOpenChange={(open) => {
            setShowDialog(open)
          }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Apa anda yakin hapus data vendor?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Data yang telah dihapus tidak dapat dikembalikan!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className='gap-x-4'>
              <AlertDialogCancel
                className='rounded-sm'
                disabled={deleteVendorMutation.isPending}
                onClick={() => {
                  setShowDialog(false)
                }}>
                Batal
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleteVendorMutation.isPending}
                className='rounded-sm'>
                {deleteVendorMutation.isPending ? (
                  <div className='flex items-center gap-2'>
                    <div className='h-4 w-4 animate-spin rounded-full border-b-2 border-white' />
                    Menghapus...
                  </div>
                ) : (
                  'Hapus'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}

interface DeleteButtonMultipleProps {
  selectedIds: any
  onDeleteComplete: () => void
}

export function DeleteButtonMultiple({
  selectedIds,
  onDeleteComplete,
}: DeleteButtonMultipleProps) {
  const [showDialog, setShowDialog] = useState(false)
  const queryClient = useQueryClient()

  const deleteVendorsMutation = useMutation({
    mutationFn: async () => {
      const responses = await Promise.all(
        selectedIds.map((id: any) =>
          fetch(`${clientEnv.API_URL}/vendor/${id}`, {
            method: 'DELETE',
          }).then((res) => {
            if (!res.ok) {
              throw new Error(`Gagal menghapus data dengan ID ${id}`)
            }
            return res.json()
          })
        )
      )
      return responses
    },
  })

  const handleDelete = async () => {
    toast.promise(deleteVendorsMutation.mutateAsync(), {
      loading: 'Menghapus data...',
      success: () => {
        queryClient.invalidateQueries({ queryKey: ['vendor'] })
        setShowDialog(false)
        setTimeout(onDeleteComplete, 100)
        return 'Data vendor berhasil dihapus'
      },
      error: (error: Error) => {
        setShowDialog(false)
        setTimeout(onDeleteComplete, 100)
        return error.message || 'Terjadi kesalahan saat menghapus data'
      },
    })
  }

  return (
    <>
      <Button
        variant='outline'
        className='h-9 p-3 rounded-sm'
        disabled={selectedIds.length === 0}
        onClick={() => setShowDialog(true)}>
        <Trash2 className='h-4 w-4 mr-2' />
        Delete Selected ({selectedIds.length})
      </Button>

      {showDialog && (
        <AlertDialog
          open={showDialog}
          onOpenChange={(open) => {
            setShowDialog(open)
            if (!open) onDeleteComplete?.()
          }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Apakah Anda yakin ingin menghapus data yang dipilih?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Data yang dihapus tidak dapat dikembalikan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className='gap-x-4'>
              <AlertDialogCancel
                className='rounded-sm'
                disabled={deleteVendorsMutation.isPending}
                onClick={() => setShowDialog(false)}>
                Batal
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleteVendorsMutation.isPending}
                className='rounded-sm'>
                {deleteVendorsMutation.isPending ? (
                  <div className='flex items-center gap-2'>
                    <div className='spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full'></div>
                    Menghapus...
                  </div>
                ) : (
                  'Hapus'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}

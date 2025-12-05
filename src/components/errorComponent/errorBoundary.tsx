'use client'

import { ReactNode, useState, useEffect } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error('Error di komponen:', event.error)
      setHasError(true)
    }

    window.addEventListener('error', errorHandler)
    return () => window.removeEventListener('error', errorHandler)
  }, [])

  if (hasError) {
    return (
      <div className='p-4 bg-red-100 text-red-600 rounded-md'>
        <h2 className='text-lg font-bold'>Terjadi Kesalahan</h2>
        <p>Maaf, ada masalah pada komponen ini.</p>
        <button
          onClick={() => setHasError(false)}
          className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          Coba Lagi
        </button>
      </div>
    )
  }

  return children
}

'use server'

import { serverEnv } from '@/lib/server'
import type {
  IPortfolioResponse,
  ITestimoniResponse,
  ITestimoniTable,
} from '@/types/type'

type TPortfolioActionProps = {
  params?: string | number
}

export const portfolioFetch = async (): Promise<{
  result: IPortfolioResponse | null
  error?: string | null
}> => {
  try {
    const res = await fetch(`${serverEnv.API_URL}/portfolio`, {
      cache: 'no-cache',
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || 'Terjadi kesalahan saat memuat portofolio')
    }
    const result: IPortfolioResponse = await res.json()

    return { result, error: null }
  } catch (error) {
    return {
      result: null,
      error:
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat memuat portofolio',
    }
  }
}

export const testimoniFetch = async (): Promise<{
  result: ITestimoniResponse | null
  error: string | null
}> => {
  try {
    const res = await fetch(`${serverEnv.API_URL}/testimoni`)
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || 'Terjadi kesalahan saat memuat portofolio')
    }
    const result: ITestimoniResponse = await res.json()

    return { result, error: null }
  } catch (error) {
    return {
      result: null,
      error:
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat memuat portofolio',
    }
  }
}

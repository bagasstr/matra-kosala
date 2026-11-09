import { testimoniFetch } from '@/app/actions/fetchAction'
import TestimoniSwipper from '../testimoniSwipper'
import type { ITestimoniTable } from '@/types/type'

export default async function Testimoni() {
  const { result, error } = await testimoniFetch()

  // Handle jika result?.data berupa array atau nested { data: [...] }
  let testimonials: ITestimoniTable[] = []
  if (Array.isArray(result?.data)) {
    testimonials = result.data
  } else if (result?.data && Array.isArray((result.data as any).data)) {
    testimonials = (result.data as any).data
  }

  return <TestimoniSwipper data={testimonials} isError={error} />
}

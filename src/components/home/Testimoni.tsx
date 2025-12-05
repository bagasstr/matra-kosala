import { testimoniFetch } from '@/app/actions/fetchAction'
import TestimoniSwipper from '../testimoniSwipper'

export default async function Testimoni() {
  // const [testimonials, setTestimonials] = useState<ITestimoniTable[]>([])
  const { result, error } = await testimoniFetch()

  return <TestimoniSwipper data={result?.data || []} isError={error} />
}

import { serverEnv } from '@/lib/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
  const cookieStore = cookies()
  const authToken = cookieStore.get('authToken')?.value

  const session = await fetch(`${serverEnv.API_URL}/dashboard`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',

      Cookie: `authToken=${authToken}`, // Kirim cookie secara eksplisit
    },
  })
  if (!session.ok) {
    const errorResponse = await session.json().catch(() => ({}))
    console.error('Dashboard fetch error:', errorResponse)
    redirect('/admin/login')
  } else {
    redirect('/admin/dashboard/vendor')
  }
}

export default Dashboard

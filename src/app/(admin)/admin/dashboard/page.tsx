import { serverEnv } from '@/lib/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
  const cookieStore = cookies()
  const authToken = cookieStore.get('session_id')?.value

  const session = await fetch(`${serverEnv.API_URL}/auth/me`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',

      Cookie: `session_id=${authToken}`, // Kirim cookie secara eksplisit
    },
  })
  console.log(session.json())

  if (!session.ok) {
    const errorResponse = await session.json().catch(() => ({}))
    console.error('Dashboard fetch error:', errorResponse)
    redirect('/admin/login')
  } else {
    redirect('/admin/dashboard/artikel')
  }
}

export default Dashboard

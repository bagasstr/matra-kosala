import { OverviewStats } from '@/components/overview-stats'
import { serverEnv } from '@/lib/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
  const authToken = cookies().get('session_id')?.value

  const session = await fetch(`${serverEnv.API_URL}/auth/me`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `session_id=${authToken}`,
    },
  })

  if (!session.ok) {
    redirect('/admin/login')
  }

  return <OverviewStats />
}

export default Dashboard

'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { clientEnv } from '@/lib/client'

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch(`${clientEnv.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Jika login berhasil
        router.push('/admin/dashboard/vendor')
      } else {
        // Jika gagal, tampilkan pesan error
        const errorData = await response.json()
        setError(errorData.message)
      }
      setIsLoading(false)
    } catch (error) {
      setError('Terjadi kesalahan saat login.')
    }
  }

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader>
          <CardTitle className='text-3xl text-center font-bold'>
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='username'>Username</Label>
                <Input
                  id='username'
                  type='test'
                  placeholder='username'
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password' className=''>
                    Password
                  </Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {error && <p className='text-red-500'>{error}</p>}
              <Button
                type='submit'
                className='w-full h-12 rounded-sm ring-white ring-1 ring-inset bg-primary-content font-semibold text-md'>
                {isLoading ? 'Loading...' : 'Login'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

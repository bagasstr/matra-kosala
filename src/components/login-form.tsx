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
    email: '',
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
      const response = await fetch(`${clientEnv.API_URL}/auth/login`, {
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
      console.log()

      setError('Terjadi kesalahan saat login.')
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card className='border border-border/70 bg-card shadow-xl rounded-2xl p-6 sm:p-8'>
        <CardHeader className='text-center pb-6 space-y-1'>
          <CardTitle className='text-2xl font-bold tracking-tight text-foreground'>
            Login Admin
          </CardTitle>
          <CardDescription className='text-sm text-muted-foreground'>
            Masukkan kredensial Anda untuk mengakses dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className='p-0'>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-5'>
              <div className='grid gap-2'>
                <Label htmlFor='username' className='text-sm font-medium'>
                  Email
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='Masukkan email'
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className='h-11 rounded-lg'
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='password' className='text-sm font-medium'>
                    Password
                  </Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  placeholder='Masukkan password'
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className='h-11 rounded-lg'
                />
              </div>
              {error && (
                <div className='p-3 text-sm rounded-lg bg-destructive/10 text-destructive font-medium border border-destructive/20'>
                  {error}
                </div>
              )}
              <Button
                type='submit'
                disabled={isLoading}
                className='w-full h-11 rounded-lg bg-primary-dark text-white hover:bg-primary-dark/90 font-semibold text-sm transition-colors mt-2'>
                {isLoading ? 'Memproses...' : 'Login'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

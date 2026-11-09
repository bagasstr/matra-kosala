import LoginForm from '@/components/login-form'

export default function Login() {
   return (
      <div className='flex min-h-screen w-full items-center justify-center p-4 sm:p-8 bg-slate-50/70'>
         <div className='w-full max-w-md'>
            <LoginForm />
         </div>
      </div>
   )
}

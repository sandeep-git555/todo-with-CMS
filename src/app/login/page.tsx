import Link from 'next/link'
import LoginForm from '../components/LogInForm'


export default function LoginPage() {
  return (
    <main className='flex min-h-screen'>
      <div className='basis-3/5 flex flex-col justify-between py-10 sm:hidden'>
        <Link className='text-9xl uppercase opacity-50 hover:opacity-100' href='/'>New here?</Link>
        <Link className='text-9xl uppercase opacity-50 hover:opacity-100' href="/forgot-password">Forgot password?</Link>
      </div>
      <div className='grow flex flex-col justify-center bg-bnw-art bg-center object-contain'>
        <LoginForm />
      </div>
    </main>
  )
}
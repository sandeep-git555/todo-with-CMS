import Link from 'next/link'
import ForgotPasswordForm from '../components/ForgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <main className='flex min-h-screen'>
      <div className='basis-3/5 flex flex-col justify-between py-10 sm:hidden'>
        <Link className='text-9xl uppercase opacity-50 hover:opacity-100' href="/">Create an account</Link>
        <Link className='text-9xl uppercase opacity-50 hover:opacity-100' href='/login'>Login</Link>
      </div>
      <div className='grow flex flex-col justify-center bg-bnw-art bg-center object-contain'>
        <ForgotPasswordForm />
      </div>
    </main>
  )
}
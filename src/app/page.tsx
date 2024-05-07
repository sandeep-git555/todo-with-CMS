import Link from 'next/link'

import SignUpForm from './components/SignUpForm'

export default function SignUpPage() {
  return (
    <main className='flex min-h-screen'>
      <div className='basis-1/2 flex flex-col justify-center py-10 md:hidden'>
        <Link className='text-9xl uppercase opacity-50 hover:opacity-100' href='/login'>Have an account already?</Link>
      </div>
      <div className='grow flex flex-col items-center justify-center bg-bnw-art bg-center object-contain md:items-stretch'>
        <SignUpForm />
      </div>
    </main>
  )
}
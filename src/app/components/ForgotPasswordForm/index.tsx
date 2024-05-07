'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import Input from '../Form/Input'
import Button from '../Form/Button'
import forgotPassword from '@/app/providers/forgotPassword'
import Message from '../Form/Message'
import Link from 'next/link'

const initialState = {
  email: '',
}

const defaultValidation = {
  success: false, 
  message: ''
}

export default function ForgotPasswordForm() {
  const [formData, setFormData] = React.useState(initialState)
  const [validation, setValidation] = React.useState(defaultValidation)
  React.useEffect(()=>{

  },[validation])
  const router = useRouter()

  const {email}= formData
  const handleFormChange = (e:any) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleLogin = async (e:any) => {
    e.preventDefault()
    const response = await forgotPassword(email)
    const {message} = response
    if(!!message) {
      setValidation({
        success: true,
        message
      })
    }
    else setValidation({
      success: false,
      message: 'Invalid email'
    })
  }

  console.log('%csrc/app/components/ForgotPasswordForm/index.tsx:49 validation', 'color: #26bfa5;', validation)

  if(validation.success) {
    return (
      <div className='p-10 text-center bg-black text-white max-w-sm mx-auto flex flex-col gap-4'>
        <p>An email has been sent to {email}, please check for further instructions</p>
        <Button onClick={()=>router.push('/login')}>
          Back to login page
        </Button>
      </div>
    )
  }

  const {success, message} = validation

  return (
    <form className='flex flex-col gap-4 border rounded-md mx-20 p-10 bg-black sm:mx-4'>
      <Input name='email' type="email" label="Enter your email" value={email} onChange={handleFormChange} readOnly={validation.success} success={success} />
      <Button onClick={handleLogin}>{!!validation.message ? validation.message : 'Get a code'}</Button>
      {message && (
        <Message success={success} message={message} error={!success} />
      )}
      <Link href='/login' className='hidden sm:block'>Login</Link>
      <Link href='/' className='hidden sm:block'>Create a new account</Link>
    </form>
  )
}
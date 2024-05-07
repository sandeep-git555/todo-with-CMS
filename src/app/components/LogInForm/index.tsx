'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import Input from '../Form/Input'
import Button from '../Form/Button'
import fetchFromCMS from '@/app/providers/fetch'
import Message from '../Form/Message'
import Link from 'next/link'

const initialState = {
  email: '',
  password: ''
}

const defaultValidation = {
  error: false,
  success: false, 
  message: ''
}

export default function LoginForm() {
  const [formData, setFormData] = React.useState(initialState)
  const [validation, setValidation] = React.useState(defaultValidation)
  const router = useRouter()

  const {email, password}= formData
  const handleFormChange = (e:any) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleLogin = async (e:any) => {
    e.preventDefault()
    const response = await fetchFromCMS('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    })
    const {user, errors} = response
    if(errors) {
      setValidation({
        ...validation, 
        error: true,
        message: errors[0].message
      })
    }
    if(user) {
      setValidation({
        ...validation,
        success: true,
        message: 'Authentication successful'
      })
      router.push('/dashboard')
      setFormData(initialState)
      setValidation(defaultValidation)
    }
  }

  const {error, success, message} = validation

  return (
    <form className='flex flex-col gap-4 border rounded-md mx-20 p-10 bg-black md:mx-4'>
      <p className='hidden md:block text-3xl border-b border-white'>Login to your account</p>
      <Input name='email' type="email" label="Enter your email" value={email} onChange={handleFormChange} error={error} success={success} />
      <Input name='password' type="password" label='Enter your password' value={password} onChange={handleFormChange} error={error} success={success}  />
      {message ? (
        <Message message={message} error={error} success={success} />
      ): undefined}
      <Button onClick={handleLogin} disabled={error} loading={success}>Log in</Button>
      <Link href='/forgot-password' className='hidden md:block'>Forgot password</Link>
      <Link href='/' className='hidden md:block'>Create a new account</Link>
    </form>
  )
}
'use client'

import React, { SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'

import Input from '../Form/Input'
import Button from '../Form/Button'
import fetchFromCMS from '@/app/providers/fetch'
import Message from '../Form/Message'
import Link from 'next/link'

const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: ''
}

const defaultValidation = {
  error: false,
  success: false, 
  message: ''
}

export default function SignUpForm() {
  const [formData, setFormData] = React.useState(initialState)
  const [validation, setValidation] = React.useState({
    error: false,
    success: false, 
    message: ''
  })
  const router = useRouter()

  const {email, password, firstName, lastName}= formData
  const handleFormChange = (e:any) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleSignup = async (e:SyntheticEvent) => {
    e.preventDefault()
    const response = await fetchFromCMS('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName
      })
    })
    const {doc, errors, message} = response
    if(errors) {
      setValidation({
        ...validation, 
        error: true,
        message: errors[0].message
      })
    }
    if(doc) {
      setValidation({
        ...validation,
        success: true,
        message, 
      })
      router.push('/dashboard')
      setFormData(initialState)
      setValidation(defaultValidation)
    }
  }
  const {error, success, message} = validation

  return (
    <form className='flex flex-col gap-4 border rounded-md mx-20 p-10 bg-black md:mx-4'>
      <p className='hidden md:block text-3xl border-b border-white'>Create your account</p>
      <div className='flex gap-4 md:flex-col md:w-full'>
        <Input name='firstName' type="text" label="First name" onChange={handleFormChange} error={error} success={success} />
        <Input name='lastName' type="text" label="Last name" onChange={handleFormChange}  error={error} success={success}/>
      </div>
      {/* <Input name='username' type="text" label="Choose a username" onChange={handleFormChange} /> */}
      <Input name='email' type="text" label="Enter your email"  onChange={handleFormChange} error={error} success={success} />
      <Input name='password' type="password" label='Enter your password' onChange={handleFormChange}  error={error} success={success}/>
      {message ? (
        <Message message={message} error={error} success={success} />
      ): undefined}
      <Button onClick={handleSignup} disabled={error} loading={success}>Sign up</Button>
      <Link href='/login' className='hidden md:block'>Have an account?</Link>
    </form>
  )}
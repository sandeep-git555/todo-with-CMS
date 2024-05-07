'use server'

import { login } from './login'

export const signup = async (formData: FormData) => {
  // access form data
  const email = formData.get('email')
  const password = formData.get('password')
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')

  // TODO: organise slugs

  try {
    const res = await fetch(`${process.env.CMS_URL}/api/users`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `users API-Key ${process.env.API_KEY}`
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    })
    if (res.status === 400) {
      return {
        error: true,
        message: 'This email is associated with another account'
      }
    }
    
    const rs = await res.json()
    if (rs.doc) {
      const response = await login(formData)
      return response
    }
    return {
      error: true,
      message: 'Trouble signing in to your account, please try later'
    }
    
  } catch (error) {
    console.error('Sign up error:', error)
    return {
      error: true,
      message: 'Internal error, cannot create account'
    }
  }
}
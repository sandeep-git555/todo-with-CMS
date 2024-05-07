'use client'

import React from 'react'

import type { AuthResponse, User } from '@/app/types'

const initialState = {
  isLoggedIn: false,
  user: {
    email: '',
    firstName: '',
    lastName: '',
    tasks: []
  }
}

export default function useAuth() {
  const [auth, setState] = React.useState<AuthResponse>(initialState)
  React.useEffect(()=>{
    fetch(`${process.env.CMS_URL}/api/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: [
        ['Content-Type', 'application/json']      
      ],
      redirect: 'follow'
    })
      .then((response) => response.json()).
      then(({user}:{user: User | undefined}) => setState({
        user,
        isLoggedIn: !!user,
      }))
  },[])

  return auth
}
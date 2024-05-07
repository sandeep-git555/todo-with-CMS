'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const logout = async () => {
  // const rs = await fetch(`${process.env.CMS_URL}/api/users/logout`, {
  //   method: 'POST',
  //   credentials: 'include',
  //   headers: [
  //     ['Content-Type', 'application/json']
  //   ],
  // })
  // const response = await rs.json()
  // if (response.ok) {
  //   return response
  // }
  cookies().delete(process.env.COOKIE_NAME || 'payload-token')
  revalidatePath('/', 'layout')
  return {
    error: true,
    message: 'There was a problem logging out'
  }
  
}
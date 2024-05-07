'use client'

import fetchFromCMS from '@/app/providers/fetch'
import Button from '../Form/Button'
import { SignOut } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

export default function LogOut() {
  const router = useRouter()
  const handleLogout = async() => {
    const response = await fetchFromCMS('/api/users/logout', {
      method: 'POST',
    })
    if(response.errors) {
      // 
    }
    router.refresh()
  }
  return (
    <Button className='w-fit self-end !p-1' variant="fill" onClick={handleLogout}>
      <SignOut size={20} />
    </Button>
  )
}
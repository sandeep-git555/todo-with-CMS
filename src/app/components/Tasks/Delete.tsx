'use client'

import React from 'react'

import type { Task } from '@/app/types'
import Button from '../Form/Button'
import useAuth from '@/app/providers/getUser'
import updateCMS from '@/app/providers/updateTask'

export default function Delete({item}: {item: Task}) {
  const {user} = useAuth()
  const [validation, setValidation] = React.useState({
    error: false,
    success: false, 
    message: ''
  })

  if(!user) return null
  const handleDelete = async () => {
    const response = await updateCMS(user, item, true)
    console.log('%csrc/app/components/Tasks/Delete.tsx:13 response', 'color: #26bfa5;', response)
    const {docs, errors, message} = response
    if(errors) {
      setValidation({
        ...validation,
        error: true,
        message: 'One or more fields are invalid',
      })
      if(docs) {
        setValidation({
          ...validation,
          success: true,
          message,
        })
      }
    }
  }
  return (
    <Button variant="fill" onClick={handleDelete}>Delete</Button>
  )
}
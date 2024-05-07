'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import Button from '../Form/Button'
import Input from '../Form/Input'
import Checkbox from '../Form/Checkbox'
import Message from '../Form/Message'
import { User } from '@/app/types'
import updatUserTasks from '@/app/providers/updateTask'
import wait from '@/app/providers/wait'

export interface TaskBody {
  taskName: string
  description: string
  status: boolean
  priority: boolean
}

const initialState = {
  taskName: '',
  description: '',
  status: false,
  priority: false,
}

const defaultValidation = {
  error: false,
  success: false, 
  message: ''
}

export default function AddTasks({user}:{user: User}) {
  const router = useRouter()
  const [formData, setFormData] = React.useState<TaskBody>(initialState)
  const [submitting, setSubmitting] = React.useState(false)
  const [validation, setValidation] = React.useState(defaultValidation)

  const {taskName, description, status, priority} = formData
  const handleFormChange = (e:any) => {
    const {name, type, checked, value} = e.target
    if(type==='checkbox') {
      setFormData({
        ...formData,
        [name]: !!checked
      })
    }
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const addTask = async (e:any) => {
    e.preventDefault()
    setSubmitting(true)
    const updateTasks = [
      ...user.tasks ?? [],
      formData
    ]
    const response = await updatUserTasks(user, updateTasks)
  console.log('%csrc/app/components/Tasks/AddTask.tsx:82 validation', 'color: #26bfa5;', response);
    const {docs, errors, message} = response
    if(errors || docs.length === 0) {
      setValidation({
        ...validation,
        error: true,
        message: 'One or more fields are invalid',
      })
      if(docs) {
        setValidation({
          ...validation,
          success: true,
          message: 'Added new task',
        })
        wait(200)
        setFormData(initialState)
        setValidation(defaultValidation)
      }
    }
    setSubmitting(false)
  }

  const {error, success, message} = validation

  return (
    <form className='m-10 p-10 border rounded-md flex flex-col gap-4'>
      <Input  name="taskName" label="Title *" onChange={handleFormChange} value={taskName}  error={error} success={success}/>
      <Input name="description" label="Description" onChange={handleFormChange} value={description}  error={error} success={success}/>
      <Checkbox label='Done?' value={status} onChange={handleFormChange} name='status' />
      <Checkbox label='Important?' value={priority} onChange={handleFormChange} name='priority' />
      {message ? (
        <Message message={message} error={error} success={success} />
      ): undefined}
      <Button onClick={addTask} loading={submitting}>Create new task</Button>
    </form>
  )
}
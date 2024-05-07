import dotenv from 'dotenv'

import type { Task, User } from '../types'
import wait from './wait'

dotenv.config()

export default async function updatUserTasks (user: User, tasks: Task[]) {
  const rs = await fetch(`${process.env.CMS_URL}/api/users?where[id][equals]=${user.id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: [
      ['Content-Type', 'application/json']      
    ],
    redirect: 'follow',
    body: JSON.stringify({
      tasks
    })
  })
  const response = await rs.json()
  wait(200)
  return response
}
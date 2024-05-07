'use client'

import Tasks from '../components/Tasks'
import LogOut from '../components/LogOut'
import AddTasks from '../components/Tasks/AddTask'
import useAuth from '../providers/getUser'

export default function DashboardPage() {
  const {user, isLoggedIn} = useAuth()
  if(!user || !isLoggedIn) {
    return null
  }
  const {firstName, tasks} = user
  return (
    <main className='flex min-h-screen md:flex-col relative'>
      <div className='basis-2/5 flex flex-col justify-center md:min-h-screen'>
        <AddTasks user={user} />
      </div>
      <div className='grow flex flex-col text-black p-10 gap-4 bg-white md:px-0 md:min-h-screen'>
        <div className='flex items-center gap-4 justify-end md:absolute md:top-8 md:right-4 md:text-white'>
          <p>Hi {firstName}</p>
          <LogOut />
        </div>
        <div>
          <Tasks tasks={tasks ?? []} user={user} />
        </div>
      </div>
    </main>
  )
}
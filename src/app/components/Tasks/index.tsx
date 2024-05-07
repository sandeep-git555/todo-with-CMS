import type { Task, User } from '@/app/types'
import List from './List'

export default function Tasks({tasks, user}:{tasks: Task[], user: User}) {
  if(!tasks) return (
    <div className='shadow-md grow rounded-md text-center text-6xl uppercase opacity-50 flex flex-col items-center justify-center'>No Tasks yet!</div>
  )
  return (
    <div className="flex flex-col">
      <List tasks={tasks} user={user}/>
    </div>
  )
}
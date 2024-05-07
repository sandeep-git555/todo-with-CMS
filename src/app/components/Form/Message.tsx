import { MessageProps } from '@/app/types'

export default function Message({message, error, success}:MessageProps) {
  if(success) {
    return (
      <div className="border-t-2 border-green-600 bg-green-50 p-2 text-green-500 rounded-sm">
        {message}
      </div>
    )
  }
  if(error) {
    return (
      <div className="border-t-2 border-red-700 bg-red-50 p-2 text-red-700 rounded-sm">
        {message}
      </div>
    )
  }
  return null
}
interface TaskCellProps {
  name: string
  description: string
}

export default function Task({name, description}:TaskCellProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-bold">{name}</p>
      <p className="max-w-lg text-wrap line-clamp-2 overflow-hidden" title={description}>{description}</p>
    </div>
  )
}
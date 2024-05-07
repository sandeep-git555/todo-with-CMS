export default function Loader({text='Loading'}: {text?:string}) {
  return (
    <div className='flex space-x-2 justify-center items-center bg-black'>
      <span className='sr-only'>{text}...</span>
      <div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-2 w-2 bg-white rounded-full animate-bounce'></div>
    </div>
  )
}
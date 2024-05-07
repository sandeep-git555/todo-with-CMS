import type { InputProps } from '@/app/types'
import classNames from 'classnames'

const errorClasses = 'border-t-2 border-red-700 bg-red-50'
const successClasses = 'border-t-2 border-green-600 bg-green-50'


export default function Input({
  name, value, label, placeholder, onChange, type, required, readOnly, className, error, success
}:InputProps) {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={name} className='text-sm'>{label}</label>
      <input 
        name={name} 
        value={value} 
        aria-label={label} 
        placeholder={placeholder} 
        onChange={onChange} 
        className={
          classNames(
            'bg-white rounded-sm p-2 outline-none text-black',
            readOnly ? 'border-none' : 'border border-black',
            error && errorClasses,
            success && successClasses,
            className
          )
        }
        type={type}
        required={required}
        disabled={readOnly}
      />
    </div>
  )
}
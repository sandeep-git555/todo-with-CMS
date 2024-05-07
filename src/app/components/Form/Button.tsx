import classNames from 'classnames'

import type { ButtonProps } from '@/app/types'
import Loader from '../Loader'


export default function Button({name, children, className, type, variant, loading, disabled, onClick}:ButtonProps) {
  let variantClassNames=''
  switch(variant) {
  case 'outline':
  default:
    variantClassNames = 'border border-white'
    break
  case 'fill':
    variantClassNames = 'bg-black text-white'
    break
  }
  return (
    <button 
      className={
        classNames(
          'px-5 py-2 rounded-sm cursor-pointer h-[42px] font-bold',
          className,
          variantClassNames,
          disabled && 'bg-stone-300 cursor-not-allowed border-gray-300 text-stone-400'
        )
      } 
      name={name}
      type={type} 
      disabled={disabled} 
      onClick={onClick}
    >
      {loading? <Loader /> : children}
    </button>
  )
}
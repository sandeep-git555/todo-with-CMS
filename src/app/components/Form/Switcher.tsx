import type { SwitcherProps } from '@/app/types'

export default function Switcher ({
  label,
  defaultValue = false,
  value,
  handleCheckboxChange,
  falseLabel,
  falseIcon,
  trueIcon,
  trueLabel,
  name
}:SwitcherProps) {

  const isChecked = value ? value : defaultValue
  console.log('%csrc/app/components/Form/Switcher.tsx:16 name, value', 'color: #26bfa5;', name, value)
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={name} className='text-sm'>{label}</label>
      <label className='relative inline-flex cursor-pointer select-none items-center justify-center rounded-[3px] bg-black border-white border p-1'>
        <input
          type='checkbox'
          name={name}
          className='sr-only'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex items-center justify-center space-x-[6px] rounded-sm py-2 px-[18px] w-1/2 gap-1 ${
            !isChecked ? 'text-black bg-white' : 'text-white'
          }`}
        >
          {falseIcon}
          {falseLabel}
        </span>
        <span
          className={`flex items-center justify-center space-x-[6px] rounded-sm py-2 px-[18px] w-1/2 gap-1 ${
            isChecked ? 'text-black bg-white' : 'text-white'
          }`}
        >
          {trueIcon}
          {trueLabel}
        </span>
      </label>
    </div>
  )
}

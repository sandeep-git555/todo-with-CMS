import { CheckboxProps } from '@/app/types'

export default function Checkbox({name, value, label, defaultValue, onChange}:CheckboxProps) {
  return (
    <div className='inline-flex items-center gap-1'>
    <input type="checkbox" name={name} className="accent-black rounded-sm border border-white" checked={value} defaultChecked={defaultValue} onChange={onChange} />
    <label htmlFor={name}>{label}</label>
    </div>
  )
}
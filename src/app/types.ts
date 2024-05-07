import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

// Form elements
export interface InputProps {
  name: string
  value?: string
  label?: string
  placeholder?: string
  onChange?: any
  type?: HTMLInputTypeAttribute | undefined
  required?: boolean
  readOnly?: boolean
  className?: string
  error?: boolean
  success?: boolean
}

export interface ButtonProps {
  name?: string
  type?: 'submit' | 'reset' | 'button' | undefined
  children: React.ReactNode
  className?: string
  variant?: string
  loading?: boolean
  disabled?: boolean
  onClick?: any
}

export interface SwitcherProps {
  defaultValue?: boolean
  value?: boolean
  handleCheckboxChange: ChangeEventHandler<HTMLInputElement>,
  name?: string
  falseLabel: string
  falseIcon: React.ReactElement
  trueIcon: React.ReactElement
  trueLabel: string
  label: string
}

export interface MessageProps {
  message: string
  error: boolean
  success: boolean
}

export interface CheckboxProps {
  defaultValue?: boolean
  value?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>,
  name: string
  label?: string
}


// Data

export interface Task {
  id?: string
  taskName: string
  description: string
  status: boolean
  priority: boolean
}

export interface User {
  id?: string
  email: string
  firstName: string
  lastName: string
  tasks?: Task[] | undefined
}

export interface UserWithoutId {
  email: string
  firstName: string
  lastName: string
  tasks?: Task[] | undefined
}

// Auth

export interface AuthResponse {
  user: UserWithoutId | undefined
  isLoggedIn: boolean
}
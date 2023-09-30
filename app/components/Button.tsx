import React, { ReactNode } from 'react'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  fullWidth: boolean
  children: ReactNode
  onClick?: () => void
  secondary?: boolean
  danger?: boolean
  disable?: boolean
}

const Button = () => {
  return (
    <div>Button</div>
  )
}

export default Button
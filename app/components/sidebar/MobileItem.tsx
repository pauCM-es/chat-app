'use client'

import clsx from "clsx"
import Link from "next/link"

interface MobileItemProps {
  label: string
  href: string
  icon: any
  onClick?: () => void
  active?: boolean
}

const MobileItem = ({
  label,
  href,
  icon: Icon,
  onClick,
  active
}: MobileItemProps) => {
  const handleClick = () => {
    if (onClick) return onClick()
  }
  return (
    <Link
      onClick={ onClick }
      href={ href }
      className={ clsx(`
      group
      flex
      gap-x-3
      text-sm
      leading-6
      w-full
      justify-center
      p-4
      font-semibold
      text-gray-500
      hover:text-black
      hover:bg-gray-200
    `, active && 'bg-gray-200 text-black'
      ) }
    >
      <Icon classname="h-6 w-6" />
      <span className="sr-only">{ label }</span>
    </Link>
  )
}

export default MobileItem
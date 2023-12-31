'use client'

import clsx from "clsx"
import Link from "next/link"

interface DesktopItemProps {
  label: string
  href: string
  icon: any
  onClick?: () => void
  active?: boolean
}

const DesktopItem = ({
  label,
  href,
  icon: Icon,
  onClick,
  active
}: DesktopItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick()
    }
  }

  return (
    <li onClick={ handleClick }>
      <Link
        href={ href }
        className={ clsx(`
        flex
        rounded-md
        p-3
        text-sm
        leading-6
        font-semibold
        text-gray-500
        hover:text-black
        hover:bg-gray-200
      `, active && 'bg-gray-200 text-gray-900') }
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{ label }</span>
      </Link>
    </li>
  )
}

export default DesktopItem
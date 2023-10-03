'use client'

import { User } from "@prisma/client"
import Image from 'next/image'

interface AvatartProps {
  user?: User | null
}

const Avatar = ({ user }: AvatartProps) => {
  return (
    <div className="relative">
      <div className="
        relative
        inline-block
        rounded-full
        overflow-hidden
        h-9 w-9
        md:h-11 md:w-11
      ">
        {
          user?.image ? (
            <Image
              alt="Avatar"
              src={ user?.image || '/images/placeholder.jpg' }
              fill
              placeholder="data:image/images/placeholder.jpg"
            />
          ) : (
            user?.name
              ? <div className="
              bg-violet-800 text-white font-semibold text-xl
              w-full h-full
              flex
              justify-center
              items-center
              "
              >{ user?.name[0].toUpperCase() }</div>
              : <Image
                alt="Avatar"
                src={ '/images/placeholder.jpg' }
                fill
              />
          )
        }
      </div>
      <span className="
        absolute
        block
        rounded-full
        bg-green-500
        ring-2
        ring-white
        top-0 right-0
        h-2 w-2
        md:h-3 md:w-3
      ">

      </span>
    </div>
  )
}

export default Avatar
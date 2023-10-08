'use client'

import { User } from "@prisma/client"
import Image from "next/image"

interface AvatarGroupProps {
  users?: User[]
};

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  users = []
}) => {
  const slicedUsers = users.slice(0, 3)

  const positionMap = {
    0: 'top-0 left-[12px]',
    1: 'bottom-0',
    2: 'bottom-0 right-0'
  }

  return (
    <div className="relative h-11 w-11">
      { slicedUsers.map((user, index) => (
        <div
          key={ user.id }
          className={ `
            absolute
            inline-block 
            rounded-full 
            overflow-hidden
            h-[21px]
            w-[21px]
            ${positionMap[index as keyof typeof positionMap]}
          `}>
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
              bg-violet-800 text-white text-[0.75em]
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
          {/* <Image
            fill
            src={ user?.image || '/images/placeholder.jpg' }
            alt="Avatar"
          /> */}
        </div>
      )) }
    </div>
  )
}

export default AvatarGroup
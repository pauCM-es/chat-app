'use client'

import Avatar from "@/app/components/Avatar"
import LoadingModal from "@/app/components/modals/LoadingModal"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

interface UserBoxProps {
  userData: User
}

const UserBox = ({ userData }: UserBoxProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(() => {
    setIsLoading(true)

    axios.post('/api/conversations', {
      userId: userData.id
    })
      .then(response => {
        router.push(`/conversations/${response.data.id}`)
      })
      .finally(() => setIsLoading(false))
  }, [userData, router])

  return (
    <>
      {
        isLoading && <LoadingModal />
      }
      <div
        onClick={ handleClick }
        className="
        w-full relative flex items-center
        space-x-3 p-3
        bg-white
        hover:bg-neutral-200
        rounded-lg transition cursor-pointer
      "
      >
        <Avatar user={ userData } />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{ userData.name }</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserBox
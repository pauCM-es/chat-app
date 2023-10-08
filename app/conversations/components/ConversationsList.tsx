'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import clsx from "clsx"
import getConversations from "@/app/actions/getConversations"
import useConversation from "@/app/hooks/useConversation"
import { FullConversationType } from "@/app/types"
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from "./ConversationBox"
import GroupChatModal from "@/app/components/modals/GroupChat"
import { User } from "@prisma/client"

interface ConversationsListProps {
  initialItems?: FullConversationType[]
  users: User[]
}

const ConversationsList = ({ initialItems, users }: ConversationsListProps) => {
  const [items, setItems] = useState(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter()

  const { conversationId, isOpen } = useConversation()


  return (
    <>
      <GroupChatModal isOpen={ isModalOpen } users={ users } onClose={ () => setIsModalOpen(false) } />
      <aside className={ clsx(`
      fixed inset-y-0 pb-20 overflow-y-auto border-r border-gray-300
      lg:pb-0 lg:left-20 lg:w-80 lg:block
    `,
        isOpen ? 'hidden' : "block w-full left-0"
      ) }>

        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800"
            >
              Messages
            </div>
            <div
              onClick={ () => setIsModalOpen(true) }
              className="rounded-full p-2 bg-gray-200 text-gray-600 cursor-pointer hover:opacity-75 transition"
            >

              < MdOutlineGroupAdd size={ 20 } />
            </div>
          </div>
          { items?.map(item => (
            <ConversationBox
              key={ item.id }
              data={ item }
              selected={ conversationId === item.id }
            />
          )) }
        </div>
      </aside>
    </>
  )
}

export default ConversationsList
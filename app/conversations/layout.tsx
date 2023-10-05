
import Sidebar from "@/app/components/sidebar/Sidebar"
import ConversationsList from "./components/ConversationsList"
import getConversations from "../actions/getConversations"


const ConversationsLayout = async ({
  children }: { children: React.ReactNode }) => {
  const conversations = await getConversations()

  return (
    <Sidebar >
      <div className="h-full">
        <ConversationsList
          initialItems={ conversations }
        />
        { children }
      </div>
    </Sidebar>
  )
}

export default ConversationsLayout
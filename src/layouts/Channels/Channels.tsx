import { useRouter } from 'next/router'

import * as Icons from 'components/Icons'
import { Messages, MessagesWithUser } from 'components/Messages'

import { ChannelList } from './ChannelList'

export type Props = {
  data: Server[]
}

export type Server = {
  id: string
  label: string
  img: string
  categories: Category[]
}

export type Category = {
  id: string
  label: string
  channels: Channel[]
}

export type Channel = {
  id: number
  label: string
  messages: Message[]
  description?: string
  icon?: string
  unread?: string
}

export type Message = {
  id: string
  username: string
  avatar: string
  date: string
  text: string
}

export const Channels = ({ data }: Props) => {
  const router = useRouter()
  const server = data.find(
    (server) => Number(server.id) === Number(router.query.sid)
  )
  const channel = server?.categories
    .map((c) => c.channels)
    .flat()
    .find((c) => Number(c.id) === Number(router.query.cid))

  return (
    <>
      {server && channel && (
        <>
          <div className="hidden w-60 flex-col bg-gray-800 md:flex ">
            <button className="transition-200 flex h-12 items-center px-4 font-title text-[15px] text-white shadow-sm hover:bg-gray-550/[.16]">
              <div className="relative mr-1 h-4 w-4">
                <Icons.Verified className="absolute h-4 w-4 text-gray-550" />
                <Icons.Check className="absolute h-4 w-4 whitespace-nowrap text-white" />
              </div>
              {server.label}
              <Icons.Chevron className="ml-auto h-[18px] w-[18px] opacity-80" />
            </button>

            <ChannelList server={server} />
          </div>

          <div className="flex min-w-0 flex-1 flex-shrink flex-col bg-gray-700">
            <div className="flex h-12 items-center px-3 shadow-sm">
              <div className="flex items-center">
                <Icons.Hashtag className="mx-2 h-6 w-6 font-semibold text-gray-400" />
                <span className="mr-2 font-title text-white">
                  {channel.label}
                </span>
              </div>

              {channel.description && (
                <>
                  <div className="mx-2 hidden h-6 w-px bg-white/[.06] md:block"></div>
                  <div className="mx-2 hidden truncate text-sm font-medium text-gray-200 md:block">
                    {channel.description}
                  </div>
                </>
              )}

              {/* Mobile buttons */}
              <div className="ml-auto flex items-center md:hidden">
                <button className="text-gray-200 hover:text-gray-100">
                  <Icons.HashtagWithSpeechBubble className="mx-2 h-6 w-6" />
                </button>
                <button className="text-gray-200 hover:text-gray-100">
                  <Icons.People className="mx-2 h-6 w-6" />
                </button>
              </div>

              {/* Desktop buttons */}
              <div className="ml-auto hidden items-center md:flex">
                <button className="text-gray-200 hover:text-gray-100">
                  <Icons.HashtagWithSpeechBubble className="mx-2 h-6 w-6" />
                </button>
                <button className="text-gray-200 hover:text-gray-100">
                  <Icons.Bell className="mx-2 h-6 w-6" />
                </button>
                <button className="text-gray-200 hover:text-gray-100">
                  <Icons.Pin className="mx-2 h-6 w-6" />
                </button>
                <button className="text-gray-200 hover:text-gray-100">
                  <Icons.People className="mx-2 h-6 w-6" />
                </button>

                <div className="relative mx-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="h-6 w-36 rounded border-none bg-gray-900 px-1.5 text-sm font-medium placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <Icons.Spyglass className="mr-1.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <button className="text-gray-200 hover:text-gray-100">
                  <Icons.Inbox className="mx-2 h-6 w-6" />
                </button>
                <button className="text-gray-200 hover:text-gray-100">
                  <Icons.QuestionCircle className="mx-2 h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-3 scrollbar scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-800">
              {channel.messages.map((message, i) => (
                <div key={message.id}>
                  {i === 0 ||
                  message.username !== channel.messages[i - 1].username ? (
                    <MessagesWithUser message={message} />
                  ) : (
                    <Messages message={message} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

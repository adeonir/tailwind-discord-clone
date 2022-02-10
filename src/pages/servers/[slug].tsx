import { useRouter } from 'next/router'

import * as Icons from 'components/Icons'
import { ChannelLink } from 'components/ChannelLink'

import { GetServerSideProps } from 'next'

type Data = {
  data: {
    [key: string]: {
      label: string
      categories: Category[]
    }
  }
}

type Category = {
  id: string
  label: string
  channels: Channel[]
}

type Channel = {
  id: number
  label: string
  icon?: string
}

export default function Server({ data }: Data) {
  const router = useRouter()
  const { slug } = router.query

  return (
    <>
      <div className="flex w-60 flex-col bg-gray-800">
        <button className="transition-200 flex h-12 items-center px-4 font-title text-[15px] text-white shadow-sm hover:bg-gray-550/[.16]">
          <div className="relative mr-1 h-4 w-4">
            <Icons.Verified className="absolute h-4 w-4 text-gray-550" />
            <Icons.Check className="absolute h-4 w-4 text-white" />
          </div>
          {data[slug as keyof typeof data].label}
          <Icons.Chevron className="ml-auto h-[18px] w-[18px] opacity-80" />
        </button>
        <div className="flex-1 space-y-[21px] overflow-y-auto pt-3 font-medium text-gray-300 scrollbar scrollbar-thin scrollbar-thumb-gray-900">
          {data[slug as keyof typeof data].categories.map(
            (category: Category) => (
              <div key={category.id}>
                {category.label && (
                  <button className="flex items-center px-0.5 font-title text-xs uppercase tracking-wide">
                    <Icons.Arrow className="mr-0.5 h-3 w-3" />
                    {category.label}
                  </button>
                )}

                <div className="mt-[5px] space-y-0.5">
                  {category.channels.map((channel: Channel) => (
                    <ChannelLink channel={channel} key={channel.id} />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-gray-700">
        <div className="flex h-12 items-center px-3 shadow-sm">General</div>
        <div className="flex-1 space-y-4 overflow-y-auto p-3 scrollbar scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-800">
          {[...Array(40)].map((_, index) => (
            <div key={index}>
              Message {index + 1} Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Maxime reiciendis soluta ratione sint
              necessitatibus harum perferendis quam pariatur accusamus ab
              cumque, hic atque ullam corporis suscipit, nesciunt provident
              numquam impedit.
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = require('../../../data.json') as Data

  return {
    props: {
      data,
    },
  }
}
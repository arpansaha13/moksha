import { useRef, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Dialog } from '@headlessui/react'
import { Icon } from '@iconify/react'
import plusIcon from '@iconify-icons/mdi/plus'
import { useFetch } from '../../hooks/useFetch'
import { useDebounce } from '../../hooks/useDebounce'
import BaseInput from '../../components/base/BaseInput'
import BaseButton from '../../components/base/BaseButton'
import Modal from '../../components/common/Modal'
import Sheet from '../../components/common/Sheet'
import Avatar from '../../components/common/Avatar'

export default function Team() {
  const { team, members } = useLoaderData()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className='max-w-xl mx-auto'>
      <h1 className='mb-6 text-4xl font-bold text-gray-50'>{team.team_name}</h1>

      <div className='space-y-6'>
        <TeamData team={team} />

        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold text-gray-50'>Team members</h2>
          <BaseButton onClick={() => setModalOpen(true)}>Invite members</BaseButton>
        </div>

        <TeamMembers members={members} />
      </div>

      <InviteModal open={modalOpen} setOpen={setModalOpen} />
    </main>
  )
}

const TeamData = ({ team }) => (
  <Sheet className='px-6 py-4 space-y-3'>
    <div className='grid grid-cols-1 xs:grid-cols-2 gap-3 text-sm'>
      <div>
        <p className='font-semibold text-gray-400'>Leader</p>
        <p className='text-gray-100'>{team.leader_name}</p>
      </div>
      <div>
        <p className='font-semibold text-gray-400'>Leader id</p>
        <p className='text-gray-100'>{team.leader_id}</p>
      </div>
      <div>
        <p className='font-semibold text-gray-400'>Member count</p>
        <p className='text-gray-100'>{team.member_count}</p>
      </div>
    </div>
  </Sheet>
)

const TeamMembers = ({ members }) => {
  return (
    <Sheet className='px-6 py-4 space-y-3'>
      <ul className='divide-y divide-brown text-xs lg:text-sm'>
        {members.map(member => (
          <li key={member.user_id}>
            <div className='text-gray-100 flex items-center'>
              <div className='w-9 h-9 lg:w-12 lg:h-12'>
                <Avatar avatarIdx={member.avatar_idx} />
              </div>
              <div className='ml-1 lg:ml-2 flex-grow'>
                <p className='font-semibold'>{member.name}</p>
                <p className='text-gray-400'>{`@${member.username}`}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Sheet>
  )
}

const InviteModal = ({ open, setOpen }) => {
  const fetchHook = useFetch()
  const isFirstRender = useRef(true)

  const [searchString, setSearchString] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useDebounce(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false
        return
      }
      if (searchString === '') {
        setSearchResults([])
        return
      }
      fetchHook('users/?' + new URLSearchParams({ username: searchString })).then(res => {
        setSearchResults(res.data)
      })
    },
    800,
    [searchString]
  )

  function invite(userId) {
    console.log(userId)
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <Dialog.Title className='mb-4 text-base sm:text-xl text-white font-semibold'>Add team members</Dialog.Title>

      <BaseInput
        type='search'
        label='Search team members'
        srOnlyLabel
        placeholder='Search by username'
        value={searchString}
        onChange={e => setSearchString(e.target.value)}
      />

      <div className='mt-3 h-60 lg:h-80 overflow-auto scrollbar'>
        <ul className='divide-y divide-brown text-xs lg:text-sm'>
          {searchResults.map(user => (
            <li key={user.user_id}>
              <div className='sm:px-2 py-2 w-full text-left text-gray-100 flex items-center rounded-md'>
                <div className='w-9 h-9 lg:w-12 lg:h-12'>
                  <Avatar avatarIdx={user.avatar_idx} />
                </div>
                <div className='ml-1 lg:ml-2 flex-grow'>
                  <p className='font-semibold'>{user.name}</p>
                  <p className='text-gray-400'>{`@${user.username}`}</p>
                </div>
                <div>
                  <button
                    className='px-2 py-0.5 flex items-center hover:bg-amber-900/60 border border-gray-100 rounded-full transition-colors'
                    onClick={() => invite(user.user_id)}
                  >
                    <div className='w-5 h-5'>
                      <Icon icon={plusIcon} className='inline-block' color='inherit' width='100%' height='100%' />
                    </div>
                    <span className='hidden sm:inline-block ml-1'>Invite</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}

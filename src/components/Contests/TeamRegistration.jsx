import { memo, useCallback, useRef, useState } from "react"
import { useList } from "../../hooks/useList"
import { Icon } from '@iconify/react'
import closeIcon from '@iconify-icons/mdi/close'
import searchIcon from '@iconify-icons/mdi/search'
import BaseButton from "../base/BaseButton"
import BaseInput from "../base/BaseInput"
import Sheet from "../common/Sheet"
import Modal from "../common/Modal"
import classNames from "../../utils/classNames"

const memberDefault = {
  id: 1,
  user: {
    name: 'Firstname Lastname',
    username: '@username',
  }
}

const minTeamMembers = 0
const maxTeamMembers = 2

const TeamRegistration = () => {
  const [members, { set, push, pop }] = useList(
    [{ ...memberDefault }],
    {
      minLength: minTeamMembers,
      maxLength: maxTeamMembers,
    },
  )
  const [modalOpen, setModalOpen] = useState(false)
  const searchInputRef = useRef(null)

  const [searchResults, setSearchResults] = useState([
    {
      name: 'Firstname Lastname Lorem Ipsum',
      username: '@username',
    },
    {
      name: 'Firstname Lastname',
      username: '@username',
    },
    {
      name: 'Firstname Lastname',
      username: '@username',
    }
  ])

  const addMember = useCallback(() => {
    push({ ...memberDefault, id: members.length + 1 })
  }, [push])

  const teamRegister = useCallback(e => {
    e.preventDefault()
    console.log('register contest')
    // fetchHook('new/event', {
    //   method: 'POST',
    // })
  }, [])

  return (
    <Sheet className="p-4 sm:p-6 bg-amber-900/30">
      <form className='space-y-6' onSubmit={teamRegister}>
        <div className='markdown'>
          <h2>Register</h2>

          <button
            type="button"
            className={classNames(
              "w-full appearance-none rounded-md text-left px-3 py-2 flex items-center text-sm",
              members.length === maxTeamMembers ? 'bg-amber-900/50 border-none' : 'bg-amber-900/70 hover:bg-amber-800/70 border border-gray-300 shadow-sm transition-colors',
            )}
            disabled={members.length === maxTeamMembers}
            onClick={() => setModalOpen(true)}
          >
            <Icon icon={searchIcon} className="block" color="inherit" width='1.5rem' height='1.5rem' />
            <span className="inline-block ml-2 text-gray-400">
              Search by username
            </span>
          </button>

          <Modal open={modalOpen} setOpen={setModalOpen} initialFocusRef={searchInputRef}>
            <h4 className="mb-4 text-xl text-white font-semibold">
              Add team members
            </h4>

            <BaseInput
              type="search"
              label="Search team members"
              srOnlyLabel
              placeholder="Search by username"
              innerRef={searchInputRef}
            />

            <ul className="mt-3 divide-y divide-brown">
              {
                searchResults.map((user, i) => (
                  <li key={ i }>
                    <div className="px-4 py-3 hover:bg-amber-900/80 text-sm text-gray-100 flex rounded-md cursor-pointer">
                      <div className="flex-grow">
                        <p className="font-semibold">{ user.name }</p>
                        <p className="text-gray-400">{ user.username }</p>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          </Modal>

          <div className="mt-6">
          {
              members.map((member, i) => (
                <div key={ member.id } className="not-prose px-4 py-3 bg-amber-900/80 text-sm text-gray-50 flex rounded-md">
                  <div className="flex-grow">
                    <p className="font-semibold">{ member.user.name }</p>
                    <p className="text-gray-300">{ member.user.username }</p>
                  </div>
                  {
                    members.length > minTeamMembers && (
                      <div className="w-5 flex items-center">
                        <button
                          type="button"
                          className="rounded-md bg-transparent text-amber-500 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
                          onClick={() => pop(i)}
                        >
                          <Icon icon={closeIcon} className="block" color="inherit" width='100%' height='100%' />
                        </button>
                      </div>
                    )
                  }
                </div>
              ))
            }
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end gap-4">
          <BaseButton type="submit">
            Register
          </BaseButton>
        </div>
      </form>
    </Sheet>
  )
}
export default memo(TeamRegistration)

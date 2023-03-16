import { useCallback, useRef, useState } from "react"
import { Dialog } from '@headlessui/react'
import { Icon } from '@iconify/react'
import closeIcon from '@iconify-icons/mdi/close'
import searchIcon from '@iconify-icons/mdi/search'
import { useList } from "../../hooks/useList"
import { useFetch } from "../../hooks/useFetch"
import { useDebounce } from "../../hooks/useDebounce"
import { useAppContext } from "../../containers/DataProvider"
import Modal from "../common/Modal"
import Sheet from "../common/Sheet"
import Avatar from "../common/Avatar"
import BaseButton from "../base/BaseButton"
import BaseInput from "../base/BaseInput"
import classNames from "../../utils/classNames"
import getFormData from "../../utils/getFormData"

const minTeamMembers = 0
const maxTeamMembers = 2

export default function JoinTeam() {
  const { appContext } = useAppContext()

  const fetchHook = useFetch()
  const formRef = useRef(null)
  const isFirstRender = useRef(true)

  const [members, { push: pushMember, pop: popMember }] = useList([], {
      minLength: minTeamMembers,
      maxLength: maxTeamMembers,
    },
  )
  const [modalOpen, setModalOpen] = useState(false)
  const [searchString, setSearchString] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useDebounce(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    fetchHook('users/details?' + new URLSearchParams({ username: searchString }))
      .then(res => {
        setSearchResults(res.payload.details)
      })
  }, 800, [searchString])

  const addMember = useCallback(newMember => pushMember(newMember), [pushMember])

  const joinTeam = useCallback(e => {
    e.preventDefault()

    const formData = getFormData(formRef.current)

    fetchHook('new/createteam', {
      method: 'POST',
      body: JSON.stringify({
        user_id: appContext.authUser.user_id,
        team_name: formData.get('team_name'),
      })
    })
  }, [])

  return (
    <Sheet className="p-4 sm:p-6">
      <form ref={formRef} onSubmit={joinTeam}>
        <h2 className="text-2xl font-bold text-gray-50">Join team</h2>

        <div className="mt-4">
          <h3 className="mb-1 text-sm font-medium text-gray-100">Create your team</h3>

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
              Add team members
            </span>
          </button>
        </div>

        <Modal
          open={modalOpen}
          setOpen={setModalOpen}
        >
          <Dialog.Title className="mb-4 text-base lg:text-xl text-white font-semibold">
            Add team members
          </Dialog.Title>

          <BaseInput
            type="search"
            label="Search team members"
            srOnlyLabel
            placeholder="Search by username"
            value={searchString}
            onChange={ e => setSearchString(e.target.value) }
          />

          <div className="mt-3 h-60 lg:h-80 overflow-auto scrollbar">
            <ul className="divide-y divide-brown text-xs lg:text-sm">
              {
                searchResults.map(user => (
                  <li key={ user.user_id }>
                    <button
                      className="lg:px-2 py-2 w-full hover:bg-amber-900/80 text-left text-gray-100 flex items-center rounded-md transition-colors"
                      onClick={() => addMember({ name: user.name, username: user.username })}
                    >
                      <div className="w-9 h-9 lg:w-12 lg:h-12">
                        <Avatar avatarIdx={user.avatar_idx} />
                      </div>
                      <div className="ml-1 lg:ml-2 flex-grow">
                        <p className="font-semibold">{ user.name }</p>
                        <p className="text-gray-400">{ `@${user.username}` }</p>
                      </div>
                    </button>
                  </li>
                ))
              }
            </ul>
          </div>
        </Modal>

        <div className="mt-6 space-y-2">
          {
            members.map((member, i) => (
              <div key={ member.username } className="not-prose px-4 py-3 bg-amber-900/80 text-sm flex rounded-md">
                <div className="flex-grow">
                  <p className="font-semibold">{ member.name }</p>
                  <p className="text-gray-300">{ member.username }</p>
                </div>

                <div className="w-5 flex items-center">
                  <button
                    type="button"
                    className="rounded-md bg-transparent text-amber-500 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
                    onClick={() => popMember(i)}
                  >
                    <Icon icon={closeIcon} className="block" color="inherit" width='100%' height='100%' />
                  </button>
                </div>
              </div>
            ))
          }
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-4">
          {/* This component won't be rendered if there is no authentication */}
          {/* But still disabling this button for safety */}
          <BaseButton type="submit" disabled={!appContext.authenticated}>
            Join team
          </BaseButton>
        </div>
      </form>
    </Sheet>
  )
}

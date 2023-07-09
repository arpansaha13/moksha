import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import accountMultipleIcon from '@iconify-icons/mdi/account-multiple-remove-outline'
import Sheet from '../common/Sheet'
import EmptyState from '../common/EmptyState'
import fetchWithCredentials from '../../utils/fetchWithCredentials'

export default function TeamRegister() {
  const [loading, setLoading] = useState(true)
  const [createdTeam, setCreatedTeam] = useState(null)

  useEffect(() => {
    fetchWithCredentials('teams/created').then(res => {
      setLoading(false)
      setCreatedTeam(res.data)
    })
  }, [])

  if (loading) {
    return <div className='w-6 mx-auto aspect-square border-y-2 border-gray-50 rounded-full animate-spin' />
  }

  if (createdTeam === null) {
    return (
      <>
        <EmptyState icon={accountMultipleIcon} title='You are not the leader of any team' />

        <div className='mt-1 text-center text-sm text-gray-400'>
          <p>Only the leader can register in a team contest on behalf of the team.</p>
          <p>
            You can create a team{' '}
            <Link to='/teams/create' className='text-amber-600 hover:text-amber-500 font-medium transition-colors'>
              here
            </Link>
            .
          </p>
        </div>
      </>
    )
  }

  return <Sheet className='p-4 sm:p-6'>hello</Sheet>
}

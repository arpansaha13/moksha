import { useCallback, useRef, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { type FormState, useForm } from 'react-hook-form'
import { useFetch } from '~/hooks/common/useFetch'
import { useNotification } from '~/hooks/useNotification'
import type { AuthUser } from '~/types'

type EditProfileFormData = Pick<AuthUser, 'first_name' | 'last_name' | 'institution' | 'phone_no'>

export function useEditProfileController() {
  const authUser = useRef(useLoaderData() as AuthUser)

  const {
    formState,
    register: formRegister,
    handleSubmit,
    reset,
  } = useForm<EditProfileFormData>({
    defaultValues: {
      first_name: authUser.current.first_name,
      last_name: authUser.current.last_name,
      institution: authUser.current.institution,
      phone_no: authUser.current.phone_no,
    },
  })

  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)

  const [notification, { set, setAll }] = useNotification()
  const setShowNotification = useCallback((bool: boolean) => set('show', bool), [set])

  const editProfile = handleSubmit((formData: EditProfileFormData) => {
    setLoading(true)
    const formDataDiff = getDiff(formState.dirtyFields, formData)

    fetchHook('users/me', {
      method: 'PATCH',
      body: formDataDiff,
    })
      .then(res => {
        updateAuthUserData(authUser, formDataDiff)
        reset({
          first_name: authUser.current.first_name,
          last_name: authUser.current.last_name,
          institution: authUser.current.institution,
          phone_no: authUser.current.phone_no,
        })

        setAll({
          show: true,
          title: 'Profile updated!',
          description: res.message,
          status: 'success',
        })
      })
      .catch(err => {
        setAll({
          show: true,
          title: 'Failed',
          description: err.message,
          status: 'error',
        })
      })
      .finally(() => setLoading(false))
  })

  return {
    loading,
    notification,
    isDirty: formState.isDirty,
    formRegister,
    setShowNotification,
    editProfile,
  }
}

function getDiff(dirtyFields: FormState<EditProfileFormData>['dirtyFields'], formData: EditProfileFormData) {
  const diff: Partial<EditProfileFormData> = {}

  if (dirtyFields.first_name) diff.first_name = formData.first_name
  if (dirtyFields.last_name) diff.last_name = formData.last_name
  if (dirtyFields.institution) diff.institution = formData.institution
  if (dirtyFields.phone_no) diff.phone_no = formData.phone_no

  return diff
}

function updateAuthUserData(authUser: React.MutableRefObject<AuthUser>, formDataDiff: Partial<EditProfileFormData>) {
  if (formDataDiff.first_name) authUser.current.first_name = formDataDiff.first_name
  if (formDataDiff.last_name) authUser.current.last_name = formDataDiff.last_name
  if (formDataDiff.institution) authUser.current.institution = formDataDiff.institution
  if (formDataDiff.phone_no) authUser.current.phone_no = formDataDiff.phone_no
}

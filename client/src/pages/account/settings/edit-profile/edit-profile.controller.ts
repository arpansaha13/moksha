import { useCallback, useMemo, useRef, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useForm, type UseFormRegister } from 'react-hook-form'
import { useFetch } from '~/hooks/common/useFetch'
import { useNotification } from '~/hooks/useNotification'
import type { User } from '~/types'

interface EditProfileFormData {
  name: string
  institution: string
  phone_no: string
}

export function useEditProfileController() {
  const authUser = useRef(useLoaderData() as User)

  const {
    formState,
    register: formRegister,
    handleSubmit,
  } = useForm<EditProfileFormData>({
    defaultValues: {
      name: authUser.current.name,
      institution: authUser.current.institution,
      phone_no: authUser.current.phone_no,
    },
  })

  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)

  const fields = useMemo(() => getFields(formRegister), [formRegister])

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
    fields,
    notification,
    isDirty: formState.isDirty,
    setShowNotification,
    editProfile,
  }
}

function getDiff(
  dirtyFields: Partial<Readonly<Record<keyof EditProfileFormData, boolean>>>,
  formData: EditProfileFormData
) {
  const diff: Partial<EditProfileFormData> = {}

  if (dirtyFields.name) diff.name = formData.name
  if (dirtyFields.institution) diff.institution = formData.institution
  if (dirtyFields.phone_no) diff.phone_no = formData.phone_no

  return diff
}

function updateAuthUserData(authUser: React.MutableRefObject<User>, formDataDiff: Partial<EditProfileFormData>) {
  if (formDataDiff.name) authUser.current.name = formDataDiff.name
  if (formDataDiff.institution) authUser.current.institution = formDataDiff.institution
  if (formDataDiff.phone_no) authUser.current.phone_no = formDataDiff.phone_no
}

function getFields(formRegister: UseFormRegister<EditProfileFormData>) {
  // Values will be set by `formRegister` according to default values
  const fields = [
    {
      id: 'name',
      type: 'text',
      autoComplete: 'name',
      autoCapitalize: 'words',
      maxLength: 20,
      required: true,
      label: 'Name',
      ...formRegister('name'),
    },
    {
      id: 'institution',
      type: 'text',
      autoComplete: 'organization',
      autoCapitalize: 'words',
      required: true,
      minLength: 3,
      maxLength: 50,
      label: 'Institution',
      ...formRegister('institution'),
    },
    {
      id: 'phone',
      type: 'tel',
      autoComplete: 'tel',
      inputMode: 'numeric' as const,
      required: true,
      label: 'Phone number',
      pattern: '^[0-9]+$',
      title: 'This field should contain only digits',
      minLength: 10,
      maxLength: 10,
      ...formRegister('phone_no'),
    },
  ]

  return fields
}

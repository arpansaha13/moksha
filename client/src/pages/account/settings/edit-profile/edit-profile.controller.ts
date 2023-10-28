/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useFetch } from '~/hooks/common/useFetch'
import { useMap } from '~/hooks/common/useMap'
import { useNotification } from '~/hooks/useNotification'
import getFormData from '~/utils/getFormData'
import type { User } from '~/types'

type EditFormData = Pick<User, 'name' | 'phone_no' | 'institution'>

export function useEditProfileController() {
  const authUser = useRef(useLoaderData() as User)

  const fetchHook = useFetch()
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const [isFieldUpdated, { set: setFieldUpdated }] = useMap({
    name: false,
    institution: false,
    phone_no: false,
  })

  const handleChange = useCallback((value: any, field: keyof EditFormData) => {
    setFieldUpdated(field, value !== authUser.current[field])
  }, [])

  useEffect(() => {
    setDisabled(!hasUpdatedField(isFieldUpdated))
  }, [isFieldUpdated])

  const fields = useMemo(
    () => getFields(authUser.current.name, authUser.current.institution, authUser.current.phone_no, handleChange),
    []
  )

  const [notification, { set, setAll }] = useNotification()
  const setShowNotification = useCallback((bool: boolean) => set('show', bool), [])

  function editProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = getFormData(formRef.current!) as unknown as EditFormData
    const formDataDiff = getDiff(isFieldUpdated, formData)

    fetchHook('users/me', {
      method: 'PATCH',
      body: formDataDiff,
    })
      .then(res => {
        authUser.current = { ...authUser.current, ...formDataDiff }
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
  }

  return { formRef, loading, disabled, notification, fields, editProfile, setShowNotification }
}

function hasUpdatedField(isFieldUpdated: Record<keyof EditFormData, boolean>) {
  for (const bool of Object.values(isFieldUpdated)) {
    if (bool) return true
  }
  return false
}

function getDiff(isFieldUpdated: Record<keyof EditFormData, boolean>, formData: EditFormData) {
  const diff = {} as EditFormData

  if (isFieldUpdated.name) diff.name = formData.name
  if (isFieldUpdated.institution) diff.institution = formData.institution
  if (isFieldUpdated.phone_no) diff.phone_no = Number(formData.phone_no)

  return diff
}

function getFields(name: string, institution: string, phone_no: number, handleChange: any) {
  const fields = [
    {
      id: 'name',
      name: 'name',
      type: 'text',
      autoComplete: 'name',
      autoCapitalize: 'words',
      maxLength: 20,
      required: true,
      label: 'Name',
      defaultValue: name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e.target.value, 'name')
      },
    },
    {
      id: 'institution',
      name: 'institution',
      type: 'text',
      autoComplete: 'organization',
      autoCapitalize: 'words',
      required: true,
      minLength: 3,
      maxLength: 50,
      label: 'Institution',
      defaultValue: institution,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e.target.value, 'institution')
      },
    },
    {
      id: 'phone',
      name: 'phone_no',
      type: 'tel',
      autoComplete: 'tel',
      inputMode: 'numeric' as const,
      required: true,
      label: 'Phone number',
      pattern: '[0-9]{10}',
      title: 'This field should contain 10 digits',
      minLength: 10,
      maxLength: 10,
      defaultValue: phone_no,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(Number(e.target.value), 'phone_no')
      },
    },
  ]

  return fields
}

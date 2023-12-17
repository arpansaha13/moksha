export interface OtpInputProps {
  value: string
  length: number
  label: string
  required?: boolean
  setValue: (value: string) => void
  validationError?: string | null
}

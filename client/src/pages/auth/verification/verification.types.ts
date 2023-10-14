export interface OtpFormProps {
  setVerified: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ResendOtpCoolDownProps {
  onCoolDownEnd: () => void
}

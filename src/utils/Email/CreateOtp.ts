import { customAlphabet } from 'nanoid'

export const createOtp = () => {
  const code = customAlphabet('0123456789')(6)
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

  return { code, expiresAt }
}

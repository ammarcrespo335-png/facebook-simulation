import { Response } from 'express'

export const SuccessHandler = <T>({
  res,
  data = {} as T,
  status = 201,
  msg = 'Done',
}: {
  res: Response
  status?: number
  data?: T
  msg?: string
}) => {
  return res.status(status).json({ msg, data })
}

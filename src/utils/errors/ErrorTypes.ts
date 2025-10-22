export interface IAppError extends Error {
  statusCode: number
}
export class CAppError extends Error {
  constructor(msg: string, public statusCode: number, options: ErrorOptions={}) {
    super(msg, options)
  }
}
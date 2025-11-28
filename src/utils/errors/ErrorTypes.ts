export interface IAppError extends Error {
  statusCode: number
}
export class CAppError extends Error {
  constructor(
    msg: string,
    public statusCode: number,
    options: ErrorOptions = {}
  ) {
    super(msg, options)
  }
}
export class NotFoundExceptions extends CAppError {
  constructor(msg: string) {
    super(msg, 404)
  }
}

export class invalidEmailExceptions extends CAppError {
  constructor(msg: string) {
    super(msg, 404)
  }
}

export class invalidOtpExceptions extends CAppError {
  constructor(msg: string) {
    super(msg, 404)
  }
}
export class OtpExpiredExceptions extends CAppError {
  constructor(msg: string) {
    super(msg, 409)
  }
}
export class invalidCredentialsExceptions extends CAppError {
  constructor(msg: string) {
    super(msg, 400)
  }
}
export class invalidTokenExceptions extends CAppError {
  constructor(msg: string) {
    super('in-valid token', 400)
  }
}
export class NotVerifiedExceptions extends CAppError {
  constructor(msg: string) {
    super('not verified', 400)
  }
}
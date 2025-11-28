import { EventEmitter } from 'events'
import { SendEmail } from './SendEmail'

export enum EMAIL_EVENTS_ENUM {
  Verify_Email = 'VERIFY EMAIL',
  Reset_Password = 'RESET PASSWORD',
}

export class EVENTS_FOR_EMAIL {
  constructor(private readonly emitter: EventEmitter) {}
  subscribe = (event: EMAIL_EVENTS_ENUM, callback: (payLoad: any) => void) => {
    this.emitter.on(event, callback)
  }
  publish = (event: EMAIL_EVENTS_ENUM, payLoad: any) => {
    this.emitter.emit(event, payLoad)
  }
}
const emitter = new EventEmitter()
export const emailEmitter = new EVENTS_FOR_EMAIL(emitter)

emailEmitter.subscribe(
  EMAIL_EVENTS_ENUM.Verify_Email,
  ({ to, subject, html }: { to: string; subject: string; html: string }) => {
    SendEmail({ to, subject, html })
  }
)

emailEmitter.subscribe(
  EMAIL_EVENTS_ENUM.Reset_Password,
  ({ to, subject, html }: { to: string; subject: string; html: string }) => {
    SendEmail({ to, subject, html })
  }
)

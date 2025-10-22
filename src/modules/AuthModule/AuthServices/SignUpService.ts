import { SignUpSchema } from './../AuthValidation'
import type { NextFunction, Request, Response } from 'express'
import { SignUpDto } from './AuthDto'
import { Model } from 'mongoose'
import { IUser } from '../../UserModule/UserTypes'
import { UserModel } from '../../../DB/models/UserModel'
import { CAppError } from '../../../utils/errors/ErrorTypes'
import { DBRepo } from '../../../DB/DBRepo'
import { UserRepo } from '../../../DB/Repos/UserRepo'
import { hash } from '../../../utils/Security/Hash'


export class SignUpService {
  private userRepo = new UserRepo()
  signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { name, email, password }: SignUpDto = req.body
    const IsEmailExist = await this.userRepo.findByEmail({ email })
    if (IsEmailExist) {
      throw new CAppError('email is already exist ', 409)
    }
    const user = await this.userRepo.create({
      data: { name, email, password: await hash(password) } 
    })
    return res.json({ user })
  }
}

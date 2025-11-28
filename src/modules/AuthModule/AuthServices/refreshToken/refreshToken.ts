import { Request, Response, NextFunction } from 'express'
import { SuccessHandler } from '../../../../utils/SuccessHandler'
import {
  decodeToken,
  tokenTypesEnum,
} from '../../../../middleware/authMiddleware'
import { generateToken } from '../../../../utils/Security/token'

export class refreshTokenService {
  refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { authorization } = req.headers
    const user = await decodeToken({
      authorization: authorization as string,
      tokenTypes: tokenTypesEnum.REFRESH_SIGNATURE,
    })
    const accessToken = generateToken({
      payload: {
        _id: user._id,
      },
      signature: process.env.ACCESS_SIGNATURE as string,
      options: {
        expiresIn: '1h',
      },
    })

    return SuccessHandler({
      res,
      data: { accessToken },
      msg: 'Token refreshed successfully',
    })
  }
}

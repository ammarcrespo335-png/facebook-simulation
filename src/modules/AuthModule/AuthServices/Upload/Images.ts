import { Request, Response, NextFunction } from 'express'

import { SuccessHandler } from '../../../../utils/SuccessHandler'
import { HUserDocument } from '../../../UserModule/UserTypes'
import { UploadFile } from '../../../../utils/multer/s3.Services'
import { CAppError } from '../../../../utils/errors/ErrorTypes'

export class ImagesController {
  uploadProfileImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    if (!req.file) {
      throw new CAppError('Profile image is required', 400)
    }

    const user = res.locals.user as HUserDocument
    const uploaded = await UploadFile({
      file: req.file,
      path: `${user._id}/profileImage`,
    })

    user.ProfileImage = uploaded.url
    await user.save()

    return SuccessHandler({
      res,
      msg: 'Profile image uploaded successfully',
    })
  }

  uploadCoverImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const files = req.files as Express.Multer.File[]

    if (!files || files.length === 0) {
      throw new CAppError('At least one cover image is required', 400)
    }

    const user = res.locals.user as HUserDocument

    const uploaded = await Promise.all(
      files.map(file =>
        UploadFile({
          file,
          path: `${user._id}/coverImage`,
        })
      )
    )

    const uploadedUrls = uploaded.map(u => u.url)

    user.CoverImages = [...(user.CoverImages || []), ...uploadedUrls]

    await user.save()

    return SuccessHandler({
      res,
      msg: 'Cover images uploaded successfully',
      data: { uploadedUrls },
    })
  }
}

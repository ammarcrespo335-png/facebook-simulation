import { ObjectCannedACL, PutObjectCommand } from '@aws-sdk/client-s3'
import { StoreInEnum } from './multer'
import { createReadStream } from 'fs'
import { S3 } from './s3.config'
export const UploadFile = async ({
  storeIn = StoreInEnum.memory,
  Bucket = process.env.BUCKET_NAME,
  ACL = 'private',
  path = 'general',
  file,
}: {
  storeIn?: StoreInEnum
  Bucket?: string
  ACL?: ObjectCannedACL
  path?: string
  file: Express.Multer.File
}) => {
  const Key = `${process.env.APP_NAME}/${path}/${Date.now()}_${
    file.originalname
  }`

  const command = new PutObjectCommand({
    Bucket,
    ACL,
    Key: Key,
    Body:
      storeIn == StoreInEnum.memory ? file.buffer : createReadStream(file.path),
    ContentType: file.mimetype,
  })
  const result = await S3().send(command)

  return {
    result,
    url: `https://${Bucket}.s3.${process.env.REGION}.amazonaws.com/${Key}`,
  }
}

import { S3Client } from '@aws-sdk/client-s3'

export const S3 = () => {
  return new S3Client({
    region: process.env.REGION as string,
    credentials: {
      accessKeyId: process.env.AccesskeyID as string,
      secretAccessKey: process.env.SecretAccesskey as string,
    },
  })
}

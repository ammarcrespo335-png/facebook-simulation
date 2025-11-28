import nodemailer from 'nodemailer'

export const SendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) => {
  const transporterOptions = {
    secure: true,
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  }

  const transporter = nodemailer.createTransport(transporterOptions)

  const main = async () => {
    const info = await transporter.sendMail({
      from: `socialApp<${process.env.USER}>`,
      to,
      subject,
      html,
    })
  }
  main().catch(err => {
    console.log({ err })
  })
}

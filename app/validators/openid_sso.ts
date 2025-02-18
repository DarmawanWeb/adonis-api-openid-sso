import vine from '@vinejs/vine'

export default class OpenIDSSOValidator {
  static clientSchema = vine.object({
    name: vine.string(),
    redirectUri: vine.string(),
  })

  static loginSchema = vine.object({
    email: vine.string().trim().email(),
    password: vine.string(),
  })

  static registerSchema = vine.object({
    email: vine.string().trim().email(),
    password: vine.string().minLength(8).confirmed(),
  })

  static forgotPasswordSchema = vine.object({
    email: vine.string().trim().email(),
  })

  static resetPasswordSchema = vine.object({
    password: vine.string().minLength(8).confirmed(),
  })
}

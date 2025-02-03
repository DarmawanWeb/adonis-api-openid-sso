import vine from '@vinejs/vine'

export default class OpenIDSSOValidator {
  static clientSchema = vine.object({
    name: vine.string(),
    redirectUri: vine.string(),
  })
}

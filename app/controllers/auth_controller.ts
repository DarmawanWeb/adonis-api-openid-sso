import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import User from '#models/user'
import OpenIDSSOValidator from '#validators/openid_sso'
import messagesProvider from '#helpers/validation_messages_provider'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = await vine
      .compile(OpenIDSSOValidator.registerSchema)
      .validate(request.all(), { messagesProvider })

    try {
      if (await User.query().where('email', data.email).first()) {
        return response.conflict({
          success: false,
          message: 'The email has already been taken.',
        })
      }

      await User.create({ email: data.email, password: data.password })
      return response.ok({
        success: true,
        message: 'Your account has been created successfully.',
      })
    } catch (error) {
      return response.unprocessableEntity({
        success: false,
        message: 'Registration failed.',
        error: error.message,
      })
    }
  }

  async user({ auth, response }: HttpContext) {
    try {
      return response.ok({
        success: true,
        message: 'User retrieved successfully.',
        user: auth.user,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to retrieve user.',
        error: error.message,
      })
    }
  }
}

import type { HttpContext } from '@adonisjs/core/http'
import OpenidClient from '#models/openid_client'
import vine from '@vinejs/vine'
import OpenIDSSOValidator from '#validators/openid_sso'
import messagesProvider from '#helpers/validation_messages_provider'
import { v4 as uuidv4 } from 'uuid'

export default class OpenIDClientsController {
  async index({ response }: HttpContext) {
    try {
      const examples = await OpenidClient.all()
      return response.ok({
        success: true,
        message: 'OpenID clients retrieved successfully.',
        data: examples,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to retrieve OpenID clients.',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const OpenIDClientData = await OpenidClient.query().where('name', params.name).first()
      if (!OpenIDClientData) {
        return response.notFound({
          success: false,
          message: 'OpenID client not found.',
        })
      }
      return response.ok({
        success: true,
        message: 'OpenID client retrieved successfully.',
        data: OpenIDClientData,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'OpenID client failed to retrieve.',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    const data = await vine
      .compile(OpenIDSSOValidator.clientSchema)
      .validate(request.all(), { messagesProvider })
    try {
      const clientId = uuidv4()
      const clientSecret = uuidv4()
      const OpenIDClientData = await OpenidClient.create({
        ...data,
        clientId,
        clientSecret,
      })

      return response.created({
        success: true,
        message: 'OpenID client created successfully.',
        data: OpenIDClientData,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to create OpenID client.',
        error: error.message,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = await vine
      .compile(OpenIDSSOValidator.clientSchema)
      .validate(request.all(), { messagesProvider })

    try {
      const OpenIDClientData = await OpenidClient.query().where('name', params.name).first()
      if (!OpenIDClientData) {
        return response.notFound({
          success: false,
          message: 'OpenID client not found.',
        })
      }

      const clientId = uuidv4()
      const clientSecret = uuidv4()
      await OpenIDClientData.merge({
        ...data,
        clientId,
        clientSecret,
      }).save()
      return response.ok({
        success: true,
        message: 'OpenID client updated successfully.',
        data: OpenIDClientData,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to update OpenID client.',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const OpenIDClientData = await OpenidClient.query().where('name', params.name).first()
      if (!OpenIDClientData) {
        return response.notFound({
          success: false,
          message: 'OpenID client not found.',
        })
      }

      await OpenIDClientData.delete()
      return response.ok({
        success: true,
        message: 'OpenID client deleted successfully.',
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to delete OpenID client.',
        error: error.message,
      })
    }
  }
}

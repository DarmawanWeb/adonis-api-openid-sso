import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AuthCode extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string

  @column()
  declare clientId: string

  @column()
  declare userId: number

  @column()
  declare nonce: string

  @column()
  declare state: string

  @column()
  declare scopes: string

  @column()
  declare redirectUri: string

  @column.dateTime({ autoCreate: true })
  declare expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

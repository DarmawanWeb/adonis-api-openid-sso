/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'
import openidClientsRoutes from './routes/v1/openid_client_routes.js'
import authRoutes from './routes/v1/auth_routes.js'


router.get('/', async ({ response }: HttpContext) => {
  response.status(200).json({
    status: 200,
    message: 'Welcome to Adonis Api OpenID SSO',
  })
})

router
  .group(() => {
    openidClientsRoutes()
    authRoutes()
  })
  .prefix('/api/v1')

router.get('*', async ({ response }: HttpContext) => {
  response.status(404).json({
    status: 404,
    message: 'Route not found',
  })
})

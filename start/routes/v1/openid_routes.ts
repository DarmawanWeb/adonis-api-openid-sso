const OpenidsController = () => import('#controllers/openids_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

export default function openidRoute() {
  router
    .group(() => {
      router.post('/authorize', [OpenidsController, 'authorize'])
      router.post('/token', [OpenidsController, 'token'])
      router
        .group(() => {
          router.get('/user', [OpenidsController, 'me'])
        })
        .middleware(middleware.auth({ guards: ['jwt'] }))
    })
    .prefix('/openid')
}

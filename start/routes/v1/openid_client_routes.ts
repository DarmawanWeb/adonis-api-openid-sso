const OpenIDClientsController = () => import('#controllers/openid_clients_controller')
import router from '@adonisjs/core/services/router'

export default function openIDClientsRoute() {
  router
    .group(() => {
      router.get('/', [OpenIDClientsController, 'index'])
      router.post('/', [OpenIDClientsController, 'store'])
      router.get('/:name', [OpenIDClientsController, 'show'])
      router.delete('/:name', [OpenIDClientsController, 'destroy'])
      router.patch('/:name', [OpenIDClientsController, 'update'])
    })
    .prefix('/openid/clients')
}

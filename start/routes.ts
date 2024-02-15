/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import ChangelogsController from '#controllers/changelogs_controller'
import Changelog from '#models/changelog'

// Marketing
router.on('/').render('pages/home').as('home')

// Auth
router
  .group(() => {
    router.post('/signup', [AuthController, 'signup']).as('auth.signup')
    router.get('/signup', [AuthController, 'signupShow']).as('auth.signup.show')
    router.post('/login', [AuthController, 'login']).as('auth.login')
    router.get('/login', [AuthController, 'loginShow']).as('auth.login.show')
    router
      .get('/forgot-password', [AuthController, 'forgotPasswordShow'])
      .as('auth.forgot-password.show')
    router
      .get('/reset-password', [AuthController, 'resetPasswordShow'])
      .as('auth.reset-password.show')
  })
  .middleware([middleware.guest()])

// App
router
  .group(() => {
    router
      .get('/dashboard', async ({ view }) => {
        const changelogs = await Changelog.all()
        return view.render('pages/dashboard', { changelogs })
      })
      .as('dashboard')

    router.on('/settings').render('pages/user/settings').as('user.settings')
    router.on('/profile').render('pages/user/profile').as('user.profile')

    router
      .group(() => {
        router.get('/create', [ChangelogsController, 'createShow']).as('create.show')
        router.post('/create', [ChangelogsController, 'create']).as('create')

        router
          .get('/:id', async ({ view, params }) => {
            return view.render('pages/changelog/show', {
              changelog: await Changelog.findOrFail(params.id),
            })
          })
          .as('show')
        router.delete('/:id', [ChangelogsController, 'delete']).as('delete')
      })
      .prefix('/changelogs')
      .as('changelog')

    router.post('/logout', [AuthController, 'logout']).as('auth.logout')
  })
  .middleware([middleware.auth()])

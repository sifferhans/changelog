/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import User from '#models/user'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const users = User.all()

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
    router.on('/dashboard').render('pages/dashboard', { users }).as('dashboard')

    router.on('/user/settings').render('pages/user/settings').as('user.settings')
    router.on('/user/profile').render('pages/user/profile').as('user.profile')
  })
  .middleware([middleware.auth()])

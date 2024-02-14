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

router.on('/').render('pages/home').as('home')
router.on('/dashboard').render('pages/dashboard').as('dashboard')

// Auth
router.get('/signup', [AuthController, 'signupShow']).as('auth.signup')
router.get('/login', [AuthController, 'loginShow']).as('auth.login')
router.get('/forgot-password', [AuthController, 'forgotPasswordShow']).as('auth.forgot-password')
router.get('/reset-password', [AuthController, 'resetPasswordShow']).as('auth.reset-password')

router.on('/user/settings').render('pages/user/settings').as('user.settings')
router.on('/user/profile').render('pages/user/profile').as('user.profile')

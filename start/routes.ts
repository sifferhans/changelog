/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home').as('home')
router.on('/dashboard').render('pages/dashboard').as('dashboard')

// Auth
router.on('/signup').render('pages/auth/signup').as('auth.signup')
router.on('/login').render('pages/auth/login').as('auth.login')
router.on('/forgot-password').render('pages/auth/forgot-password').as('auth.forgot-password')
router.on('/reset-password').render('pages/auth/reset-password').as('auth.reset-password')

router.on('/user/settings').render('pages/user/settings').as('user.settings')
router.on('/user/profile').render('pages/user/profile').as('user.profile')

import User from '#models/user'
import { errors } from '@adonisjs/auth'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import vine from '@vinejs/vine'

export default class AuthController {
  async signupShow({ view }: HttpContext) {
    return view.render('pages/auth/signup')
  }

  async loginShow({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async forgotPasswordShow({ view }: HttpContext) {
    return view.render('pages/auth/forgot-password')
  }

  async resetPasswordShow({ view }: HttpContext) {
    return view.render('pages/auth/reset-password')
  }

  async signup({ request, response, auth, session }: HttpContext) {
    const userSchema = vine.object({
      fullName: vine.string().trim(),
      email: vine.string().trim().email(),
      password: vine.string().trim().minLength(8),
    })

    const data = await vine.validate({
      schema: userSchema,
      data: request.only(['fullName', 'email', 'password']),
    })

    try {
      const user = await User.create(data)
      await auth.use('web').login(user)

      session.flash('info', 'Welcome to Changelog!')

      return response.redirect().toRoute('dashboard')
    } catch {
      session.flash('error', 'Email is already in use')
      return response.redirect().back()
    }
  }

  async login({ request, response, auth, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      session.flash('info', 'Welcome back!')

      return response.redirect().toRoute('dashboard')
    } catch (error) {
      if (error instanceof errors.E_INVALID_CREDENTIALS) {
        session.flash('error', error.message)
      }

      return response.redirect().back()
    }
  }

  async logout({ response, auth, session }: HttpContext) {
    await auth.use('web').logout()

    session.flash('success', 'You have logged out successfully')

    return response.redirect().toRoute('auth.login.show')
  }
}

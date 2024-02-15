import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class AuthController {
  async signupShow({ view }: HttpContext) {
    return view.render('pages/auth/signup')
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

      response.redirect().toRoute('dashboard')
    } catch {
      session.flash('error', 'Email is already in use')
      response.redirect().back()
    }
  }

  async login({ request, response, auth, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      response.redirect('/dashboard')
    } catch {
      session.flash('error', 'Invalid credentials')
      response.redirect().back()
    }
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
}

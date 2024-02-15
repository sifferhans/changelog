import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class AuthController {
  async signupShow({ view }: HttpContext) {
    return view.render('pages/auth/signup')
  }

  async signup({ request, response, auth }: HttpContext) {
    const userSchema = vine.object({
      name: vine.string().trim(),
      email: vine.string().trim().email(),
      password: vine.string().trim().minLength(8),
    })

    const data = await vine.validate({
      schema: userSchema,
      data: request.only(['name', 'email', 'password']),
    })

    const user = await User.create(data)

    await auth.use('web').login(user)

    response.redirect('/dashboard')
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)

    response.redirect('/dashboard')
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

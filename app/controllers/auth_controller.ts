import type { HttpContext } from '@adonisjs/core/http'

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
}

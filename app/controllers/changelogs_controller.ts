import Changelog from '#models/changelog'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChangelogsController {
  async createShow({ view }: HttpContext) {
    return view.render('pages/changelog/create')
  }

  async create({ request, response, auth }: HttpContext) {
    const { title, body, version } = request.only(['title', 'version', 'body'])

    const changelog = await Changelog.create({
      title,
      body,
      version,
      userId: auth.user?.id,
    })

    await changelog.save()

    return response.redirect().toRoute('changelog.show', { id: changelog.id })
  }

  async delete({ request, response }: HttpContext) {
    const { id } = request.params()

    const changelog = await Changelog.findOrFail(id)
    await changelog.delete()

    return response.redirect().toRoute('dashboard')
  }
}

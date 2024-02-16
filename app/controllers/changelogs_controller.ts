import Changelog from '#models/changelog'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChangelogsController {
  async show({ view, params }: HttpContext) {
    const changelog = await Changelog.findOrFail(params.id)
    return view.render('pages/changelog/show', { changelog })
  }

  async createShow({ view }: HttpContext) {
    return view.render('pages/changelog/create')
  }

  async updateShow({ view, params }: HttpContext) {
    const changelog = await Changelog.findOrFail(params.id)
    return view.render('pages/changelog/update', { changelog })
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

  async update({ request, response }: HttpContext) {
    const { id } = request.params()
    const { title, body, version } = request.only(['title', 'body', 'version'])

    const changelog = await Changelog.findOrFail(id)

    changelog.title = title
    changelog.body = body
    changelog.version = version

    await changelog.save()

    return response.redirect().toRoute('changelog.show', { id: changelog.id })
  }
}

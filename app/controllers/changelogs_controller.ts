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

  async create({ request, response, auth, session }: HttpContext) {
    const { title, body, version } = request.only(['title', 'version', 'body'])

    const changelog = await Changelog.create({
      title,
      body,
      version,
      userId: auth.user?.id,
    })

    await changelog.save()

    session.flash('success', 'Changelog has been created')

    return response.redirect().toRoute('changelog.show', { id: changelog.id })
  }

  async delete({ request, response, session }: HttpContext) {
    const { id } = request.params()

    const changelog = await Changelog.findOrFail(id)
    await changelog.delete()

    session.flash('success', 'Changelog has been deleted')

    return response.redirect().toRoute('dashboard')
  }

  async update({ request, response, session }: HttpContext) {
    const { id } = request.params()
    const { title, body, version } = request.only(['title', 'body', 'version'])

    const changelog = await Changelog.findOrFail(id)

    changelog.title = title
    changelog.body = body
    changelog.version = version

    await changelog.save()

    session.flash('success', 'Changelog has been updated')

    return response.redirect().toRoute('changelog.show', { id: changelog.id })
  }
}

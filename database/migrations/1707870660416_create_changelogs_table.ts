import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'changelogs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at')

      table.text('title').notNullable()
      table.text('version').notNullable()
      table.text('body').nullable()

      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

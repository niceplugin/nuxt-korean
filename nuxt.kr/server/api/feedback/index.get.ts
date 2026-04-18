import { db } from '../../db/client'
import * as schema from '../../db/schema'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  return await db.select().from(schema.feedback)
})

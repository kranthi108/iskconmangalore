import type { Database } from '../db/client'
import { donations } from '../db/schema'
import { sql } from 'drizzle-orm'

export async function generateReceiptNumber(db: Database): Promise<string> {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const prefix = `ISKM-${year}${month}`

  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(donations)
    .where(sql`receipt_number LIKE ${prefix + '%'}`)

  const seq = (Number(result[0]?.count ?? 0) + 1).toString().padStart(4, '0')
  return `${prefix}-${seq}`
}

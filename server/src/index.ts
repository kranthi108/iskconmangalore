import { Hono } from 'hono'
import { cors } from 'hono/cors'
import campaigns from './routes/campaigns'
import festivals from './routes/festivals'
import contact from './routes/contact'
import volunteers from './routes/volunteers'
import donations from './routes/donations'

type Env = {
  Bindings: {
    DATABASE_URL: string
    RAZORPAY_KEY_ID: string
    RAZORPAY_KEY_SECRET: string
    CLIENT_URL: string
  }
}

const app = new Hono<Env>()

app.use(
  '/api/*',
  cors({
    origin: (origin, c) => {
      const allowed = c.env.CLIENT_URL
      if (!allowed || allowed === '*') return '*'
      return origin === allowed ? origin : ''
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  }),
)

app.route('/api/campaigns', campaigns)
app.route('/api/festivals', festivals)
app.route('/api/contact', contact)
app.route('/api/volunteers', volunteers)
app.route('/api/donations', donations)

app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }))

app.onError((err, c) => {
  console.error('Unhandled error:', err)
  return c.json(
    { success: false, message: err.message || 'Internal Server Error' },
    500,
  )
})

app.notFound((c) => {
  return c.json({ success: false, message: 'Not found' }, 404)
})

export default app

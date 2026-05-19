import { Hono } from 'hono'
import { cors } from 'hono/cors'
import campaigns from './routes/campaigns'
import festivals from './routes/festivals'
import contact from './routes/contact'
import volunteers from './routes/volunteers'
import donations from './routes/donations'
import webhook from './routes/webhook'

type Env = {
  Bindings: {
    DATABASE_URL: string
    RAZORPAY_KEY_ID: string
    RAZORPAY_KEY_SECRET: string
    RAZORPAY_WEBHOOK_SECRET: string
  }
}

const app = new Hono<Env>()

// Webhook route registered before CORS so Razorpay can POST without preflight
app.route('/api/webhook', webhook)

app.use(
  '/api/*',
  cors({
    origin: [
      'http://localhost:5173',
      'https://iskconmangalore.org',
      'https://www.iskconmangalore.org',
      'https://iskconmangalore.pages.dev',
    ],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  }),
)

app.route('/api/campaigns', campaigns)
app.route('/api/festivals', festivals)
app.route('/api/contact', contact)
app.route('/api/volunteers', volunteers)
app.route('/api/donations', donations)

app.get('/', (c) =>
  c.json({
    name: 'ISKCON Mangalore API',
    status: 'ok',
    endpoints: ['/api/campaigns', '/api/festivals', '/api/contact', '/api/volunteers', '/api/donations'],
  }),
)

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

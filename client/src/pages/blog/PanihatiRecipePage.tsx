import { motion } from 'framer-motion'
import { CalendarDays, Clock, UtensilsCrossed } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import panihatiImg from '@/assets/panihati.jpg'
import Container from '@/components/ui/Container'
import PlaceholderImage from '@/components/placeholders/PlaceholderImage'

const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } as const }

const INGREDIENTS_MILK = [
  { item: 'Chida (thick rice flakes)', qty: '350 gms', note: 'Washed and soaked in milk for 1 hour' },
  { item: 'Milk', qty: '500 ml', note: 'Boiled' },
  { item: 'Sugar', qty: '275 gms' },
  { item: 'Cardamom powder', qty: '2 tsp' },
  { item: 'Condensed milk (Amul Mithai Mate)', qty: '6 tbsp' },
  { item: 'Curds', qty: '500 ml', note: 'Beaten' },
  { item: 'Honey', qty: '3 tbsp' },
]

const FLAVOURS = [
  {
    name: 'Mango',
    colour: 'bg-amber-50 border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
    ingredient: 'Mango (diced) – 2 tbsp',
    desc: 'Bright and fruity, the sweetness of ripe mango pairs beautifully with the creamy chida-dahi base.',
  },
  {
    name: 'Jackfruit',
    colour: 'bg-yellow-50 border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-800',
    ingredient: 'Jackfruit (diced) – 2 tbsp',
    desc: 'Tropical and aromatic, diced jackfruit adds a unique chewiness and natural sweetness.',
  },
  {
    name: 'Banana',
    colour: 'bg-lime-50 border-lime-200',
    badge: 'bg-lime-100 text-lime-800',
    ingredient: 'Banana (mashed) – 2 whole',
    desc: 'Creamy mashed banana makes this the richest, most comforting of the four portions.',
  },
  {
    name: 'Jamun',
    colour: 'bg-purple-50 border-purple-200',
    badge: 'bg-purple-100 text-purple-800',
    ingredient: 'Jamun purée – 2 tbsp',
    desc: 'The deep purple jamun purée adds a tangy, slightly astringent contrast that balances the sweetness.',
  },
]

const STEPS = [
  'Soak the rice flakes in very hot milk for one hour together with sugar and cardamom powder.',
  'Once the mixture has cooled to room temperature, add condensed milk, beaten curds and honey. Mix well to combine.',
  'Divide the chida mix into four equal portions.',
  'Stir one fruit into each portion — mango, jackfruit, banana and jamun purée — one fruit per portion. Mix well.',
  'Drop 5–6 pista-stuffed rasgullas into one of the portions if desired.',
  'Serve cold and offer to the Lord with love.',
]

export default function PanihatiRecipePage() {
  return (
    <>
      <Helmet>
        <title>Panihati Chida-Dahi Recipe – Four Flavours · ISKCON Mangalore</title>
        <meta
          name="description"
          content="A delicious chida-and-dahi preparation in four different flavours — mango, jackfruit, banana and jamun — to celebrate the Panihati Cida-Dahi Festival."
        />
      </Helmet>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-maroon via-peacock-900 to-peacock-950 py-20 text-cream">
        <Container size="md" className="text-center">
          <motion.p
            {...fade}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-300"
          >
            Festival Recipe · Panihati Cida-Dahi Utsava
          </motion.p>
          <motion.h1
            {...fade}
            transition={{ delay: 0.05 }}
            className="font-heading text-4xl font-bold leading-tight text-cream sm:text-5xl"
          >
            Chida &amp; Dahi
            <span className="block text-gold-300">in Four Flavours</span>
          </motion.h1>
          <motion.p
            {...fade}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-base text-cream/80"
          >
            A blessed preparation to celebrate the Panihati festival — the pastime of Śrī Nityānanda Prabhu
            and Raghunātha Dāsa Gosvāmī.
          </motion.p>

          <motion.div
            {...fade}
            transition={{ delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Clock className="h-4 w-4 text-gold-300" />
              Soaking time: 1 hour
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <UtensilsCrossed className="h-4 w-4 text-gold-300" />
              Serves: 3–4 per flavour
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <CalendarDays className="h-4 w-4 text-gold-300" />
              4 flavours
            </span>
          </motion.div>
        </Container>
      </div>

      <section className="bg-gradient-to-b from-cream to-white py-14 md:py-20">
        <Container size="md">

          {/* ── Hero image placeholder ───────────────────────────────────── */}
          <motion.div {...fade}>
            <PlaceholderImage
              src={panihatiImg}
              alt="Panihati Chida-Dahi – Four Flavours"
              aspectRatio="wide"
              fallbackText="Panihati Chida-Dahi"
              loading="eager"
              className="mb-12 shadow-xl"
            />
          </motion.div>

          {/* ── Introduction ─────────────────────────────────────────────── */}
          <motion.div
            {...fade}
            className="mb-10 rounded-2xl border border-gold-200/60 bg-gradient-to-br from-gold-50 to-cream p-8 shadow-sm"
          >
            <p className="text-base leading-relaxed text-peacock-900/85">
              The Panihati Cida-Dahi Utsava commemorates the festival arranged by Raghunātha Dāsa on the banks
              of the Ganges at Panihati. By the mercy of Śrī Nityānanda Prabhu, chipped rice (chida) and yoghurt
              (dahi) were distributed to thousands of devotees. Here is a simple home recipe in four fruit
              flavours for you to relish and offer on this auspicious occasion.
            </p>
          </motion.div>

          {/* ── Ingredients ──────────────────────────────────────────────── */}
          <motion.div {...fade} className="mb-10">
            <h2 className="mb-5 font-heading text-2xl font-semibold text-maroon">Ingredients</h2>
            <div className="overflow-hidden rounded-2xl border border-peacock-100 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="border-b border-peacock-100 bg-peacock-50/60 text-xs uppercase tracking-wider text-peacock-700">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold">Item</th>
                    <th className="px-5 py-3 text-right font-semibold">Quantity</th>
                    <th className="hidden px-5 py-3 text-left font-semibold sm:table-cell">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {INGREDIENTS_MILK.map((row, i) => (
                    <tr
                      key={row.item}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-peacock-50/30'}
                    >
                      <td className="px-5 py-3 font-medium text-peacock-900">{row.item}</td>
                      <td className="px-5 py-3 text-right tabular-nums text-maroon font-semibold">{row.qty}</td>
                      <td className="hidden px-5 py-3 text-peacock-600 sm:table-cell">{row.note ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* ── Method ───────────────────────────────────────────────────── */}
          <motion.div {...fade} className="mb-12">
            <h2 className="mb-5 font-heading text-2xl font-semibold text-maroon">Method</h2>
            <ol className="space-y-4">
              {STEPS.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-maroon font-heading text-sm font-bold text-cream shadow">
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-base leading-relaxed text-peacock-900/85">{step}</p>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* ── Four flavours ────────────────────────────────────────────── */}
          <motion.div {...fade}>
            <h2 className="mb-2 font-heading text-2xl font-semibold text-maroon">The Four Flavours</h2>
            <p className="mb-6 text-sm text-peacock-600">
              Each portion of the chida-dahi base is mixed with one of these fruits just before serving.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {FLAVOURS.map((f) => (
                <motion.div
                  key={f.name}
                  {...fade}
                  className={`rounded-2xl border p-6 shadow-sm ${f.colour}`}
                >
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${f.badge}`}>
                    {f.name}
                  </span>
                  <p className="mt-3 text-sm font-semibold text-peacock-900">{f.ingredient}</p>
                  <p className="mt-2 text-sm leading-relaxed text-peacock-800/80">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Rasgulla tip ─────────────────────────────────────────────── */}
          <motion.div
            {...fade}
            className="mt-10 rounded-2xl border border-peacock-200/60 bg-gradient-to-br from-peacock-50/40 to-white p-7 shadow-sm"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-peacock-600">Optional Addition</p>
            <p className="mt-2 text-base leading-relaxed text-peacock-900/85">
              Drop 5–6 <span className="font-semibold text-maroon">pista-stuffed rasgullas</span> into one of
              the four portions for an extra indulgent treat. Serve all portions chilled.
            </p>
          </motion.div>

          {/* ── Closing note ─────────────────────────────────────────────── */}
          <motion.div {...fade} className="mt-12 text-center">
            <p className="font-heading text-xl italic text-maroon">
              "Hare Krishna Hare Krishna Krishna Krishna Hare Hare<br />
              Hare Rama Hare Rama Rama Rama Hare Hare"
            </p>
            <p className="mt-3 text-sm text-peacock-600">
              Offer this preparation with love and devotion to Śrī Śrī Krishna Balarāma.
            </p>
          </motion.div>

        </Container>
      </section>
    </>
  )
}

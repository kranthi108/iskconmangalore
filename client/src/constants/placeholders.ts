/**
 * Centralized placeholder media using placehold.co with Krishna / temple theme colors.
 * Format: https://placehold.co/{w}x{h}/{bg}/{fg}?text={encoded}
 */

import type { GalleryImage } from '@/types'

const P = {
  peacock: '1D4ED8',
  gold: 'D4AF37',
  cream: 'FFF8E7',
  saffron: 'FF9933',
  maroon: '6D071A',
} as const

function ph(width: number, height: number, bg: string, fg: string, text: string): string {
  return `https://placehold.co/${width}x${height}/${bg}/${fg}?text=${encodeURIComponent(text)}`
}

export const HERO_BANNER = ph(
  1920,
  800,
  P.peacock,
  P.gold,
  'ISKCON Mangalore - Divine Darshan',
)

export const KRISHNA_DARSHAN = ph(800, 600, P.maroon, P.cream, 'Sri Krishna Darshan')

export const FESTIVAL_BANNERS = {
  janmashtami: ph(1200, 600, P.peacock, P.gold, 'Sri Krishna Janmashtami'),
  gauraPurnima: ph(1200, 600, P.saffron, P.maroon, 'Gaura Purnima - Sri Chaitanya Mahaprabhu'),
  rathaYatra: ph(1200, 600, P.maroon, P.cream, 'Ratha Yatra - Lord Jagannath'),
  govardhanPuja: ph(1200, 600, P.peacock, P.cream, 'Govardhana Puja'),
  kartikMaas: ph(1200, 600, P.gold, P.maroon, 'Kartik Maas Offering'),
  narsimhaChaturdashi: ph(1200, 600, P.maroon, P.gold, 'Sri Narasimha Jayanti'),
} as const

export const SEVA_THUMBNAILS = {
  annadanam: ph(640, 400, P.saffron, P.maroon, 'Nitya Annadanam Seva'),
  goshala: ph(640, 400, P.cream, P.peacock, 'Goshala Seva'),
  gitaDistribution: ph(640, 400, P.peacock, P.gold, 'Bhagavad Gita Distribution'),
  templeConstruction: ph(640, 400, P.gold, P.maroon, 'Temple Expansion'),
} as const

/** Twelve gallery placeholders with varied aspect ratios */
export const GALLERY_IMAGES: readonly GalleryImage[] = [
  { id: 'g1', alt: 'Mangala Aarti darshan', category: 'Daily Darshan', width: 1200, height: 900 },
  { id: 'g2', alt: 'Gaura Nitai altar', category: 'Temple', width: 800, height: 1200 },
  { id: 'g3', alt: 'Janmashtami abhishekam', category: 'Festivals', width: 1600, height: 900 },
  { id: 'g4', alt: 'Kirtan procession', category: 'Events', width: 900, height: 600 },
  { id: 'g5', alt: 'Prasadam distribution', category: 'Community', width: 1000, height: 667 },
  { id: 'g6', alt: 'Morning shringar darshan', category: 'Daily Darshan', width: 768, height: 1024 },
  { id: 'g7', alt: 'Ratha Yatra cart', category: 'Festivals', width: 1400, height: 700 },
  { id: 'g8', alt: 'Temple gopuram sunrise', category: 'Temple', width: 1350, height: 900 },
  { id: 'g9', alt: 'Children program', category: 'Community', width: 960, height: 640 },
  { id: 'g10', alt: 'Lecture hall', category: 'Events', width: 1100, height: 618 },
  { id: 'g11', alt: 'Kartik deepotsava lamps', category: 'Festivals', width: 1280, height: 720 },
  { id: 'g12', alt: 'Book table - spiritual literature', category: 'Community', width: 1024, height: 1024 },
].map(({ id, alt, category, width, height }) => ({
  id,
  alt,
  category,
  width,
  height,
  src: ph(
    width,
    height,
    id.charCodeAt(1) % 2 === 0 ? P.peacock : P.maroon,
    id.charCodeAt(1) % 2 === 0 ? P.gold : P.cream,
    alt,
  ),
}))

export const LIVESTREAM_PREVIEW = ph(
  1280,
  720,
  P.maroon,
  P.gold,
  'ISKCON Mangalore Live Darshan',
)

export const TEMPLE_EXTERIOR = ph(
  1400,
  788,
  P.peacock,
  P.cream,
  'ISKCON Sri Krishna Balaram Mandir - Exterior',
)

export const TEMPLE_INTERIOR = ph(
  1400,
  788,
  P.gold,
  P.maroon,
  'Sacred Sabha Hall Interior',
)

export const DEITY_DARSHAN = ph(960, 1200, P.maroon, P.gold, 'Sri Sri Gaura Nitai Darshan')

export const FESTIVAL_GALLERY_PLACEHOLDER = ph(1200, 800, P.saffron, P.maroon, 'Festival Gallery - Add Your Photo')

export const SPIRITUAL_LECTURE = ph(
  1200,
  675,
  P.saffron,
  P.maroon,
  'Weekly Bhagavatam Lecture',
)

export const BLOG_THUMBNAILS = [
  ph(720, 400, P.peacock, P.gold, 'Faith & Kitchen - Prasadam'),
  ph(720, 400, P.maroon, P.cream, 'Understanding Bhakti Yoga'),
  ph(720, 400, P.saffron, P.maroon, 'Festivals Explained'),
  ph(720, 400, P.gold, P.peacock, 'Why Chant Hare Krishna'),
] as const

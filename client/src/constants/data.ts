import type { DarshanTiming, DonationCampaign, Festival } from '@/types'
import {
  BLOG_THUMBNAILS,
  FESTIVAL_BANNERS,
  SEVA_THUMBNAILS,
  SPIRITUAL_LECTURE,
} from '@/constants/placeholders'

export const GALLERY_CATEGORIES = [
  'All',
  'Festivals',
  'Daily Darshan',
  'Temple',
  'Events',
  'Community',
] as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Festivals', href: '/festivals' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Live Darshan', href: '/live-darshan' },
  { label: 'Resources', href: '/resources' },
  { label: 'Projects', href: 'https://projects.iskconmangalore.org/' },
  { label: 'Contact', href: '/contact' },
] as const

export const SOCIAL_LINKS = [
  { label: 'YouTube', href: 'https://www.youtube.com/@ISKCONMangalore_Cultural', ariaLabel: 'ISKCON Mangalore on YouTube' },
  { label: 'Instagram', href: 'https://www.instagram.com/iskconmangalore', ariaLabel: 'ISKCON Mangalore on Instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/iskconmangalore', ariaLabel: 'ISKCON Mangalore on Facebook' },
  { label: 'Twitter', href: 'https://twitter.com/iskconmangalore', ariaLabel: 'ISKCON Mangalore on X (Twitter)' },
] as const

export const TEMPLE_INFO = {
  name: 'ISKCON Sri Krishna Balaram Mandir',
  address: 'PVS Kalakunj, Mangalore, Karnataka 575002',
  phone: '+91 9686107444',
  email: 'contact@iskconmangalore.org',
} as const

export const DARSHAN_TIMINGS: readonly DarshanTiming[] = [
  {
    name: 'Mangala Aarti',
    time: '4:30 AM',
    description: 'The first arati of the day to greet Their Lordships with prayer and kirtan.',
    icon: 'Sunrise',
  },
  {
    name: 'Shringar Darshan',
    time: '7:15 AM',
    description: 'Darshan of Sri Sri Krishna Balarama in freshly adorned flower dress.',
    icon: 'Flower2',
  },
  {
    name: 'Raj Bhog Aarti',
    time: '12:00 PM',
    description: 'Grand offering at noon expressing gratitude for midday prasadam.',
    icon: 'UtensilsCrossed',
  },
  {
    name: 'Utthapana Aarti',
    time: '4:15 PM',
    description: 'Afternoon awakening with gentle lamps and hymns as the Lords rise from rest.',
    icon: 'FlameKindling',
  },
  {
    name: 'Sandhya Aarti',
    time: '6:30 PM',
    description: 'Evening greeting as lamps glow and harinama floods the Sabha hall.',
    icon: 'Sunset',
  },
  {
    name: 'Shayana Aarti',
    time: '8:15 PM',
    description: 'The final seva of the day as the Deities peacefully retire for rest.',
    icon: 'MoonStar',
  },
]

/** Mirrors planned backend seed slug set for curated cards on marketing pages. */
export interface FeaturedCampaignCard {
  slug: string
  title: string
  subtitle: string
  category: DonationCampaign['category']
  description: string
  suggestedAmounts: number[]
  bannerImage: string
  donorCount: number
}

export const FEATURED_CAMPAIGNS: readonly FeaturedCampaignCard[] = [
  {
    slug: 'janmashtami',
    title: 'Sri Krishna Janmashtami',
    subtitle: 'Appearance day of Bhagavan Sri Krishna — abhishek, kirtan, and offerings.',
    category: 'festival',
    description:
      'Join sevaks across Mangalore in preparing garlands, decorations, sweets, abhishek items, kirtan, and prasadam for the joyous advent of Krishna.',
    suggestedAmounts: [501, 1108, 5001],
    bannerImage: FESTIVAL_BANNERS.janmashtami,
    donorCount: 842,
  },
  {
    slug: 'gaura-purnima',
    title: 'Gaura Purnima Festival',
    subtitle: 'Celebrate the munificent incarnation of mercy, Sri Caitanya Mahaprabhu.',
    category: 'festival',
    description:
      'Support evening abhishek, mahaprasadam, Harinama, and cultural programs illuminating the sankirtan mission of Nitai-Gauranga.',
    suggestedAmounts: [351, 751, 2501],
    bannerImage: FESTIVAL_BANNERS.gauraPurnima,
    donorCount: 601,
  },
  {
    slug: 'nitya-annadanam',
    title: 'Nitya Annadanam',
    subtitle: 'Daily honoring of Lord Vishnu-tattva through sanctified lunchtime prasadam.',
    category: 'seva',
    description:
      'Sponsor seasonal vegetables, rice, lentils, firewood, cookware maintenance, and sevaka honorariums sustaining daily annadan.',
    suggestedAmounts: [108, 501, 2108],
    bannerImage: SEVA_THUMBNAILS.annadanam,
    donorCount: 1_203,
  },
  {
    slug: 'goshala-seva',
    title: 'Goshala Seva',
    subtitle: 'Care for protected cows as an integral limb of Vedic culture.',
    category: 'seva',
    description:
      'Fund green fodder, veterinary care, shelter repairs, and winter blankets for the goshala serving Lord Krishna’s beloved cows.',
    suggestedAmounts: [501, 1108, 5100],
    bannerImage: SEVA_THUMBNAILS.goshala,
    donorCount: 411,
  },
  {
    slug: 'gita-distribution',
    title: 'Bhagavad-gita Distribution',
    subtitle: 'Place the song of God in every sincere seeker’s hands.',
    category: 'special',
    description:
      'Print softcover Gitas, sponsor college outreach tables, and cover shipping for youth and professionals requesting spiritual literature.',
    suggestedAmounts: [251, 751, 3001],
    bannerImage: SEVA_THUMBNAILS.gitaDistribution,
    donorCount: 708,
  },
  {
    slug: 'kartik-maas',
    title: 'Kartik Maas Offering',
    subtitle: 'Special month of Urja-vrata with deepotsava, lamp offerings, and Damodar songs.',
    category: 'monthly',
    description:
      'Support hand-dipped ghee lamps, silk vestments, flower garlands, and festival prasadam during the holiest month for Sri Damodara.',
    suggestedAmounts: [108, 501, 2108],
    bannerImage: FESTIVAL_BANNERS.kartikMaas,
    donorCount: 934,
  },
]

export interface FeaturedFestivalCard {
  slug: string
  title: string
  subtitle: string
  description: string
  date: string
  endDate?: string
  bannerImage: string
  schedule: Festival['schedule']
  featured: boolean
  order: number
}

export const FEATURED_FESTIVALS: readonly FeaturedFestivalCard[] = [
  {
    slug: 'janmashtami',
    title: 'Sri Krishna Janmashtami',
    subtitle: 'Midnight abhishek and harinama until dawn',
    description:
      'Experience special darshan, vibrant kirtan, youth dramas, and Mahaprasadam celebrating the appearance of Lord Krishna.',
    date: '2026-09-04',
    endDate: '2026-09-05',
    bannerImage: FESTIVAL_BANNERS.janmashtami,
    schedule: [
      { time: '5:00 PM', event: 'Children cultural program' },
      { time: '8:00 PM', event: 'Maha abhishek preparation' },
      { time: '12:00 AM', event: 'Midnight arati & abhishek' },
    ],
    featured: true,
    order: 1,
  },
  {
    slug: 'gaura-purnima',
    title: 'Gaura Purnima',
    subtitle: 'Appearance of Sri Caitanya Mahaprabhu',
    description:
      'Grand abhishek of Sri Sri Gaura Nitai, sankirtan through the streets, and feasts honoring the Panca-tattva.',
    date: '2026-03-14',
    bannerImage: FESTIVAL_BANNERS.gauraPurnima,
    schedule: [
      { time: '4:30 AM', event: 'Mangala arati' },
      { time: '6:30 PM', event: 'Abhishek & kirtan' },
      { time: '8:30 PM', event: 'Mahaprasadam' },
    ],
    featured: true,
    order: 2,
  },
  {
    slug: 'ratha-yatra',
    title: 'Ratha Yatra',
    subtitle: 'Chariot festival of Lord Jagannath',
    description:
      'Pull the giant ratha of Their Lordships through NH-75 with kirtan, honoring Lord Jagannath’s merciful procession.',
    date: '2026-07-06',
    bannerImage: FESTIVAL_BANNERS.rathaYatra,
    schedule: [
      { time: '8:00 AM', event: 'Pahandi & Ratha inauguration' },
      { time: '10:00 AM', event: 'Grand procession on NH-75' },
      { time: '2:00 PM', event: 'Maha mahaprasadam' },
    ],
    featured: true,
    order: 3,
  },
  {
    slug: 'govardhana-puja',
    title: 'Govardhana Puja & Annakut',
    subtitle: 'Offering devotion to Krishna’s lifting of Govardhana Hill',
    description:
      'Mountains of sanctified sweets, cereals, preparations, lamps, arati — remembering how Vraja’s residents placed faith in Krishna alone.',
    date: '2026-11-10',
    endDate: '2026-11-11',
    bannerImage: FESTIVAL_BANNERS.govardhanPuja,
    schedule: [
      { time: '4:30 AM', event: 'Mangala arati & abhishek' },
      { time: '11:30 AM', event: 'Govardhana darshana & elaborate annakuta' },
      { time: '6:30 PM', event: 'Go-puja & evening kirtan' },
    ],
    featured: false,
    order: 4,
  },
  {
    slug: 'kartik-maas-mahotsava',
    title: 'Kartik Maas Deepotsava',
    subtitle: 'Month-long Urja-vrata culminating in joyous lamp seva',
    description:
      'Thousands of diyas illuminate the Sabha hall each evening alongside Damodarashtaka, Urja vrata vows, Tulasi parikrama, and prasadam sevas.',
    date: '2026-11-06',
    endDate: '2026-12-05',
    bannerImage: FESTIVAL_BANNERS.kartikMaas,
    schedule: [
      { time: '6:00 PM', event: 'Daily Damodar arati & deepotsava' },
      { time: '7:30 PM', event: 'Srimad Bhagavatam discourse' },
      { time: '8:30 PM', event: 'Prasadam' },
    ],
    featured: true,
    order: 5,
  },
  {
    slug: 'narasimha-chaturdashi',
    title: 'Sri Narasimha Jayanti',
    subtitle: 'Ugra-nrisimha seva appeasing devotees and dissolving calamities',
    description:
      'Abhishek to Lord Narasimhadeva, special kirtana, Sanskrit recitations celebrating the fearless protector form of Hari.',
    date: '2026-05-04',
    bannerImage: FESTIVAL_BANNERS.narsimhaChaturdashi,
    schedule: [
      { time: '4:45 AM', event: 'Herbal abhishek' },
      { time: '11:45 AM', event: 'Raj Bhog & Sanskrit homages' },
      { time: '6:45 PM', event: 'Ugra-varaha aratik & procession' },
    ],
    featured: false,
    order: 6,
  },
]

export const BHAJAN_LIST = [
  {
    title: 'Madhurashtakam — Madhurashtakam Bliss',
    artist: 'Sacinandana Swami live kirtan',
    duration: '12:58',
  },
  {
    title: 'Govindam Adi Purusham Tam Aham Bhajami',
    artist: 'George Harrison ensemble',
    duration: '05:43',
  },
  {
    title: 'Prayers to Lotus Feet of Nitai-Gauranga',
    artist: 'Madhava Prabhu chorus',
    duration: '18:06',
  },
  {
    title: 'Bhaja Govindam (Moksamulgam)',
    artist: 'Keshava Madhava Prabhuji',
    duration: '07:52',
  },
  {
    title: 'Namami Narasimha',
    artist: 'Sri Prahlad family kirtan',
    duration: '09:16',
  },
] as const

export const SPIRITUAL_RESOURCES = [
  {
    title: 'Bhagavad Gita As It Is',
    description: 'Srila Prabhupada’s crown-jewel commentary arranged for earnest daily study circles.',
    coverImage: BLOG_THUMBNAILS[2],
    href: '/resources/bhagavad-gita-as-it-is',
  },
  {
    title: 'Srimad Bhagavatam',
    description:
      'Mature devotees relish the nectar of the Bhagavatam through weekly canto discussions and Sunday feasts anchored in Hari-katha.',
    coverImage: BLOG_THUMBNAILS[0],
    href: '/resources/bhagavatam',
  },
  {
    title: 'Srila Prabhupada Lectures Archive',
    description:
      'Access curated excerpts from Vyasa-Puja compilations spanning Los Angeles mornings to Mayapur Vyasa puja moods.',
    coverImage: SPIRITUAL_LECTURE,
    href: '/resources/prabhupada-lectures',
  },
  {
    title: 'Bhajan Anthology Companion',
    description:
      'Follow along bilingual lyrics ideal for newcomers leading home programs or deepening japa accompaniment.',
    coverImage: BLOG_THUMBNAILS[3],
    href: '/resources/bhajan-collection',
  },
] as const
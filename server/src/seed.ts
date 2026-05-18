import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from './config/db.js';
import { DonationCampaign } from './models/DonationCampaign.js';
import { Festival } from './models/Festival.js';

const SHARED_AMOUNTS = [108, 501, 1008, 5008, 10808];

const CAMPAIGN_SEEDS = [
  {
    slug: 'janmashtami',
    title: 'Janmashtami Festival',
    subtitle: 'Celebrate the divine appearance of Lord Krishna',
    category: 'festival' as const,
    description:
      'Your offering supports Śrī Kṛṣṇāṣṭamī festivities at ISKCON Mangalore: abhiṣeka, kīrtana, Śrīmad-Bhāgavatam narration, children’s seva, prasad distribution for guests, deity care, and safe crowd hospitality.',
    spiritualImportance:
      'Supporting Janmastami seva helps share the mercy of the Lord appearing in Śrī Vṛndāvana Dhāma—and awakening hearts—through Śrīla Prabhupāda’s movement.',
    sloka: {
      text: 'yadā yadā hi dharmasya glānir bhavati bhārata … tatrātmānaṃ sṛjāmyaham',
      translation:
        'Whenever there is a decline of righteous practice, I manifest to revive genuine spiritual principle.',
      reference: 'Bhagavad-gītā 4.7–8',
    },
    bannerImage: '/images/campaigns/janmashtami-banner.jpg',
    galleryImages: [] as string[],
    suggestedAmounts: SHARED_AMOUNTS,
    festivalDate: new Date('2026-08-26'),
    startDate: new Date('2026-08-20'),
    endDate: new Date('2026-08-26'),
    active: true,
    donorCount: 96,
    seoMetadata: {
      title: 'Janmashtami Seva • ISKCON Mangalore',
      description:
        'Honor Lord Krishna’s appearance with offerings toward temple festival programs.',
      keywords: [
        'ISKCON Mangalore',
        'Janmashtami',
        'Krishna',
        'dana',
        'temple seva',
      ],
    },
    themeConfig: { primaryColor: '#B45309', secondaryColor: '#78350F' },
  },
  {
    slug: 'gaura-purnima',
    title: 'Gaura Purnima',
    subtitle: 'Appearance festival of Śrī Caitanya Mahāprabhu',
    category: 'festival' as const,
    description:
      'Donations support abhiṣeka, śāstra classes, dramas, Śrī Gaura līlā kathā, prasad for pilgrims, book stands, sankīrtana facilitation, altar flowers, multilingual hospitality, goshāla visitations, childrens’ narration circles.',
    spiritualImportance:
      'Mercy manifests freely through Śrī Caitanya; giving on Gauṛa-pūrṇimā joins that sankīrtana mission.',
    sloka: {
      text: 'anarpita-carīṁ cirāt karuṇayāvatīrṇaḥ kalau samarpayitum unmukheśayā',
      translation:
        'Compassion withheld for aeons descended as Śrī Caitanya to distribute bhakti in Kali-yuga.',
      reference: 'Śrī ṣaḍ-goswāmi-ṣṭaka',
    },
    bannerImage: '/images/campaigns/gaura-purnima-banner.jpg',
    galleryImages: [] as string[],
    suggestedAmounts: SHARED_AMOUNTS,
    festivalDate: new Date('2026-03-04'),
    startDate: new Date('2026-03-01'),
    endDate: new Date('2026-03-04'),
    active: true,
    donorCount: 82,
    seoMetadata: {
      title: 'Gaura Purnima Seva • ISKCON Mangalore',
      description:
        'Celebrate Śrī Caitanya Mahāprabhu with joyful kīrtana, śāstra, and feast prasad.',
      keywords: ['ISKCON Mangalore', 'Gaura Purnima', 'Mahaprabhu', 'harinama'],
    },
    themeConfig: { primaryColor: '#B45309', secondaryColor: '#78350F' },
  },
  {
    slug: 'nitya-annadanam',
    title: 'Nitya Annadānam',
    subtitle: 'Daily nourishing prasad for visitors and devotees',
    category: 'monthly' as const,
    description:
      'Maintain the deity kitchen sanctifying grains for weekday programs, pilgrims, sankīrtana groups, childrens’ picnics honoring prasad, monks, Sanskrit students, and goshāla sevaks.',
    spiritualImportance:
      'Anna-dāna nurtures remembrance of Śrī Kṛṣṇa via sanctified hospitality.',
    sloka: {
      text: 'annād bhavanti bhūtāni parjanyād anna-sambhavaḥ',
      translation:
        'All embodied beings flourish when food remembers its spiritual root in śāstriya sacrifice.',
      reference: 'Bhagavad-gītā 3.14',
    },
    bannerImage: '/images/campaigns/annadanam-banner.jpg',
    galleryImages: [],
    suggestedAmounts: SHARED_AMOUNTS,
    active: true,
    donorCount: 214,
    seoMetadata: {
      title: 'Nitya Annadānam • ISKCON Mangalore',
      description: 'Sustain daily sanctified meals and welcoming hospitality.',
      keywords: ['ISKCON Mangalore', 'annadanam', 'prasadam', 'charity'],
    },
    themeConfig: { primaryColor: '#B45309', secondaryColor: '#78350F' },
  },
  {
    slug: 'goshala-seva',
    title: 'Goshāla Seva',
    subtitle: 'Care for Śrī Kṛṣṇa’s cows',
    category: 'seva' as const,
    description:
      'Sponsor organic fodder, veterinary care, sheltered barns, water systems, goshāla training for youth, cow appreciation outreach, Śrī Kṛṣṇa’s pastoral līlā storytelling nights, calf nurture programs.',
    spiritualImportance:
      'Cow protection recalls Vṛndāvana’s mood and Gauḓīya Vaiṣṇava culture.',
    sloka: {
      text: 'dhenūnām asmi kāmadhuk',
      translation: 'Among cows I am kāmadhenu yielding selfless nourishment.',
      reference: 'Bhagavad-gītā 10.28',
    },
    bannerImage: '/images/campaigns/goshala-banner.jpg',
    galleryImages: [],
    suggestedAmounts: SHARED_AMOUNTS,
    active: true,
    donorCount: 58,
    seoMetadata: {
      title: 'Goshāla Seva • ISKCON Mangalore',
      description: 'Maintain compassionate upkeep for goshāla residents.',
      keywords: ['ISKCON Mangalore', 'goshala', 'cow protection', 'seva'],
    },
    themeConfig: { primaryColor: '#B45309', secondaryColor: '#78350F' },
  },
  {
    slug: 'gita-distribution',
    title: 'Śrīmad Bhagavad-gītā Distribution',
    subtitle: 'Place Bhaktivedanta Bhagavad-gītās in appreciative hands',
    category: 'special' as const,
    description:
      'Finance Bhagavad-gītā outreach across colleges, libraries, multilingual meditation gatherings, childrens’ Sanskrit clubs, and sankīrtana book carts carrying śāstriya narration from Śrīla Prabhupāda.',
    spiritualImportance:
      'Wisdom literature directs seekers toward direct remembrance of Śrī Kṛṣṇa.',
    sloka: {
      text: 'ātma-vidyā-vyatṛktaṁ jagat',
      translation: 'Education without self-knowledge binds; bhakti-śāstra frees the sincere.',
      reference: 'Śrimad Bhāgavatam 7.9.43 (spiritual gist)',
    },
    bannerImage: '/images/campaigns/gita-distribution-banner.jpg',
    galleryImages: [],
    suggestedAmounts: SHARED_AMOUNTS,
    active: true,
    donorCount: 121,
    seoMetadata: {
      title: 'Bhagavad-gītā Distribution • ISKCON Mangalore',
      description: 'Sponsor Śrīla Prabhupāda’s Bhagavad-gītā editions for seekers.',
      keywords: ['ISKCON Mangalore', 'Bhagavad Gita', 'book distribution'],
    },
    themeConfig: { primaryColor: '#B45309', secondaryColor: '#78350F' },
  },
  {
    slug: 'kartik-maas',
    title: 'Kārtika Māsa Deepotsava',
    subtitle: 'Śrī Dāmodara month offerings',
    category: 'festival' as const,
    description:
      'Fund lamps, childrens’ lanterns, floral arcana, Śrī Dāmodarāṣṭakam kīrtana, Śruti classes deepening vows, goshāla night lamps honoring peaceful herds.',
    spiritualImportance:
      'Merciful deeds in Kārtika amplify remembrance of Śrī Dāmodara as Hari-bhakti-vilāsa describes.',
    sloka: {
      text: 'namāmīśvaraṃ sakala-bhūvanādābhayaika-dvandvaṃ ',
      translation:
        'I bow to the Lord whose curling locks delighted Mother Yaśodā fastening protective cords.',
      reference: 'Śrī Dāmodarāṣṭaka',
    },
    bannerImage: '/images/campaigns/kartik-banner.jpg',
    galleryImages: [],
    suggestedAmounts: SHARED_AMOUNTS,
    festivalDate: new Date('2026-11-06'),
    startDate: new Date('2026-10-26'),
    endDate: new Date('2026-11-06'),
    active: true,
    donorCount: 143,
    seoMetadata: {
      title: 'Kārtika Māsa Offering • ISKCON Mangalore',
      description:
        'Sponsor Śrī Dāmodara month festivities and devotional programs.',
      keywords: ['ISKCON Mangalore', 'Kartik', 'Damodara', 'deepotsava'],
    },
    themeConfig: { primaryColor: '#B45309', secondaryColor: '#78350F' },
  },
];

const FESTIVAL_SEEDS = [
  {
    slug: 'janmashtami',
    title: 'Janmashtami',
    subtitle: 'Śrī Kṛṣṇāṣṭamī',
    description:
      'Celebrate midnight abhishek honoring Lord Krishna’s appearance with kīrtana, childrens’ dramas, feast prasad, Śrīmad-Bhāgavatam narration, goshāla visit, multilingual book pavilion.',
    date: new Date('2026-08-26'),
    endDate: new Date('2026-08-27'),
    schedule: [
      { time: '04:40', event: 'Mangala ārati & parikrama' },
      { time: '07:30', event: 'Śrimad Bhāgavatam class — Śrī Kṛṣṇāvatāra līlās' },
      { time: '10:45', event: 'Śṛṅgāra ārati & childrens seva offering' },
      { time: '18:30', event: 'Evening sankīrtana building toward mahābhiseka' },
      { time: '20:55', event: 'Maha-abhiṣeka, ārati & midnight darśana' },
    ],
    bannerImage: '/images/festivals/janmashtami-banner.jpg',
    galleryImages: [] as string[],
    livestreamUrl: 'https://example.com/live/janmastami-mangalore',
    active: true,
    featured: true,
    order: 10,
  },
  {
    slug: 'gaura-purnima',
    title: 'Gaura Purnima',
    subtitle: 'Appearance of Śrī Caitanya Mahāprabhu',
    description:
      'Honor Mahāprabhu with abhiṣeka, nagara-sankīrtana, drama, Śrī Gaura līlā kīrtana & mahā-prasād honoring sankīrtana movement.',
    date: new Date('2026-03-04'),
    endDate: new Date('2026-03-04'),
    schedule: [
      { time: '04:55', event: 'Gaura Maṅgala darśana' },
      { time: '08:05', event: 'Caitanya-caritāmṛta narration & śāstra class' },
      { time: '11:35', event: 'Guru-pūjā & noon ārati' },
      { time: '17:50', event: 'Nagar-sankīrtana through temple precincts' },
      { time: '19:05', event: 'Gaura-abhiṣeka followed by ecstatic feast prasad' },
    ],
    bannerImage: '/images/festivals/gaura-purnima-banner.jpg',
    galleryImages: [],
    livestreamUrl: 'https://example.com/live/gaura-purnima',
    active: true,
    featured: true,
    order: 20,
  },
  {
    slug: 'ratha-yatra',
    title: 'Ratha Yatra',
    subtitle: 'Jagannātha’s chariot journey',
    description:
      'Pull flower-covered raths for Śrī Jagannātha, Baladeva and Subhadrā with tumultuous kīrtana, honoring Śrīla Prabhupāda’s worldwide Ratha carts.',
    date: new Date('2026-06-28'),
    endDate: new Date('2026-06-28'),
    schedule: [
      { time: '07:05', event: 'Māṅgala-snāna & Śruti smaraṇa honoring Purī lineage' },
      { time: '09:20', event: 'Garland stitching & brass polishing seva' },
      { time: '11:05', event: 'Guru-pūjā & Śruti recitation honoring Lord Puruṣottama' },
      { time: '15:55', event: 'Pulling ropes blessed by senior devotees & prasad booths open' },
      { time: '17:05', event: 'Śobhā-yātrā begins with roaring mahā-mantra resounding shoreline roads' },
      { time: '19:25', event: 'Ratha stationary ārati, darśana & mahā-feast honoring Jagannātha Swami' },
    ],
    bannerImage: '/images/festivals/ratha-yatra-banner.jpg',
    galleryImages: [],
    livestreamUrl: 'https://example.com/live/ratha-mangalore',
    active: true,
    featured: true,
    order: 30,
  },
  {
    slug: 'govardhan-puja',
    title: 'Govardhan Puja',
    subtitle: 'Annakūṭa offering honoring Giri-Govardhana',
    description:
      'Offer thousands of honoring dishes, kīrtana glorifying Śrī Kṛṣṇa lifting Govardhana, childrens dramas, Śrīmad Bhāgavatam class on fearless devotion.',
    date: new Date('2026-11-15'),
    endDate: new Date('2026-11-15'),
    schedule: [
      { time: '05:05', event: 'Mangala ārati with Śruti lamp circumambulation' },
      { time: '08:55', event: 'Śrimad Bhāgavatam class — Govardhana līlā' },
      { time: '11:25', event: 'Cow appreciation procession & goshāla darśana' },
      { time: '15:05', event: 'Annakūṭa mountain assembly & devotional rice artistry' },
      { time: '18:25', event: 'Giri-mahārati followed by Śruti gratitude feast honoring caretakers & guests' },
    ],
    bannerImage: '/images/festivals/govardhan-banner.jpg',
    galleryImages: [],
    livestreamUrl: 'https://example.com/live/govardhan',
    active: true,
    featured: false,
    order: 40,
  },
  {
    slug: 'kartik-maas',
    title: 'Kartik Maas',
    subtitle: 'Śrī Dāmodara month',
    description:
      'Lantern seva, childrens’ diyā offerings, Śrī Dāmodarāṣṭakam kīrtana, Śruti classes deepening vows for attentive remembrance throughout holy month.',
    date: new Date('2026-10-29'),
    endDate: new Date('2026-11-06'),
    schedule: [
      { time: '05:55', event: 'Brahma-muhūrta japā emphasizing Dāmodara mantra paddhati' },
      { time: '08:05', event: 'Śrīmad Bhāgavatam narrations on Śrī Dāmodara līlā' },
      { time: '17:40', event: 'Sāndhya deepa-dāna with congregational Śruti kīrtana' },
      { time: '19:05', event: 'Śṛṅgāra ārati, childrens lanterns & mahā-prasāda honoring gratitude vows' },
    ],
    bannerImage: '/images/festivals/kartik-banner.jpg',
    galleryImages: [],
    livestreamUrl: 'https://example.com/live/kartik',
    active: true,
    featured: false,
    order: 50,
  },
  {
    slug: 'narsimha-chaturdashi',
    title: 'Narsimha Chaturdashi',
    subtitle: 'Appearance of Lord Narasiṁha',
    description:
      'Celebrate protective incarnation with abhiṣeka, Śrimad Bhāgavatam CantoSeven readings, courageous kīrtana, childrens storytelling on Prahlāda’s faith.',
    date: new Date('2026-05-22'),
    endDate: new Date('2026-05-22'),
    schedule: [
      { time: '05:05', event: 'Mangala ārati with Śruti drum honoring lion-man deity' },
      { time: '08:10', event: 'Saptama-skandha class unfolding Prahlāda caritra' },
      { time: '11:05', event: 'Homa invoking protective potency of Hari' },
      { time: '17:40', event: 'Nṛsiṁha yāga rhythms & Śruti kīrtana lauding devotional fearlessness' },
      { time: '19:05', event: 'Abhiṣeka with scented waters & Śruti ārati circling deity hall' },
    ],
    bannerImage: '/images/festivals/narsimha-banner.jpg',
    galleryImages: [],
    livestreamUrl: 'https://example.com/live/narsimha',
    active: true,
    featured: false,
    order: 60,
  },
];

async function upsertCampaigns(): Promise<void> {
  for (const doc of CAMPAIGN_SEEDS) {
    await DonationCampaign.findOneAndUpdate(
      { slug: doc.slug },
      { $set: doc },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
    );
  }
}

async function upsertFestivals(): Promise<void> {
  for (const doc of FESTIVAL_SEEDS) {
    await Festival.findOneAndUpdate(
      { slug: doc.slug },
      { $set: doc },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
    );
  }
}

async function main(): Promise<void> {
  await connectDatabase();
  await upsertCampaigns();
  await upsertFestivals();
  await mongoose.disconnect();
}

main()
  .then(() => console.log('Database seeded successfully'))
  .catch((err) => {
    console.error('Seed failed', err);
    process.exit(1);
  });

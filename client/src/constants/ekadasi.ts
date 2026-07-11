/**
 * ISKCON Ekadasi Calendar — 2026
 * Update this file annually with the new year's dates.
 * All dates and times are IST (Indian Standard Time).
 */
import mohiniekadasiImg from '@/assets/ekadasi/mohiniekadasi.png'
import paramaekadasiImg from '@/assets/ekadasi/paramaekadasi.png'
import ekadasiImg from '@/assets/ekadasi/ekadasi.png'
import yoginiekadasiImg from '@/assets/ekadasi/YoginiEkadasi.png'
import pandava from '@/assets/ekadasi/pandavaekadasi.png'

export interface Ekadasi {
  slug: string
  name: string
  date: string
  paksha: 'Krishna' | 'Shukla'
  description: string
  significance: string
  pastime: string
  banner: string
}
export const PARAMA_EKADASHI_STORY = `Lord Krishna Begins the Narration

    The Supreme Personality of Godhead, Lord Sri Krishna, replied:

    "O Yudhishthira, this meritorious day is called Parama Ekadashi. It bestows the great benediction of an enjoyable life and ultimate liberation from birth and death. The process for observing it is similar to the Ekadashi that occurs during the bright fortnight of Kartika. One should worship Me with full love and devotion.

    Once there lived a pious brahmana named Sumedha in Kampilya along with his chaste wife Pavitra. Due to reactions from previous lives, Sumedha suffered from extreme poverty. Despite their hardships, Pavitra remained devoted and faithfully served her husband. Even when guests arrived, she would offer them her own food.

    Seeing their suffering, Sumedha wished to travel abroad to earn wealth. Pavitra, however, explained that wealth and fortune are largely the result of charity performed in previous lives. She requested him not to leave her alone and encouraged him to remain satisfied with whatever destiny provided.

    One day the great sage Kaundinya visited their home. The couple respectfully welcomed him and served him according to their means. Pavitra then asked the sage how they could overcome their poverty.

    Kaundinya Muni replied that Parama Ekadashi, observed during the dark fortnight of the extra month (Purushottama Masa), destroys sins and removes the miseries of poverty. He instructed them to observe the fast, worship Lord Hari, remain awake throughout the night singing His glories, and afterwards perform the five-day Pancharatrika vrata.

    The sage explained that this observance had previously blessed great personalities such as Kuvera and King Harishchandra.

    Following the instructions carefully, Sumedha and Pavitra observed Parama Ekadashi and the Pancharatrika fast. Soon afterward, a prince arrived on the order of Lord Brahma and gifted them a beautiful residence and an entire village for their livelihood. They lived happily and, at the end of their lives, attained the abode of Lord Vishnu.

    Lord Krishna concluded by explaining that the merits gained from observing Parama Ekadashi are immeasurable. Such observance is equal to performing many great acts of charity, visiting holy places, and conducting sacred rituals. One who faithfully observes this Ekadashi becomes freed from sins and ultimately attains Vishnuloka.

    Thus ends the narration of the glories of Parama Ekadashi from the Skanda Purana.`;

export const EKADASI_LIST: Ekadasi[] = [
  {
    slug: 'shat-tila',
    name: 'Shat-Tila Ekadasi',
    date: '2026-01-14',
    paksha: 'Krishna',
    description: 'Observing this Ekadasi and donating sesame seeds (tila) in six ways removes sins accumulated over many lifetimes.',
    significance: 'This Ekadasi emphasizes charity. Devotees donate sesame seeds, bathe with sesame paste, offer sesame in fire sacrifices, eat sesame, and give sesame in charity. It falls in the cold month of Magha and is especially auspicious for purification.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'bhaimi',
    name: 'Bhaimi Ekadasi (Jaya Ekadasi)',
    date: '2026-01-29',
    paksha: 'Shukla',
    description: 'Also known as Jaya Ekadasi, observing this day grants victory over the cycle of birth and death.',
    significance: 'The story of Jaya Ekadasi involves two celestial beings, Pushpavati and Malyavan, who were cursed by Lord Indra. By observing this Ekadasi, they were freed from the curse. This day grants liberation and spiritual victory to all sincere observers.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'vijaya',
    name: 'Vijaya Ekadasi',
    date: '2026-02-13',
    paksha: 'Krishna',
    description: 'Lord Rama observed this Ekadasi before building the bridge to Lanka, ensuring His victory over Ravana.',
    significance: 'This Ekadasi grants victory in all endeavours. When Lord Rama was preparing to cross the ocean to rescue Sita, the sage Bakadalbhya advised Him to observe Vijaya Ekadasi. By its power, Lord Rama achieved victory. Devotees observe it for success in spiritual and material life.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'amalaki',
    name: 'Amalaki Ekadasi',
    date: '2026-02-27',
    paksha: 'Shukla',
    description: 'Named after the sacred Amalaki (Indian gooseberry) tree, this Ekadasi is worshipped alongside Lord Vishnu for immense merit.',
    significance: 'On this day, devotees worship the Amalaki tree, which is considered very dear to Lord Vishnu. The tree is bathed, decorated, and circumambulated. Observing this Ekadasi bestows the merit of donating a thousand cows and leads to liberation.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'papamochani',
    name: 'Papamochani Ekadasi',
    date: '2026-03-15',
    paksha: 'Krishna',
    description: 'The destroyer of sins — this Ekadasi removes even the most grievous sins accumulated across lifetimes.',
    significance: 'The sage Medhavi was seduced by the celestial dancer Manjughosha and fell from his spiritual practice. His father, Sage Chyavana, prescribed the observance of Papamochani Ekadasi to free him from all sinful reactions. It is the most powerful Ekadasi for atonement.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'kamada',
    name: 'Kamada Ekadasi',
    date: '2026-03-29',
    paksha: 'Shukla',
    description: 'This Ekadasi fulfils all desires (kama) and frees one from the effects of past misdeeds.',
    significance: 'The story tells of Lalit, a Gandharva, who was cursed to become a demon. His devoted wife Lalita observed Kamada Ekadasi and by its power, Lalit was freed from the curse. This Ekadasi grants the fulfilment of pure desires and removes the reactions of past sins.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'varuthini',
    name: 'Varuthini Ekadasi',
    date: '2026-04-13',
    paksha: 'Krishna',
    description: 'Observing this Ekadasi bestows merit greater than performing a thousand horse sacrifices.',
    significance: 'King Mandhata asked the sage Lomasa about the glories of this Ekadasi. It is said that the merit of observing Varuthini Ekadasi is greater than bathing at all holy places, giving charity of gold and land, and performing elaborate Vedic sacrifices.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'mohini',
    name: 'Mohini Ekadasi',
    date: '2026-04-27',
    paksha: 'Shukla',
    description: 'Named after Lord Vishnu\'s enchanting Mohini form, this Ekadasi grants liberation from material illusion.',
    significance: 'A merchant named Dhanapala had five sons, the youngest of whom was sinful. After being disowned, he met the sage Kaundinya, who prescribed the observance of Mohini Ekadasi. By its power, the young man was purified and attained the spiritual world.',
    pastime: `
               <p><strong>King Yudhishthira</strong> asked <strong>Lord Sri Krishna</strong> about the significance of <strong>Mohini Ekadasi</strong>, observed during the <strong>Shukla Paksha (waxing moon) of Vaishakha (April–May)</strong>, and the proper way to observe it.</p>

               <p>Lord Krishna replied by recounting a conversation between <strong>Lord Rama</strong> and <strong>Sage Vasishtha</strong>. While separated from Mother Sita, Lord Rama asked Vasishtha about a sacred observance that could destroy all sins and relieve suffering. Vasishtha explained that <strong>Mohini Ekadasi</strong> is one of the most auspicious Ekadasis. It removes illusion (<em>moha</em>), destroys sins, removes obstacles, and grants liberation to those who observe it with devotion.</p>

               <h3>The Story of Dhrishthabuddhi</h3>

               <p>On the banks of the <strong>Sarasvati River</strong> stood the prosperous city of <strong>Bhadravati</strong>, ruled by the righteous <strong>King Dyutiman</strong>. A wealthy and charitable merchant named <strong>Dhanapala</strong> lived there with his five sons. While his other sons were virtuous, his youngest son, <strong>Dhrishthabuddhi</strong>, became addicted to sinful habits such as gambling, intoxication, prostitution, and disrespect toward elders, brahmanas, and the demigods.</p>

               <p>Despite his father's repeated warnings, Dhrishthabuddhi continued his sinful lifestyle and squandered all his wealth. Eventually, Dhanapala expelled him from the family. Abandoned by everyone, including the prostitute he associated with, Dhrishthabuddhi turned to theft. After repeated arrests, he was permanently banished from the kingdom.</p>

               <p>Forced to live in the forest, he survived by hunting and killing animals and birds, accumulating even more sinful reactions. Miserable and hopeless, he wandered until, by the influence of his previous pious deeds, he arrived at the ashram of <strong>Kaundinya Muni</strong> during the month of Vaishakha.</p>

               <p>As Kaundinya Muni returned from bathing in the sacred Ganges, a few drops of water from his wet clothes touched Dhrishthabuddhi. Instantly, his heart became purified, and he sincerely repented for his sinful life. He humbly asked the sage for a means of atonement.</p>

               <p>The compassionate sage instructed him to faithfully observe <strong>Mohini Ekadasi</strong>, explaining that this sacred fast has the power to destroy sins as great as <strong>Mount Sumeru</strong>. Dhrishthabuddhi followed the instructions with sincerity and observed the Ekadasi fast.</p>

               <p>By the power of Mohini Ekadasi, all his accumulated sins were destroyed. He attained a beautiful spiritual form and was carried by <strong>Garuda</strong>, Lord Vishnu's eternal carrier, to the Supreme abode of the Lord.</p>

               <h3>Teachings and Benefits</h3>

               <p>Lord Krishna concluded that:</p>

               <ul>
                 <li><strong>Mohini Ekadasi destroys illusion (moha) and frees one from material attachment.</strong></li>
                 <li>It removes even the greatest sinful reactions accumulated over many lifetimes.</li>
                 <li>It eliminates obstacles on the path of spiritual advancement.</li>
                 <li>Faithfully observing this Ekadasi grants immense spiritual merit and ultimately leads one to the abode of Lord Vishnu.</li>
                 <li>The merit of observing Mohini Ekadasi surpasses that of many pilgrimages, sacrifices, and charitable acts.</li>
                 <li>Simply hearing or studying the glories of Mohini Ekadasi bestows the merit of donating one thousand cows.</li>
               </ul>

               <h3>Key Lessons</h3>

               <ul>
                 <li>Even a person deeply immersed in sinful activities can attain purification through sincere repentance and devotion.</li>
                 <li>Association with saintly persons can transform one's life and awaken spiritual consciousness.</li>
                 <li>Observing <strong>Mohini Ekadasi</strong> with faith destroys illusion, removes sinful reactions, and guides the devotee toward liberation and eternal service to Lord Vishnu.</li>
               </ul>
             `,
    banner: mohiniekadasiImg,
  },
  {
    slug: 'apara',
    name: 'Apara Ekadasi',
    date: '2026-05-13',
    paksha: 'Krishna',
    description: 'Also called Achala Ekadasi, it removes unlimited sins and grants unshakeable devotion.',
    significance: 'Apara means "unlimited" — the merit from observing this Ekadasi is unlimited. It is said to be more powerful than bathing in the Ganges, visiting Kurukshetra during a solar eclipse, or donating elephants, horses, and land.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'padmini',
    name: 'Padmini Ekadasi (Adhik Maas)',
    date: '2026-05-27',
    paksha: 'Shukla',
    description: 'A rare Ekadasi occurring during the extra month (Adhik Maas), carrying special spiritual potency.',
    significance: 'This Ekadasi appears only during Adhik Maas (the extra lunar month that occurs roughly every three years). It is considered especially potent because the Adhik Maas is presided over by Lord Sri Krishna Himself. Observing it grants the merit of all other Ekadasis combined.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'parama',
    name: 'Parama Ekadasi (Adhik Maas)',
    date: '2026-06-11',
    paksha: 'Krishna',
    description: 'The second Adhik Maas Ekadasi, supremely auspicious for spiritual advancement.',
    significance: '',
    pastime: `
               <p><strong>King Yudhishthira</strong> asked <strong>Lord Sri Krishna</strong> about <strong>Parama Ekadasi</strong>, observed during the <strong>Krishna Paksha (waning moon) of the extra month (Purushottama Masa/Adhika Masa)</strong>, and how it should be observed.</p>

               <p>Lord Krishna explained that <strong>Parama Ekadasi</strong> is one of the most auspicious Ekadasis. It removes sins, relieves poverty and suffering, grants prosperity, and ultimately awards liberation. He then narrated the story of the pious brahmin <strong>Sumedha</strong> and his devoted wife <strong>Pavitra</strong>.</p>

               <h3>The Story of Sumedha and Pavitra</h3>

               <p>In the city of <strong>Kampilya</strong> lived a poor but virtuous brahmin named <strong>Sumedha</strong> and his chaste wife <strong>Pavitra</strong>. Due to the reactions of previous karma, they lived in extreme poverty. Although Sumedha begged for alms, he barely obtained enough food for survival. Even in hardship, Pavitra faithfully served her husband and generously offered food to guests before feeding herself.</p>

               <p>Feeling distressed by their poverty, Sumedha decided to leave home in search of wealth. However, Pavitra gently reminded him that wealth is attained according to one's past charitable deeds and that abandoning one's family would not change destiny. She encouraged him to remain with her and continue living faithfully, trusting in the Lord's arrangement.</p>

               <p>Soon afterward, the great sage <strong>Kaundinya Muni</strong> visited their home. The couple warmly welcomed him and offered whatever hospitality they could despite their poverty. Pavitra humbly asked the sage if there was any spiritual practice that could free them from their suffering.</p>

               <p>Moved by her sincerity, Kaundinya Muni instructed them to observe <strong>Parama Ekadasi</strong>, explaining that this sacred fast is especially dear to Lord Hari and destroys sins, removes poverty, fulfills material needs, and ultimately grants liberation. He also advised them to remain awake throughout the night in devotional worship by chanting the Lord's holy names and glorifying Him.</p>

               <p>The sage further instructed them to observe the <strong>Pancharatrika Vrata</strong>, a five-day fast beginning on Dwadashi according to their ability. During these days they were advised to worship Lord Vishnu, practice charity, feed qualified brahmanas, remain self-controlled, and perform devotional activities.</p>

               <p>Sumedha and Pavitra faithfully observed both <strong>Parama Ekadasi</strong> and the <strong>Pancharatrika Vrata</strong>. Pleased with their devotion, Lord Brahma inspired a prince to provide them with a beautiful home, wealth, and an entire village for their livelihood. They lived happily and prosperously for the rest of their lives, and at the end of life they attained the eternal abode of <strong>Lord Vishnu</strong>.</p>

               <h3>Teachings and Benefits</h3>

               <p>Lord Krishna concluded that:</p>

               <ul>
                 <li><strong>Parama Ekadasi removes poverty, suffering, and sinful reactions.</strong></li>
                 <li>It fulfills both material and spiritual desires when observed with sincerity.</li>
                 <li>Observing the <strong>Pancharatrika Vrata</strong> after Ekadasi greatly increases the spiritual benefits.</li>
                 <li>The merit of observing Parama Ekadasi equals that of performing many pilgrimages, charitable acts, sacrifices, and sacred rituals.</li>
                 <li>Faithful observance ultimately grants residence in the spiritual abode of Lord Vishnu.</li>
               </ul>

               <h3>Key Lessons</h3>

               <ul>
                 <li>Sincere devotion and faith in the Lord are more powerful than material wealth.</li>
                 <li>Hospitality, charity, patience, and steadfastness in difficult circumstances attract the Lord's mercy.</li>
                 <li>Observing <strong>Parama Ekadasi</strong> and the <strong>Pancharatrika Vrata</strong> purifies the heart, removes suffering, fulfills righteous desires, and leads the devotee toward eternal service to Lord Vishnu.</li>
               </ul>
             `,
    banner: paramaekadasiImg,
  },
  {
    slug: 'pandava-nirjala',
    name: 'Pandava Nirjala Ekadasi',
    date: '2026-06-25',
    paksha: 'Shukla',
    description: 'The most rigorous Ekadasi — observed without even water. It grants the cumulative merit of all 24 Ekadasis.',
    significance: 'Bhimasena, the mighty Pandava, could not fast on every Ekadasi due to his insatiable appetite. Srila Vyasadeva prescribed this single Ekadasi to be observed without food or water for a full 24 hours. By its power, one receives the merit of all Ekadasis in the year. It is the most challenging and most rewarding fast.',
    pastime: `
                <p><strong>Bhimasena</strong>, the second of the Pandava brothers, approached <strong>Sage Vyasadeva</strong> with a concern. Unlike his brothers and family members, he found it impossible to fast twice every month on Ekadasi because of his insatiable hunger. He asked if there was a single Ekadasi whose observance would grant the benefits of observing all the Ekadasis throughout the year.</p>

                <p>Vyasadeva replied that <strong>Nirjala Ekadasi</strong>, observed during the <strong>Shukla Paksha (waxing moon) of Jyeshtha (May–June)</strong>, is the most powerful of all Ekadasis. He instructed Bhima to observe a complete fast <strong>without eating or drinking even water</strong> from sunrise on Ekadasi until sunrise on Dwadashi. Only a few drops of water may be taken for <strong>Achamana (purification)</strong> if required for worship.</p>

                <p>Vyasadeva explained that <strong>Lord Keshava (Sri Krishna)</strong> Himself declared that anyone who faithfully observes Nirjala Ekadasi receives the same spiritual merit as observing <strong>all twenty-four Ekadasis</strong> of the year. The fast destroys sinful reactions, grants immense spiritual merit, and leads one toward liberation.</p>

                <h3>The Observance</h3>

                <p>On <strong>Dwadashi</strong>, the devotee should:</p>

                <ul>
                  <li>Bathe early in the morning.</li>
                  <li>Worship Lord Vishnu with devotion.</li>
                  <li>Donate water, pots, clothes, gold, cows, or other charity according to one's ability.</li>
                  <li>Feed qualified brahmanas before breaking the fast with prasadam.</li>
                </ul>

                <h3>Benefits of Nirjala Ekadasi</h3>

                <p>Vyasadeva further described the extraordinary benefits of observing Nirjala Ekadasi:</p>

                <ul>
                  <li>It grants the merit of all Ekadasi fasts combined.</li>
                  <li>It destroys even the greatest sinful reactions.</li>
                  <li>It bestows health, strength, prosperity, and spiritual advancement.</li>
                  <li>At the time of death, the <strong>Vishnudutas</strong> escort the devotee to the spiritual abode of Lord Vishnu, while the <strong>Yamadutas</strong> do not approach such a devotee.</li>
                  <li>Even hearing the glories of Nirjala Ekadasi bestows great spiritual benefit.</li>
                </ul>

                <p>Inspired by Vyasadeva's instructions, <strong>Bhimasena and the other Pandavas</strong> faithfully observed this complete fast. Since Bhima first observed it, the Ekadasi became widely known as <strong>Pandava Nirjala Ekadasi</strong> or <strong>Bhimaseni Nirjala Ekadasi</strong>.</p>

                <h3>Key Lessons</h3>

                <ul>
                  <li><strong>Nirjala Ekadasi</strong> is considered the most powerful Ekadasi, especially for those unable to observe every Ekadasi throughout the year.</li>
                  <li>Fasting <strong>without food and water</strong>, when physically able, is an act of great devotion and austerity.</li>
                  <li>Sincere observance of this Ekadasi destroys accumulated sins, grants the merit of all other Ekadasis, and leads one toward the eternal abode of Lord Vishnu.</li>
                  <li>Charity, worship of Lord Krishna, chanting His holy names, and breaking the fast properly on Dwadashi complete the observance and enhance its spiritual benefits.</li>
                </ul>
              `,
    banner: pandava,
  },
  {
    slug: 'yogini',
    name: 'Yogini Ekadasi',
    date: '2026-07-11',
    paksha: 'Krishna',
    description: 'This Ekadasi frees one from the reactions of even the most terrible sins, including the killing of a brahmana.',
    significance: 'A king\'s gardener named Hema Mala neglected his duty due to attachment to his wife. Cursed by the king to suffer as a leper and his wife to become a demoness, they were later advised by the sage Markandeya to observe Yogini Ekadasi. By its power, both were freed from their curses.',
    pastime: `
      <p><strong>Yudhishthira</strong> asks <strong>Lord Krishna</strong> about the significance of <strong>Yogini Ekadasi</strong>, observed during the waning moon (Krishna Paksha) of <strong>Ashadha (June–July)</strong>.</p>

      <p>Lord Krishna explains that <strong>Yogini Ekadasi</strong> is one of the most powerful Ekadasis. It destroys sinful reactions, frees one from material bondage, and grants liberation.</p>

      <h3>The Story of Hemamali</h3>

      <ul>
        <li><strong>Kuvera</strong>, the treasurer of the demigods and a devotee of <strong>Lord Shiva</strong>, had a servant named <strong>Hemamali</strong>, whose duty was to collect flowers daily from <strong>Manasarovara Lake</strong> for Shiva's worship.</li>

        <li>Hemamali became deeply attached to his beautiful wife, <strong>Swarupavati</strong>. One day, after gathering flowers, he spent time with her instead of delivering the flowers for Kuvera's worship.</li>

        <li>As a result, Shiva's worship was delayed. Enraged by Hemamali's negligence, <strong>Kuvera cursed him</strong> to suffer from <strong>white leprosy</strong>, lose his wife, and wander in misery.</li>

        <li>Hemamali endured great suffering in the forest but continued remembering and worshipping Lord Shiva.</li>

        <li>Eventually, he met the great sage <strong>Markandeya Rishi</strong>, who compassionately advised him to observe the fast of <strong>Yogini Ekadasi</strong>.</li>

        <li>Hemamali faithfully observed the Ekadasi fast. By its spiritual power, he was freed from the curse, regained his handsome form, reunited with his wife, and returned to his service.</li>
      </ul>

      <h3>Teachings and Benefits</h3>

      <p>Lord Krishna concludes that:</p>

      <ul>
        <li><strong>Yogini Ekadasi destroys even great sinful reactions.</strong></li>
        <li>It grants purity, piety, and ultimately <strong>liberation (moksha)</strong>.</li>
        <li>Observing this Ekadasi with sincerity gives the same spiritual merit as <strong>feeding 88,000 Brahmins</strong>.</li>
        <li>It is one of the most sacred fasting days and helps devotees cross the ocean of material existence.</li>
      </ul>

      <h3>Key Lesson</h3>

      <ul>
        <li>Neglecting one's duties due to attachment and sense enjoyment leads to suffering.</li>
        <li>Honest repentance, guidance from a saintly person, and sincere observance of <strong>Yogini Ekadasi</strong> can remove even severe karmic reactions.</li>
        <li>Devotion, discipline, and faith have the power to transform one's life spiritually.</li>
      </ul>
    `,
    banner: yoginiekadasiImg,
  },
  {
    slug: 'devshayani',
    name: 'Devshayani (Sayana) Ekadasi',
    date: '2026-07-25',
    paksha: 'Shukla',
    description: 'On this day, Lord Vishnu goes to sleep for four months (Chaturmas). It marks the beginning of the holy Chaturmas period.',
    significance: 'This highly sacred Ekadasi marks the beginning of Chaturmas — the four months when Lord Vishnu rests on Shesha Naga in the Ksheer Sagar. Devotees intensify their spiritual practices during this period. It is said that Lord Vishnu grants special mercy to those who observe this Ekadasi.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'kamika',
    name: 'Kamika Ekadasi',
    date: '2026-08-09',
    paksha: 'Krishna',
    description: 'Worshipping Lord Vishnu with Tulasi leaves on this day grants liberation and the destruction of all sins.',
    significance: 'Lord Brahma told Narada Muni that of all offerings, Tulasi leaves are most dear to Lord Vishnu. On Kamika Ekadasi, even offering a single Tulasi leaf to the Lord grants more merit than donating ten million cows in charity. This Ekadasi especially glorifies Tulasi worship.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'shravana-putrada',
    name: 'Shravana Putrada Ekadasi',
    date: '2026-08-24',
    paksha: 'Shukla',
    description: 'This Ekadasi blesses childless couples with virtuous progeny and grants all devotees spiritual elevation.',
    significance: 'King Mahijit of Mahishmati was sonless despite performing many sacrifices. The sage Lomasa advised the king and queen to observe Putrada Ekadasi. By its power, they were blessed with a beautiful son. This Ekadasi is especially observed by those desiring children.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'aja',
    name: 'Aja (Annada) Ekadasi',
    date: '2026-09-07',
    paksha: 'Krishna',
    description: 'King Harishchandra regained his lost kingdom by observing this Ekadasi, making it the bestower of lost fortune.',
    significance: 'The righteous King Harishchandra, who had lost everything due to a curse, was advised by the sage Gautama to observe Aja Ekadasi. By its immense spiritual potency, the king regained his kingdom, was reunited with his family, and ultimately attained the spiritual world.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'parsva-parivartini',
    name: 'Parsva (Parivartini) Ekadasi',
    date: '2026-09-22',
    paksha: 'Shukla',
    description: 'On this day, Lord Vishnu turns over in His cosmic sleep. It marks the midpoint of Chaturmas.',
    significance: 'Parsva means "to turn." Midway through His four-month sleep, Lord Vishnu changes His resting position. King Bali, to whom Lord Vamanadeva granted the rulership of the lower planets, especially worships the Lord on this day. Devotees deepen their Chaturmas vows on this Ekadasi.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'indira',
    name: 'Indira Ekadasi',
    date: '2026-10-06',
    paksha: 'Krishna',
    description: 'This Ekadasi liberates ancestors from hellish conditions and grants the observer liberation.',
    significance: 'King Indrasena was informed by Narada Muni that his father was suffering in the lower realms. By observing Indira Ekadasi with full devotion and offering the merit to his departed father, the king freed his father from suffering and both attained the spiritual world.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'papankusha',
    name: 'Papankusha Ekadasi',
    date: '2026-10-22',
    paksha: 'Shukla',
    description: 'The "controller of sins" — this Ekadasi is a hook (ankusha) that pulls one out of the ocean of sinful reactions.',
    significance: 'Lord Krishna told Yudhishthira that just as an elephant is controlled by a goad (ankusha), all sins are controlled and destroyed by this Ekadasi. Even the sin of killing a brahmana is neutralized. Devotees who observe it with faith are guaranteed liberation.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'rama',
    name: 'Rama Ekadasi',
    date: '2026-11-05',
    paksha: 'Krishna',
    description: 'Named in honour of Goddess Rama (Lakshmi), this Ekadasi brings wealth, prosperity, and spiritual fortune.',
    significance: 'Lord Krishna narrated to Yudhishthira how a devoted brahmana named Muchukunda, cursed with leprosy due to past sins, was advised to observe Rama Ekadasi. By its observance, he was cured of his disease, became prosperous, and eventually attained the spiritual realm.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'utthana',
    name: 'Utthana (Devutthana) Ekadasi',
    date: '2026-11-21',
    paksha: 'Shukla',
    description: 'Lord Vishnu awakens from His four-month sleep on this day. Chaturmas concludes and auspicious activities resume.',
    significance: 'Utthana means "rising." Lord Vishnu arises from His mystic slumber and the four-month period of restricted activities comes to an end. Weddings, house-warmings, and other auspicious ceremonies resume after this day. It is one of the most celebrated Ekadasis across India.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'utpanna',
    name: 'Utpanna Ekadasi',
    date: '2026-12-04',
    paksha: 'Krishna',
    description: 'The origin of Ekadasi herself — this is considered the best day to begin the practice of Ekadasi fasting.',
    significance: 'This Ekadasi celebrates the appearance of Ekadasi Devi, who manifested from the body of Lord Vishnu to slay the demon Mura. Lord Krishna told Arjuna that Utpanna Ekadasi is the mother of all Ekadasis and the best day for a new observer to begin the sacred practice of fasting.',
    pastime: '',
    banner: ekadasiImg,
  },
  {
    slug: 'mokshada',
    name: 'Mokshada Ekadasi (Gita Jayanti)',
    date: '2026-12-20',
    paksha: 'Shukla',
    description: 'The giver of liberation. Also celebrated as Gita Jayanti — the day Lord Krishna spoke the Bhagavad Gita.',
    significance: 'This Ekadasi is doubly sacred: it grants moksha (liberation) and is also the anniversary of the day Lord Sri Krishna spoke the Bhagavad Gita to Arjuna on the battlefield of Kurukshetra. Known as Vaikuntha Ekadasi in South India, devotees throng temples like Srirangam and Tirumala to pass through the symbolic Vaikuntha Dwaram.',
    pastime: '',
    banner: ekadasiImg,
  },
]

export function getUpcomingEkadasi(): Ekadasi | undefined {
  const today = new Date().toISOString().slice(0, 10)
  return EKADASI_LIST.find((e) => e.date >= today)
}

export function getEkadasiBySlug(slug: string): Ekadasi | undefined {
  return EKADASI_LIST.find((e) => e.slug === slug)
}

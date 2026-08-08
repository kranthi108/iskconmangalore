/**
 * ISKCON Ekadasi Calendar — 2026
 * Update this file annually with the new year's dates.
 * All dates and times are IST (Indian Standard Time).
 */
import mohiniekadasiImg from '@/assets/ekadasi/mohiniekadasi.png'
import paramaekadasiImg from '@/assets/ekadasi/paramaekadasi.png'
import shayaniekadasiImg from '@/assets/ekadasi/shayaniekadashi.png'
import ekadasiImg from '@/assets/ekadasi/ekadasi.png'
import yoginiekadasiImg from '@/assets/ekadasi/YoginiEkadasi.png'
import pandava from '@/assets/ekadasi/pandavaekadasi.png'
import kamika from '@/assets/ekadasi/kamikaekadasi.png'

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
    pastime: `
               <p><strong>King Yudhishthira</strong> asked <strong>Lord Sri Krishna</strong> about the significance of <strong>Jaya Ekadasi</strong>, observed during the <strong>Shukla Paksha (waxing moon) of Magha (January–February)</strong>, and the proper method of observing it. Lord Krishna explained that this sacred Ekadasi destroys sinful reactions, frees one from ghostly existence, and grants liberation from the cycle of birth and death.</p>

               <p>Lord Krishna then narrated an incident from the <strong>Padma Purana</strong> to illustrate the extraordinary power of Jaya Ekadasi.</p>

               <h3>The Story of Malyavan and Pushpavati</h3>

               <p>Long ago, in the heavenly kingdom of <strong>Lord Indra</strong>, celestial musicians and dancers regularly performed in the beautiful <strong>Nandana Forest</strong>. Among them were the Gandharva <strong>Malyavan</strong> and the Apsara <strong>Pushpavati</strong>. Captivated by each other's beauty, they became overwhelmed by lust and lost concentration while singing and dancing before Lord Indra.</p>

               <p>Angered by their careless performance and disrespect, Lord Indra cursed them to become <strong>Pisachas (ghostly beings)</strong> and live on Earth in the cold Himalayan mountains, suffering the consequences of their attachment.</p>

               <p>In their ghostly forms, Malyavan and Pushpavati endured intense misery. They wandered through the freezing mountains without food, water, sleep, or any comfort. Filled with regret, they lamented the sinful actions that had brought them to such a dreadful condition.</p>

               <p>By great fortune, the day they were suffering happened to be <strong>Jaya Ekadasi</strong>. Due to their circumstances, they unknowingly observed a complete fast without food or water and remained awake throughout the entire night beneath a sacred <strong>Pipal tree</strong>. Although unintentional, they perfectly observed the Ekadasi vrata.</p>

               <p>When <strong>Dwadashi</strong> dawned, the powerful influence of Jaya Ekadasi immediately destroyed the effects of Lord Indra's curse. Their ghostly forms disappeared, and they regained their beautiful celestial bodies. A divine airplane (Vimana) arrived to carry them back to the heavenly planets.</p>

               <p>Surprised to see them restored so quickly, Lord Indra asked how they had become free from his powerful curse. Malyavan explained that by the mercy of <strong>Lord Sri Krishna</strong> and the power of <strong>Jaya Ekadasi</strong>, they had been completely purified and released from their ghostly existence.</p>

               <p>Lord Indra praised the greatness of Jaya Ekadasi and declared that anyone who sincerely observes this sacred fast becomes worthy of respect even by the demigods. He welcomed Malyavan and Pushpavati back to the heavenly kingdom.</p>

               <h3>Teachings and Benefits</h3>

               <p>Lord Krishna concluded that:</p>

               <ul>
                 <li><strong>Jaya Ekadasi frees one from ghostly existence and destroys even the most severe sinful reactions.</strong></li>
                 <li>It grants liberation from the cycle of birth and death.</li>
                 <li>Observing this Ekadasi with devotion bestows the merit of performing great sacrifices, charities, and pilgrimages.</li>
                 <li>Faithful observance qualifies one to attain the eternal abode of <strong>Lord Vishnu (Vaikuntha)</strong>.</li>
                 <li>Even hearing or reading the glories of Jaya Ekadasi grants immense spiritual merit.</li>
               </ul>

               <h3>Key Lessons</h3>

               <ul>
                 <li>Attachment to material desires can lead even elevated souls into suffering.</li>
                 <li>The mercy of <strong>Jaya Ekadasi</strong> is so powerful that even an unintentional observance can destroy great sins and bring spiritual elevation.</li>
                 <li>Sincerely observing Jaya Ekadasi with devotion purifies the heart, frees one from sinful reactions, and leads the devotee toward the eternal service of Lord Vishnu.</li>
               </ul>
             `,
    banner: ekadasiImg,
  },
  {
    slug: 'vijaya',
    name: 'Vijaya Ekadasi',
    date: '2026-02-13',
    paksha: 'Krishna',
    description: 'Lord Rama observed this Ekadasi before building the bridge to Lanka, ensuring His victory over Ravana.',
    significance: 'This Ekadasi grants victory in all endeavours. When Lord Rama was preparing to cross the ocean to rescue Sita, the sage Bakadalbhya advised Him to observe Vijaya Ekadasi. By its power, Lord Rama achieved victory. Devotees observe it for success in spiritual and material life.',
    pastime: `
               <p><strong>King Yudhishthira</strong> asked <strong>Lord Sri Krishna</strong> about <strong>Vijaya Ekadasi</strong>, observed during the <strong>Krishna Paksha (waning moon) of Phalguna (February–March)</strong>. Lord Krishna explained that this sacred Ekadasi grants victory in both material and spiritual life, destroys all sinful reactions, and ultimately leads one to the eternal abode of Lord Vishnu.</p>

               <p>Lord Krishna then narrated an ancient conversation between <strong>Narada Muni</strong> and <strong>Lord Brahma</strong>, in which Brahma described the extraordinary glories of Vijaya Ekadasi.</p>

               <h3>The Story of Lord Rama</h3>

               <p>During His fourteen-year exile, <strong>Lord Rama</strong>, accompanied by <strong>Sita Devi</strong> and <strong>Lakshmana</strong>, lived in the forest. After Sita was abducted by the demon king <strong>Ravana</strong>, Lord Rama searched tirelessly for her. Along the way, He met the dying vulture <strong>Jatayu</strong>, who informed Him about Ravana's abduction before attaining the spiritual world.</p>

               <p>Lord Rama later formed an alliance with the monkey king <strong>Sugriva</strong> and assembled a great army of monkeys and bears. Sugriva's minister, <strong>Hanuman</strong>, crossed the ocean, found Sita in Lanka, delivered Lord Rama's message, and returned with news of her whereabouts.</p>

               <p>When Lord Rama's army reached the shore of the vast ocean, they faced the seemingly impossible task of crossing it. At Lakshmana's suggestion, Lord Rama visited the great sage <strong>Bakad Albhya Muni</strong> to seek guidance.</p>

               <p>Recognizing Lord Rama as the Supreme Personality of Godhead, Bakad Albhya Muni instructed Him to observe the sacred fast of <strong>Vijaya Ekadasi</strong>. The sage described the proper observance, including establishing a sacred water pot decorated with mango leaves, grains, flowers, sandalwood, coconut, and pomegranate, worshipping Lord Narayana with devotion, remaining awake throughout the night, and offering the worshipped pot to a qualified brahmana on Dwadashi.</p>

               <p>Lord Rama faithfully observed Vijaya Ekadasi exactly as instructed. By the power of this sacred vrata, He successfully crossed the ocean, defeated Ravana and his demoniac army, rescued Mother Sita, and established righteousness. Since then, Vijaya Ekadasi has been celebrated as the Ekadasi that bestows victory over all obstacles.</p>

               <h3>Teachings and Benefits</h3>

               <p>Lord Krishna concluded that:</p>

               <ul>
                 <li><strong>Vijaya Ekadasi grants victory in both material and spiritual endeavors.</strong></li>
                 <li>It destroys even the greatest sinful reactions when observed with sincerity and devotion.</li>
                 <li>Observing this Ekadasi according to the prescribed method removes obstacles and brings success in righteous endeavors.</li>
                 <li>Faithful observance ultimately grants residence in the eternal abode of <strong>Lord Vishnu (Vaikuntha)</strong>.</li>
                 <li>Simply hearing or reading the glories of Vijaya Ekadasi bestows immense spiritual merit, equal to performing an ancient horse sacrifice (Ashvamedha Yajna).</li>
               </ul>

               <h3>Key Lessons</h3>

               <ul>
                 <li>Victory is attained through faith, devotion, and following the guidance of saintly devotees.</li>
                 <li>Even the Supreme Lord demonstrated the importance of observing sacred vows to teach humanity by His example.</li>
                 <li>Observing <strong>Vijaya Ekadasi</strong> with devotion removes obstacles, purifies the heart, grants success in righteous endeavors, and leads the devotee toward the eternal service of Lord Vishnu.</li>
               </ul>
             `,
    banner: ekadasiImg,
  },
  {
    slug: 'amalaki',
    name: 'Amalaki Ekadasi',
    date: '2026-02-27',
    paksha: 'Shukla',
    description: 'Named after the sacred Amalaki (Indian gooseberry) tree, this Ekadasi is worshipped alongside Lord Vishnu for immense merit.',
    significance: 'On this day, devotees worship the Amalaki tree, which is considered very dear to Lord Vishnu. The tree is bathed, decorated, and circumambulated. Observing this Ekadasi bestows the merit of donating a thousand cows and leads to liberation.',
    pastime: `
               <p><strong>King Mandhata</strong> asked the great sage <strong>Vasishtha Muni</strong> to describe a sacred fast that grants eternal spiritual benefit. Vasishtha Muni explained the glories of <strong>Amalaki Ekadasi</strong>, observed during the <strong>Shukla Paksha (waxing moon) of Phalguna (February–March)</strong>. He said that faithfully observing this Ekadasi destroys sinful reactions, brings prosperity, and ultimately grants liberation, with merits greater than donating one thousand cows in charity.</p>

               <h3>The Kingdom of Vaidisha</h3>

               <p>Long ago, there was a prosperous kingdom named <strong>Vaidisha</strong>, ruled by the righteous King <strong>Chitraratha (Pashabinduka)</strong>. Every citizen faithfully followed their prescribed duties, worshipped Lord Vishnu, observed every Ekadasi, and lived peacefully without disease, famine, or suffering. The king himself was deeply devoted to both Lord Vishnu and Lord Shiva.</p>

               <h3>Observing Amalaki Ekadasi</h3>

               <p>When the auspicious <strong>Amalaki Ekadasi</strong> arrived, King Chitraratha and all the citizens gathered near a sacred <strong>Amalaki (Indian Gooseberry) tree</strong> beside Lord Vishnu's temple. They offered water, flowers, incense, sandalwood, precious jewels, and other gifts while worshipping both <strong>Lord Parashurama</strong> and the sacred Amalaki tree. They glorified the tree as a manifestation of Lord Brahma and remembered that it had once been worshipped by Lord Ramachandra. They then remained awake throughout the night chanting, praying, and worshipping Lord Vishnu.</p>

               <h3>The Fortunate Hunter</h3>

               <p>That same night, a sinful hunter who earned his livelihood by killing animals happened to pass through the forest. Curious about the beautiful celebration, he quietly watched the devotees worship Lord Vishnu beneath the Amalaki tree. Although he had no intention of performing devotional service, he unknowingly fasted throughout the night, remained awake, and listened to the chanting of Lord Krishna's glories.</p>

               <p>After the observance ended, the hunter returned home and continued his life. When he eventually died, the spiritual merit gained from unknowingly observing <strong>Amalaki Ekadasi</strong> awarded him a glorious next birth as the righteous King <strong>Vasuratha</strong>, ruler of the kingdom of Jayanti.</p>

               <h3>King Vasuratha's Divine Protection</h3>

               <p>King Vasuratha became a powerful, charitable, truthful, and devoted ruler who always served Lord Vishnu and cared deeply for his subjects. One day, while hunting in the forest, he became separated from his companions and fell asleep beneath a tree.</p>

               <p>A group of hostile tribesmen discovered the sleeping king and decided to kill him in revenge for past conflicts. However, none of their weapons could touch him. Suddenly, a brilliant and fierce divine goddess emerged from the king's body, wielding a blazing discus. She instantly destroyed all the attackers, protecting the king from certain death.</p>

               <p>When King Vasuratha awoke, he was astonished to see his enemies lying defeated. A heavenly voice revealed that his protector was none other than <strong>Lord Keshava (Sri Krishna)</strong>, who always protects those who sincerely take shelter of Him. Filled with gratitude and devotion, King Vasuratha returned to his kingdom and ruled peacefully for the rest of his life.</p>

               <h3>Teachings and Benefits</h3>

               <p>Vasishtha Muni concluded that:</p>

               <ul>
                 <li><strong>Amalaki Ekadasi destroys sinful reactions and grants immense spiritual merit.</strong></li>
                 <li>Even an unintentional observance performed with faith can elevate one's future life and awaken devotion.</li>
                 <li>Lord Vishnu personally protects those who sincerely observe this sacred Ekadasi.</li>
                 <li>Faithful observance grants prosperity, purification, and ultimately residence in the eternal abode of <strong>Lord Vishnu (Vaikuntha)</strong>.</li>
               </ul>

               <h3>Key Lessons</h3>

               <ul>
                 <li>Sincere devotion and association with devotees can transform even the most sinful life.</li>
                 <li>Lord Vishnu always protects those who faithfully remember and worship Him.</li>
                 <li>Observing <strong>Amalaki Ekadasi</strong> with devotion purifies the heart, destroys sins, brings divine protection, and leads the devotee toward eternal service to Lord Vishnu.</li>
               </ul>
             `,
    banner: ekadasiImg,
  },
  {
    slug: 'papamochani',
    name: 'Papamochani Ekadasi',
    date: '2026-03-15',
    paksha: 'Krishna',
    description: 'The destroyer of sins — this Ekadasi removes even the most grievous sins accumulated across lifetimes.',
    significance: 'The sage Medhavi was seduced by the celestial dancer Manjughosha and fell from his spiritual practice. His father, Sage Chyavana, prescribed the observance of Papamochani Ekadasi to free him from all sinful reactions. It is the most powerful Ekadasi for atonement.',
    pastime: `
               <p><strong>King Yudhishthira</strong> asked <strong>Lord Sri Krishna</strong> about <strong>Papamochani Ekadasi</strong>, observed during the <strong>Krishna Paksha (waning moon) of Chaitra (March–April)</strong>. Lord Krishna explained that this sacred Ekadasi destroys all sinful reactions, frees one from ghostly influences, fulfills righteous desires, and grants liberation.</p>

               <p>Lord Krishna then narrated an ancient history that <strong>Lomasa Rishi</strong> had once told King Mandhata to illustrate the extraordinary power of Papamochani Ekadasi.</p>

               <h3>The Story of Sage Medhavi and Manjughosha</h3>

               <p>Long ago, the celestial musician <strong>Chitraratha</strong>, accompanied by many Gandharvas, Apsaras, and Lord Indra, visited a beautiful forest where many sages were performing severe austerities. Among them lived the young sage <strong>Medhavi</strong>, who was deeply absorbed in meditation.</p>

               <p>One beautiful Apsara named <strong>Manjughosha</strong> desired to break the sage's penance. With the assistance of Cupid (Kamadeva), she sang enchanting songs, played her tamboura, and gradually attracted the sage with her beauty and charm. Overcome by illusion, Medhavi abandoned his austerities and lived with Manjughosha for what seemed like a single night, though in reality <strong>fifty-seven years, nine months, and three days</strong> had passed.</p>

               <p>When Manjughosha finally requested permission to leave, Medhavi realized how much time had been lost. Filled with remorse and anger over the destruction of his spiritual achievements, he cursed Manjughosha to become a <strong>Pishacha (ghostly being)</strong>.</p>

               <p>Repentant, Manjughosha begged the sage for forgiveness. Though unable to withdraw his curse, Medhavi compassionately advised her to observe <strong>Papamochani Ekadasi</strong>, explaining that its observance would free her from the curse and destroy all sinful reactions.</p>

               <p>Medhavi then returned to the ashram of his father, the great sage <strong>Chyavana Muni</strong>, and confessed everything that had happened. Chyavana Muni instructed his son to observe Papamochani Ekadasi as the proper atonement for his mistake.</p>

               <p>Both Medhavi and Manjughosha faithfully observed the sacred fast. By the power of <strong>Papamochani Ekadasi</strong>, Medhavi's sins were completely destroyed, his spiritual purity was restored, and Manjughosha was freed from her ghostly form and regained her celestial position.</p>

               <h3>Teachings and Benefits</h3>

               <p>Lord Krishna concluded that:</p>

               <ul>
                 <li><strong>Papamochani Ekadasi destroys even the gravest sinful reactions and frees one from ghostly influences.</strong></li>
                 <li>It purifies the heart and restores one's spiritual strength after mistakes and lapses.</li>
                 <li>Observing this Ekadasi with sincerity grants forgiveness, spiritual merit, and liberation.</li>
                 <li>Hearing or reading its glories bestows immense spiritual benefit, comparable to performing great acts of charity.</li>
               </ul>

               <h3>Key Lessons</h3>

               <ul>
                 <li>Even advanced spiritual practitioners must remain vigilant against temptation and material illusion.</li>
                 <li>Sincere repentance combined with devotional observance can completely erase even great sins.</li>
                 <li>Observing <strong>Papamochani Ekadasi</strong> with devotion purifies the heart, destroys sinful reactions, restores spiritual consciousness, and leads the devotee toward the eternal service of Lord Vishnu.</li>
               </ul>
             `,
    banner: ekadasiImg,
  },
  {
    slug: 'kamada',
    name: 'Kamada Ekadasi',
    date: '2026-03-29',
    paksha: 'Shukla',
    description: 'This Ekadasi fulfils all desires (kama) and frees one from the effects of past misdeeds.',
    significance: 'The story tells of Lalit, a Gandharva, who was cursed to become a demon. His devoted wife Lalita observed Kamada Ekadasi and by its power, Lalit was freed from the curse. This Ekadasi grants the fulfilment of pure desires and removes the reactions of past sins.',
    pastime: `
               <p><strong>King Yudhishthira</strong> asked <strong>Lord Sri Krishna</strong> about <strong>Kamada Ekadasi</strong>, observed during the <strong>Shukla Paksha (waxing moon) of Chaitra (March–April)</strong>. Lord Krishna explained that this sacred Ekadasi destroys all sinful reactions, fulfills one's righteous desires, removes curses, and grants the highest spiritual merit.</p>

               <p>Lord Krishna then narrated an ancient history that <strong>Vasishtha Muni</strong> had once told King Dilipa to illustrate the extraordinary power of Kamada Ekadasi.</p>

               <h3>The Story of Lalit and Lalita</h3>

               <p>Long ago, in the beautiful kingdom of <strong>Ratnapura</strong>, ruled by <strong>King Pundarika</strong>, lived a Gandharva couple named <strong>Lalit</strong> and <strong>Lalita</strong>. They deeply loved one another and were always absorbed in thoughts of each other.</p>

               <p>One day, while singing before King Pundarika's royal court, Lalit became distracted by thoughts of his beloved wife. Because of this, he lost the proper rhythm and melody of his performance. An envious serpent present in the court informed the king that Lalit had neglected his duty out of attachment to his wife.</p>

               <p>Filled with anger, King Pundarika cursed Lalit to become a terrible <strong>man-eating demon (cannibal)</strong>. Instantly, the handsome Gandharva transformed into a gigantic and fearsome demon and wandered through the forests in great misery.</p>

               <p>Although heartbroken, Lalita never abandoned her husband. She faithfully accompanied him through the forests, constantly searching for a way to free him from the dreadful curse.</p>

               <p>One day, by divine fortune, Lalita met the great sage <strong>Shringi Rishi</strong> on the Vindhya Mountains. She humbly explained her husband's suffering and begged for a way to release him from the curse.</p>

               <p>The compassionate sage instructed her to faithfully observe <strong>Kamada Ekadasi</strong>, explaining that anyone who observes this sacred fast according to the prescribed rules and offers its spiritual merit to another can free that person even from powerful curses.</p>

               <p>Lalita carefully observed Kamada Ekadasi with complete devotion. On Dwadashi, she prayed before Lord Vasudeva and offered all the merit of her fast for her husband's welfare.</p>

               <p>Immediately, by the power of <strong>Kamada Ekadasi</strong>, Lalit was freed from the king's curse. He regained his original beautiful Gandharva form, adorned with celestial ornaments. Reunited, Lalit and Lalita enjoyed even greater happiness than before and eventually ascended together to the heavenly planets in a celestial airplane.</p>

               <h3>Teachings and Benefits</h3>

               <p>Lord Krishna concluded that:</p>

               <ul>
                 <li><strong>Kamada Ekadasi destroys sinful reactions, removes powerful curses, and fulfills righteous desires.</strong></li>
                 <li>Observing this sacred Ekadasi with devotion can free oneself and even benefit others through the offering of its spiritual merit.</li>
                 <li>It destroys even the gravest sins and purifies one's consciousness.</li>
                 <li>Faithful observance grants immense spiritual merit and leads the devotee toward the eternal abode of <strong>Lord Vishnu</strong>.</li>
               </ul>

               <h3>Key Lessons</h3>

               <ul>
                 <li>Love combined with faith and devotion has the power to overcome even the greatest misfortune.</li>
                 <li>Sincere observance of Ekadasi can destroy sinful reactions, remove curses, and transform one's destiny.</li>
                 <li>Observing <strong>Kamada Ekadasi</strong> with devotion purifies the heart, fulfills righteous desires, and leads the devotee toward eternal service to Lord Vishnu.</li>
               </ul>
             `,
    banner: ekadasiImg,
  },
  {
    slug: 'varuthini',
    name: 'Varuthini Ekadasi',
    date: '2026-04-13',
    paksha: 'Krishna',
    description: 'Observing this Ekadasi bestows merit greater than performing a thousand horse sacrifices.',
    significance: 'King Mandhata asked the sage Lomasa about the glories of this Ekadasi. It is said that the merit of observing Varuthini Ekadasi is greater than bathing at all holy places, giving charity of gold and land, and performing elaborate Vedic sacrifices.',
    pastime: `<p>Lord Krishna told Yudhishthira Maharaja that <strong>Varuthini Ekadasi</strong>, observed during the Krishna Paksha of Vaisakha, is one of the most auspicious Ekadasis. By faithfully observing this fast, one becomes free from sinful reactions, gains happiness and prosperity in this life, and ultimately attains liberation. It protects devotees from repeated birth and death and grants both material and spiritual success.</p>

             <p>Lord Krishna explained that great kings such as <strong>King Mandhata</strong> and <strong>Maharaja Dhundhumara</strong> attained liberation and freedom from severe suffering by observing this Ekadasi. The merit gained from fasting on Varuthini Ekadasi is said to equal or surpass the results of performing severe austerities for thousands of years or giving immense charity, including gold, land, elephants, cows, and food grains.</p>

             <p>The Lord further emphasized that while acts such as charity, arranging the marriage of a qualified daughter, and teaching spiritual knowledge are highly meritorious, faithfully observing Varuthini Ekadasi grants the combined benefits of all these pious activities.</p>

             <p>To properly observe the vrata, devotees should avoid certain foods and activities beginning from Dashami, maintain purity and self-control on Ekadasi, and continue following the prescribed restrictions until Dvadasi. Staying awake through the night in the worship of Lord Janardana (Krishna) further increases the spiritual benefit.</p>

             <p>Lord Krishna concluded that anyone who observes or even hears the glories of Varuthini Ekadasi becomes freed from accumulated sins, attains immense spiritual merit equal to donating one thousand cows, and ultimately returns to the eternal abode of Lord Vishnu in Vaikuntha.</p>`,
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
    pastime: `
             <p>Lord Krishna told Yudhishthira Maharaja that <strong>Apara Ekadasi</strong>, observed during the Krishna Paksha of Jyeshtha, is one of the most powerful and meritorious Ekadasis. It destroys even the gravest sins, grants immense spiritual merit, and leads sincere devotees toward liberation and the eternal abode of Lord Vishnu.</p>

             <p>The Lord explained that even those who have committed severe offenses—such as killing a brahmana, a cow, or an unborn child, bearing false witness, cheating others, abandoning their prescribed duties, misleading people through false teachings or professions, fleeing the battlefield, or even disrespecting their spiritual master—can become purified by sincerely observing Apara Ekadasi with faith and devotion.</p>

             <p>Lord Krishna further declared that the merit obtained by observing Apara Ekadasi equals the results of many of the greatest Vedic pious activities. These include bathing at sacred pilgrimage places such as Pushkara, Prayag, Gaya, Kurukshetra, Kedarnath, and Badrinath, worshipping Lord Shiva at Varanasi during Shivaratri, offering oblations to one's forefathers, and donating cows, elephants, gold, fertile land, and other valuable gifts in charity.</p>

             <p>Describing its extraordinary power, Lord Krishna compared Apara Ekadasi to an axe that cuts down the dense forest of sinful deeds, a blazing fire that burns accumulated sins to ashes, the rising sun that removes the darkness of ignorance, and a powerful lion that destroys the deer of impiety. Therefore, anyone who sincerely fears the reactions of past sins should faithfully observe this sacred Ekadasi and worship Lord Trivikrama.</p>

             <p>Lord Krishna concluded by telling Yudhishthira that whoever observes or even hears the glories of Apara Ekadasi becomes freed from all sinful reactions, gains immeasurable spiritual merit, and ultimately attains the eternal spiritual abode of Lord Vishnu in Vaikuntha.</p>

             <h3>Lessons from the Pastime</h3>
             <ul>
               <li>No sin is too great to be forgiven when one sincerely repents and takes shelter of Lord Hari through devotional practices.</li>
               <li>Apara Ekadasi demonstrates that devotion to Lord Vishnu is more powerful than even the gravest karmic reactions.</li>
               <li>The spiritual merit of observing Ekadasi surpasses that of many celebrated pilgrimages, charities, sacrifices, and austerities.</li>
               <li>Following one's prescribed duties honestly and avoiding deceit are essential principles of dharmic life.</li>
               <li>Observing Ekadasi with faith purifies the heart, removes ignorance, and leads one toward liberation and eternal service to Lord Vishnu.</li>
             </ul>
             `,
    banner: ekadasiImg,
  },
  {
    slug: 'padmini',
    name: 'Padmini Ekadasi (Adhik Maas)',
    date: '2026-05-27',
    paksha: 'Shukla',
    description: 'A rare Ekadasi occurring during the extra month (Adhik Maas), carrying special spiritual potency.',
    significance: 'This Ekadasi appears only during Adhik Maas (the extra lunar month that occurs roughly every three years). It is considered especially potent because the Adhik Maas is presided over by Lord Sri Krishna Himself. Observing it grants the merit of all other Ekadasis combined.',
    pastime: `
             <p>Lord Krishna explained to Yudhishthira Maharaja that <strong>Padmini Ekadasi</strong>, observed during the Shukla Paksha of the extra (Purushottama/Adhika) month, is one of the rarest and most powerful Ekadasis. It destroys unlimited sins, fulfills all desires, and grants the devotee entrance into the eternal abode of Lord Hari. The Lord also described the detailed procedure for observing this sacred vrata, emphasizing purity, worship of Lord Vishnu, fasting, and remaining awake throughout the night in devotional service.</p>

             <p>To illustrate the greatness of this Ekadasi, Lord Krishna narrated the history of King Kartavirya and his devoted queen, Padmini. Although the king possessed immense wealth and many queens, he remained childless because of a curse. Hoping to obtain a worthy son, he renounced his kingdom and performed severe austerities for ten thousand years in the Himalayas. His faithful wife Padmini accompanied him throughout this difficult period, serving him with unwavering devotion.</p>

             <p>Seeing that her husband's austerities had not yet borne fruit, Queen Padmini approached the exalted sage Anasuya and humbly asked for guidance. Anasuya instructed her to faithfully observe the sacred Padmini Ekadasi during the extra month by fasting completely, remaining awake throughout the night, and worshipping Lord Vishnu with full devotion. Following these instructions with complete sincerity, Padmini observed the vrata perfectly.</p>

             <p>Greatly pleased by her devotion, Lord Keshava personally appeared before Padmini riding on Garuda and offered her a boon. At her request, He also blessed King Kartavirya with the son they had long desired. In due course, Queen Padmini gave birth to the mighty Kartavirya Arjuna, a powerful emperor who became unconquerable by all beings except the Supreme Lord Himself. Such was the extraordinary result of faithfully observing Padmini Ekadasi.</p>

             <p>Lord Krishna concluded by declaring that anyone who faithfully observes Padmini Ekadasi according to the prescribed rules, or even hears its glories with devotion, attains immense spiritual merit, has all desires fulfilled, becomes freed from sinful reactions, and ultimately returns to the eternal abode of Lord Hari.</p>

             <h3>Lessons from the Pastime</h3>
             <ul>
               <li>Sincere devotion combined with faithful observance of Ekadasi attracts the direct mercy of Lord Vishnu.</li>
               <li>Perseverance in spiritual practice eventually bears fruit, even after many years of difficulty.</li>
               <li>The guidance of saintly devotees and spiritual teachers leads one to the proper path of devotion.</li>
               <li>Selfless dedication and support within family life strengthen spiritual progress.</li>
               <li>Padmini Ekadasi demonstrates that Lord Hari fulfills both material and spiritual desires when worshipped with complete faith and surrender.</li>
             </ul>
             `,
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
    name: '',
    date: '2026-07-25',
    paksha: 'Shukla',
    description: 'On this day, Lord Vishnu goes to sleep for four months (Chaturmas). It marks the beginning of the holy Chaturmas period.',
    significance: 'This highly sacred Ekadasi marks the beginning of Chaturmas — the four months when Lord Vishnu rests on Shesha Naga in the Ksheer Sagar. Devotees intensify their spiritual practices during this period. It is said that Lord Vishnu grants special mercy to those who observe this Ekadasi.',
    pastime:`<h2>📖 The Pastime of Padma (Devashayani) Ekadasi</h2>

             <p>
                 Once, Maharaja Yudhishthira asked Lord Sri Krishna,
                 <em>"O Keshava, what is the name of the Ekadasi that occurs during the bright fortnight of the month of Ashadha? Who is its presiding Deity, and how should it be observed?"</em>
             </p>

             <p>
                 Lord Sri Krishna replied that this sacred Ekadasi is known as
                 <strong>Padma Ekadasi</strong>, also called
                 <strong>Devashayani Ekadasi</strong>. Lord Brahma had once narrated its glories to Narada Muni, explaining that fasting on this Ekadasi removes all sins, fulfills righteous desires, and grants ultimate liberation.
             </p>

             <p>
                 Long ago, there lived a righteous emperor named
                 <strong>King Mandhata</strong> of the Solar Dynasty. He ruled his kingdom with justice, compassion, and unwavering adherence to dharma. Under his reign, the people prospered, there was no disease or famine, and everyone lived peacefully while performing their religious duties.
             </p>

             <p>
                 However, due to an unknown sinful influence within the kingdom, a severe drought struck the land. For three consecutive years, no rain fell. Crops failed, rivers dried up, and famine spread throughout the kingdom. Without grains and water, the people were unable to perform sacrifices, worship properly, or sustain themselves.
             </p>

             <p>
                 The distressed citizens approached King Mandhata and humbly pleaded for help. The king carefully reflected upon his own conduct and found no deliberate wrongdoing. Determined to discover the cause of the calamity, he left his palace and journeyed into the forest to seek guidance from great sages.
             </p>

             <p>
                 Eventually, King Mandhata reached the hermitage of the exalted sage
                 <strong>Angira Muni</strong>. Offering his respectful obeisances, the king explained the suffering of his kingdom and asked the sage to reveal the reason for the devastating drought.
             </p>

             <p>
                 Angira Muni explained that during the Satya-yuga, strict adherence to dharma maintained universal harmony. He informed the king that an imbalance had arisen within the kingdom due to improper spiritual practices, which had disrupted nature's order and prevented rainfall.
             </p>

             <p>
                 Although one possible solution involved harsh punishment, King Mandhata compassionately requested a peaceful spiritual remedy instead. Pleased by the king's humility and mercy, Angira Muni instructed him to observe the sacred
                 <strong>Padma (Devashayani) Ekadasi</strong> together with all the citizens of the kingdom.
             </p>

             <p>
                 Following the sage's instructions, King Mandhata announced the observance of Padma Ekadasi throughout the kingdom. Brahmanas, Kshatriyas, Vaishyas, Shudras, and all citizens sincerely fasted, worshipped Lord Vishnu, and spent the day in devotional service.
             </p>

             <p>
                 By the mercy of Lord Hrishikesha (Lord Vishnu), dark clouds gathered soon after the Ekadasi was observed. Heavy rains blessed the kingdom, rivers filled once again, crops flourished, and prosperity returned. The entire kingdom rejoiced, recognizing that the Lord responds to sincere devotion offered with faith.
             </p>

             <p>
                 Lord Sri Krishna concluded by explaining that Padma Ekadasi is also known as
                 <strong>Devashayani Ekadasi</strong>, the sacred day when Lord Vishnu enters His divine cosmic rest (Yoga Nidra). This day marks the beginning of the holy
                 <strong>Chaturmasya</strong>, a four-month period dedicated to increased devotion, austerity, and spiritual practices. He declared that anyone who faithfully observes or even hears the glories of this Ekadasi becomes freed from sinful reactions and gradually attains the eternal abode of Lord Vishnu.
             </p>

             <h2>📖 Lessons Learnt</h2>

             <h3>1. Sincere devotion can overcome any obstacle</h3>
             <p>
                 Even though King Mandhata ruled righteously, his kingdom suffered a devastating drought.
                 By faithfully observing Padma (Devashayani) Ekadasi and taking shelter of Lord Vishnu,
                 the kingdom received abundant rainfall and prosperity. This teaches that sincere devotion
                 to the Lord removes even the greatest difficulties.
             </p>

             <h3>2. A true leader seeks the welfare of everyone</h3>
             <p>
                 Instead of blaming others, King Mandhata accepted responsibility for his kingdom's suffering.
                 He personally approached the sage Angira Muni to seek spiritual guidance and worked tirelessly
                 for the well-being of all his citizens. Great leadership is rooted in humility and selfless service.
             </p>

             <h3>3. Compassion is superior to punishment</h3>
             <p>
                 Although Angira Muni initially suggested eliminating the cause of the imbalance, King Mandhata
                 sought a compassionate spiritual solution. His merciful attitude pleased the sage, who revealed
                 Padma Ekadasi as the remedy that would restore harmony without harming anyone.
             </p>

             <h3>4. Collective spiritual practice benefits society</h3>
             <p>
                 King Mandhata encouraged every citizen to observe Padma Ekadasi together. Their united devotion
                 pleased Lord Vishnu, bringing rainfall, abundant harvests, peace, and prosperity to the entire
                 kingdom. When society comes together in sincere devotion, everyone benefits.
             </p>

             <h3>5. Lord Vishnu is the ultimate maintainer</h3>
             <p>
                 Rain, food, prosperity, and the welfare of all living beings ultimately depend upon the mercy of
                 Lord Vishnu. This pastime reminds us that sincere surrender to the Supreme Lord brings both
                 material well-being and spiritual advancement.
             </p>

             <h3>6. Devashayani Ekadasi marks the beginning of Chaturmasya</h3>
             <p>
                 Padma Ekadasi is also known as Devashayani Ekadasi because it marks the day Lord Vishnu enters
                 His divine Yoga Nidra (cosmic rest). It begins the sacred four-month period of Chaturmasya,
                 during which devotees increase their devotional practices, simplicity, and remembrance of the Lord.
             </p>

             <h3>7. Ekadasi grants both worldly and spiritual blessings</h3>
             <p>
                 Lord Sri Krishna declares that those who faithfully observe Padma (Devashayani) Ekadasi are freed
                 from sinful reactions, have their righteous desires fulfilled, receive the Lord's mercy, and
                 ultimately attain His eternal abode in Vaikuntha.
             </p>`,
    banner: shayaniekadasiImg,
  },
  {
    slug: 'kamika',
    name: 'Kamika Ekadasi',
    date: '2026-08-09',
    paksha: 'Krishna',
    description: 'Worshipping Lord Vishnu with Tulasi leaves on this day grants liberation and the destruction of all sins.',
    significance: 'Lord Brahma told Narada Muni that of all offerings, Tulasi leaves are most dear to Lord Vishnu. On Kamika Ekadasi, even offering a single Tulasi leaf to the Lord grants more merit than donating ten million cows in charity. This Ekadasi especially glorifies Tulasi worship.',
    pastime: `<h2>📖 The Pastime of Kamika Ekadasi</h2>

              <p>
                  Once, Maharaja Yudhishthira asked Lord Sri Krishna,
                  <em>"O Supreme Lord, I have heard the glories of Devashayani Ekadasi. Now please explain the Ekadasi that occurs during the dark fortnight of the month of Shravana. What are its glories, and how should it be observed?"</em>
              </p>

              <p>
                  Lord Sri Krishna replied that this sacred Ekadasi is known as <strong>Kamika Ekadasi</strong>, one of the most powerful Ekadasis for destroying sinful reactions. To explain its greatness, Lord Krishna narrated a conversation between Narada Muni and Lord Brahma.
              </p>

              <p>
                  Narada Muni once approached his father, Lord Brahma, and humbly asked, <em>"O Lord, please tell me about the Ekadasi that occurs during the dark fortnight of Shravana. Which Deity should be worshipped, how should the vrata be observed, and what benefits does it bestow?"</em>
              </p>

              <p>
                  Lord Brahma happily replied that simply hearing the glories of Kamika Ekadasi grants merit equal to performing the great Ashvamedha (horse) sacrifice. He explained that worshipping Lord Vishnu on this day yields far greater spiritual benefit than bathing at the holiest pilgrimage sites such as Kashi, Pushkara, Naimisharanya, Kurukshetra, the Gandaki River, or the Godavari River under the most auspicious planetary combinations.
              </p>

              <p>
                  Lord Brahma further declared that observing Kamika Ekadasi with devotion grants the same merit as donating a milk-giving cow with her calf, one of the highest forms of charity described in the Vedic scriptures. Those who worship Lord Vishnu on this day are glorified by the demigods, Gandharvas, Nagas, and all celestial beings.
              </p>

              <p>
                  Lord Brahma then emphasized that Kamika Ekadasi is especially beneficial for those burdened by sinful activities. Even a person deeply immersed in material life can become purified by sincerely observing this Ekadasi according to their capacity. Lord Hari Himself has declared that fasting on Kamika Ekadasi grants greater spiritual merit than studying all the Vedic scriptures.
              </p>

              <p>
                  One of the greatest glories of Kamika Ekadasi is the worship of <strong>Srimati Tulsi Devi</strong>. Lord Brahma explained that offering even a single Tulsi leaf to Lord Krishna with devotion pleases Him more than offering costly jewels, pearls, diamonds, gold, or precious gems. Merely seeing Tulsi, touching her, praying to her, watering her, or planting her on this sacred day destroys sins, removes diseases, protects one from Yamaraja, and ultimately grants residence in Lord Krishna's eternal abode.
              </p>

              <p>
                  Lord Brahma also glorified the offering of a ghee lamp before Lord Vishnu and Tulsi Devi on Kamika Ekadasi. He explained that even Chitragupta, the divine recorder of karma, cannot calculate the immense spiritual merit earned by such an offering. The devotee's forefathers become elevated to the heavenly planets, and the devotee becomes freed from countless sinful reactions.
              </p>

              <p>
                  Lord Sri Krishna concluded by telling Maharaja Yudhishthira that Kamika Ekadasi destroys even the gravest sins and grants liberation to those who faithfully observe it. However, He warned that one should never intentionally commit sinful acts with the expectation of being absolved merely by observing this Ekadasi. Such deliberate misuse of spiritual practices is itself a great offense.
              </p>

              <p>
                  Lord Krishna finally declared that anyone who hears, reads, or faithfully observes the glories of Kamika Ekadasi becomes purified of all sins and ultimately returns to the eternal abode of Lord Vishnu, Vaikuntha.
              </p>

              <h2>📖 Lessons Learnt</h2>

              <h3>1. Devotion is greater than elaborate rituals</h3>
              <p>
                  Lord Brahma teaches that sincerely observing Kamika Ekadasi and worshipping Lord Vishnu yields greater spiritual merit than performing costly sacrifices or visiting many holy places. Pure devotion is what truly pleases the Lord.
              </p>

              <h3>2. Even the simplest offering made with love pleases Lord Krishna</h3>
              <p>
                  A single Tulsi leaf offered with sincere devotion is more pleasing to Lord Krishna than priceless jewels, gold, or expensive offerings. The Lord values the love and sincerity behind the offering more than its material value.
              </p>

              <h3>3. No one is beyond redemption</h3>
              <p>
                  Kamika Ekadasi provides hope for everyone, including those burdened with sinful reactions. Through sincere repentance, fasting, and devotional service, one can become purified and progress toward spiritual life.
              </p>

              <h3>4. Tulsi Devi holds a unique place in devotional service</h3>
              <p>
                  Worshipping, watering, planting, or simply offering prayers to Tulsi Devi on Kamika Ekadasi grants immense spiritual benefits. She is especially dear to Lord Krishna and helps devotees attain His mercy.
              </p>

              <h3>5. Spiritual practices should never be misused</h3>
              <p>
                  Lord Krishna clearly warns against deliberately committing sins while expecting Ekadasi to erase them later. True observance requires sincerity, repentance, and a genuine desire to improve one's life.
              </p>

              <h3>6. Simple devotional acts have eternal results</h3>
              <p>
                  Offering a lamp, chanting the holy names, worshipping Lord Vishnu, and staying awake in remembrance of Him on Kamika Ekadasi generate immense spiritual merit and benefit both the devotee and their ancestors.
              </p>

              <h3>7. Kamika Ekadasi leads the soul back to Godhead</h3>
              <p>
                  Those who faithfully hear, read, or observe Kamika Ekadasi become free from sinful reactions, receive Lord Vishnu's mercy, and ultimately attain His eternal abode in Vaikuntha.
              </p>`,
    banner: kamika,
  },
  {
    slug: 'shravana-putrada',
    name: 'Shravana Putrada Ekadasi',
    date: '2026-08-24',
    paksha: 'Shukla',
    description: 'This Ekadasi blesses childless couples with virtuous progeny and grants all devotees spiritual elevation.',
    significance: 'King Mahijit of Mahishmati was sonless despite performing many sacrifices. The sage Lomasa advised the king and queen to observe Putrada Ekadasi. By its power, they were blessed with a beautiful son. This Ekadasi is especially observed by those desiring children.',
    pastime: `<h2>📖 Pastime</h2>

              <p>
              King <strong>Suketuman</strong> ruled the prosperous kingdom of <strong>Bhadravati</strong> with his devoted queen,
              <strong>Shaibya</strong>. Despite possessing wealth, power, and righteousness, the royal couple lived in deep sorrow
              because they had no children. The king constantly lamented that without a son, his lineage would end, his ancestors
              would no longer receive the traditional offerings (<em>tarpana</em>), and his life's accomplishments would remain incomplete.
              </p>

              <p>
              Overwhelmed by anxiety, King Suketuman one day mounted his horse and rode alone into a dense forest. Hungry, thirsty,
              and exhausted, he reflected upon what sinful deeds from previous lives could have resulted in such suffering. While
              wandering through the forest, by the strength of his accumulated piety, he arrived at a beautiful lotus-filled lake
              surrounded by peaceful hermitages where many exalted sages resided.
              </p>

              <p>
              The king respectfully offered his obeisances to the assembled sages. Pleased by his humility, they introduced themselves
              as the <strong>ten Vishvadevas</strong> (the sons of Vishva). They informed the king that the sacred
              <strong>Putrada Ekadashi</strong> had arrived—a holy day especially meant for those desiring virtuous children.
              </p>

              <p>
              The sages instructed the king,
              <em>"The very meaning of Putrada is 'the giver of a pious son.' Observe this Ekadashi with complete faith by fasting
              according to the prescribed rules. By the mercy of Lord Sri Keshava and our blessings, your desire will surely be fulfilled."</em>
              </p>

              <p>
              Following their instructions with full devotion, King Suketuman observed the Putrada Ekadashi fast sincerely. On the
              following day (Dvadasi), after properly breaking his fast, he offered respectful obeisances to the Vishvadevas and
              returned to his kingdom.
              </p>

              <p>
              Soon afterward, Queen Shaibya conceived a child, and in due course she gave birth to a glorious and virtuous son,
              exactly as the sages had foretold. Thus, by faithfully observing Putrada Ekadashi and receiving the blessings of
              the Lord and His devotees, the king's sorrow disappeared, his dynasty continued, and his kingdom flourished once again.
              </p>

              <h2>🌟 Lessons Learned</h2>

              <ul>
                <li><strong>Faith in the Lord brings impossible blessings:</strong> What could not be achieved through anxiety or worldly effort was accomplished through sincere devotion and observance of Ekadashi.</li>

                <li><strong>Seek saintly association:</strong> The turning point in King Suketuman's life came when he humbly approached exalted sages and accepted their guidance.</li>

                <li><strong>Ekadashi fulfills both material and spiritual desires:</strong> Putrada Ekadashi grants righteous offspring to sincere devotees while also awarding liberation to those who observe it with devotion.</li>

                <li><strong>Anxiety is removed by surrender, not worry:</strong> The king's constant lamentation brought no solution, but surrendering to the Lord's instructions transformed his destiny.</li>

                <li><strong>Humility attracts divine mercy:</strong> The king approached the sages respectfully without pride, making himself eligible to receive their blessings.</li>

                <li><strong>The blessings of devotees carry the Lord's mercy:</strong> The Vishvadevas did not independently grant the boon; they invoked the mercy of Lord Keshava, showing that all blessings ultimately come from the Supreme Lord.</li>

                <li><strong>Following scriptural instructions exactly brings success:</strong> King Suketuman carefully observed the Ekadashi according to the prescribed rules, demonstrating the importance of disciplined devotional practice.</li>

                <li><strong>The true purpose of family life is spiritual:</strong> The king desired a son not merely for personal happiness but to continue dharma, honor his ancestors, and engage future generations in devotional service.</li>

                <li><strong>The Lord rewards sincere devotion more than material qualifications:</strong> Although the king already possessed wealth and power, his real blessing came only after seeking shelter in devotional observance.</li>

                <li><strong>Putrada Ekadashi benefits everyone:</strong> Those desiring virtuous children receive that blessing, while anyone who faithfully hears, reads, or observes its glories earns immense spiritual merit and progresses toward Lord Vishnu's eternal abode.</li>
              </ul>`,
    banner: ekadasiImg,
  },
  {
    slug: 'aja',
    name: 'Aja (Annada) Ekadasi',
    date: '2026-09-07',
    paksha: 'Krishna',
    description: 'King Harishchandra regained his lost kingdom by observing this Ekadasi, making it the bestower of lost fortune.',
    significance: 'The righteous King Harishchandra, who had lost everything due to a curse, was advised by the sage Gautama to observe Aja Ekadasi. By its immense spiritual potency, the king regained his kingdom, was reunited with his family, and ultimately attained the spiritual world.',
    pastime: `<h2>📖 Pastime</h2>

              <p>
              Once there lived the illustrious King <strong>Harishchandra</strong>, renowned throughout the world for his unwavering truthfulness,
              integrity, and devotion to righteousness. His queen was <strong>Chandramati</strong>, and they had a beloved son named
              <strong>Lohitashva</strong>. Although blessed with a prosperous kingdom and noble family, by the force of destiny the king
              lost everything he possessed.
              </p>

              <p>
              Reduced to extreme poverty, Harishchandra was forced to sell his kingdom, his wife, and even his son. Eventually, he
              became the servant of a dog-eater, whose duty assigned him to guard a crematorium. Despite suffering immense hardship
              and humiliation, Harishchandra never abandoned truthfulness or his righteous conduct. Just as nectar retains its
              immortal nature even when mixed with other substances, the king's character remained pure despite his difficult
              circumstances.
              </p>

              <p>
              After enduring many years of sorrow, Harishchandra became overwhelmed with grief and wondered how he could ever be
              freed from his suffering. At that moment, by divine arrangement, the great sage <strong>Gautama Muni</strong> arrived.
              The king respectfully offered his obeisances and humbly narrated the painful story of his downfall.
              </p>

              <p>
              Deeply moved by the king's steadfast virtue, Gautama Muni instructed him about the sacred
              <strong>Aja (Annada) Ekadashi</strong>, observed during the dark fortnight of the month of Bhadrapada.
              The sage explained that faithfully observing this Ekadashi fast and remaining awake throughout the night would destroy
              all sinful reactions accumulated from previous lives.
              </p>

              <p>
              Following the sage's instructions with complete faith, King Harishchandra observed the Aja Ekadashi fast exactly as
              prescribed. By the extraordinary mercy of the Lord, the reactions of his past karma were immediately destroyed.
              His long period of suffering came to an end.
              </p>

              <p>
              Soon afterward, Harishchandra was miraculously reunited with his wife Chandramati and his son Lohitashva, who had been
              restored by divine grace. The demigods rejoiced, showering celestial flowers from heaven while beating their heavenly
              drums. By the power of Aja Ekadashi, the king regained his lost kingdom and once again ruled his subjects in happiness
              and righteousness.
              </p>

              <p>
              At the end of his earthly life, King Harishchandra, together with his family and faithful subjects, attained the
              spiritual world by the blessings of faithfully observing Aja Ekadashi.
              </p>

              <h2>🌟 Lessons Learned</h2>

              <ul>
                <li><strong>Truthfulness should never be abandoned:</strong> Even after losing his kingdom, family, and wealth, King Harishchandra remained steadfast in truth and righteousness.</li>

                <li><strong>Suffering is temporary, but virtue is eternal:</strong> Material hardships eventually pass, but one's devotion and character bring everlasting spiritual benefit.</li>

                <li><strong>Saintly association changes destiny:</strong> Meeting Gautama Muni provided the king with the spiritual guidance that transformed his life.</li>

                <li><strong>Ekadashi destroys accumulated sinful reactions:</strong> Aja Ekadashi removed the karmic reactions responsible for the king's prolonged suffering.</li>

                <li><strong>Faithful obedience to spiritual instructions brings success:</strong> Harishchandra followed Gautama Muni's advice exactly, demonstrating complete faith in guru and scripture.</li>

                <li><strong>The Lord never abandons His sincere devotees:</strong> Although tested severely, Harishchandra ultimately received the Lord's mercy, restoration, and eternal reward.</li>

                <li><strong>Patience during trials strengthens devotion:</strong> Rather than becoming bitter or abandoning dharma, the king remained faithful until divine help arrived.</li>

                <li><strong>Material losses cannot diminish spiritual greatness:</strong> External poverty did not reduce Harishchandra's inner wealth of honesty, humility, and devotion.</li>

                <li><strong>Ekadashi grants both material and spiritual blessings:</strong> Through Aja Ekadashi, the king regained his family and kingdom and ultimately attained the spiritual world.</li>

                <li><strong>Hearing the glories of Ekadashi is also spiritually purifying:</strong> Lord Krishna declares that even hearing or studying the glories of Aja Ekadashi bestows immense merit comparable to performing the Ashvamedha (horse) sacrifice.</li>
              </ul>`,
    banner: ekadasiImg,
  },
  {
    slug: 'parsva-parivartini',
    name: 'Parsva (Parivartini) Ekadasi',
    date: '2026-09-22',
    paksha: 'Shukla',
    description: 'On this day, Lord Vishnu turns over in His cosmic sleep. It marks the midpoint of Chaturmas.',
    significance: 'Parsva means "to turn." Midway through His four-month sleep, Lord Vishnu changes His resting position. King Bali, to whom Lord Vamanadeva granted the rulership of the lower planets, especially worships the Lord on this day. Devotees deepen their Chaturmas vows on this Ekadasi.',
    pastime: `<h2>📖 Pastime</h2>

              <p>
              King <strong>Bali Maharaja</strong>, the grandson of the great devotee Prahlada Maharaja, was born in a dynasty of
              demons (Daityas). Although belonging to an asura family, Bali was renowned for his devotion, generosity, truthfulness,
              and unwavering commitment to keeping his promises. By his extraordinary strength and piety, he defeated
              <strong>Indra</strong> and conquered the heavenly planets, bringing all three worlds under his rule.
              </p>

              <p>
              Unable to regain their kingdom, Indra and the other demigods, accompanied by their spiritual master
              <strong>Brihaspati</strong>, approached Lord Vishnu and prayed for His protection. Responding to their sincere prayers,
              the Supreme Lord agreed to appear as <strong>Lord Vamanadeva</strong>, His divine dwarf Brahmana incarnation.
              </p>

              <p>
              At that time, Bali Maharaja was performing a grand sacrifice where he generously granted charity to anyone who asked.
              Lord Vamana, appearing as a young Brahmana dwarf, approached the king and humbly requested only
              <strong>three steps of land</strong>.
              </p>

              <p>
              Although his spiritual master, Shukracharya, warned him that this dwarf was actually Lord Vishnu in disguise,
              Bali Maharaja refused to break his promise. Valuing truthfulness and charity above everything else, he gladly agreed
              to fulfill the Lord's request.
              </p>

              <p>
              The moment Bali granted his request, Lord Vamanadeva expanded into His magnificent
              <strong>Trivikrama</strong> form. With His first step He covered the entire Earth, and with His second step He covered
              all the heavenly planets, including the Sun and the Moon. Having measured the entire universe, the Lord asked,
              "Where shall I place My third step, O Bali?"
              </p>

              <p>
              Realizing that everything already belonged to the Lord, Bali Maharaja bowed down in complete humility and offered
              his own head as the place for the Lord's third step. Lord Vamana placed His lotus foot upon Bali's head,
              thus fulfilling the promise while blessing His surrendered devotee.
              </p>

              <p>
              Although Bali Maharaja was sent to <strong>Patalaloka</strong>, this was not a punishment but a divine blessing.
              Pleased by Bali's complete surrender, Lord Vishnu granted him eternal protection and promised to personally reside
              with him. It is on <strong>Parivartini (Vamana) Ekadashi</strong> that Bali Maharaja installed the Deity of Lord Vamana
              in his palace.
              </p>

              <p>
              Lord Krishna further explained that during the four holy months of Chaturmasya, He rests upon Ananta Shesha in the
              Ocean of Milk. On Parivartini Ekadashi, the Lord turns to His other side while sleeping, making this day especially
              auspicious for worshiping Lord Vamanadeva. Devotees who faithfully observe this Ekadashi receive immense spiritual
              merit and gradually attain the eternal abode of Lord Vishnu.
              </p>

              <h2>🌟 Lessons Learned</h2>

              <ul>
                <li><strong>Everything ultimately belongs to the Supreme Lord:</strong> Bali Maharaja realized that all possessions, power, and even his own body belonged to Lord Vishnu.</li>

                <li><strong>Keep one's promises at all costs:</strong> Despite knowing he would lose everything, Bali Maharaja never broke his word, demonstrating perfect integrity.</li>

                <li><strong>Complete surrender attracts the Lord's greatest mercy:</strong> When Bali offered his own head for the Lord's third step, he attained the Lord's eternal association.</li>

                <li><strong>The Lord sometimes takes away material possessions to grant spiritual wealth:</strong> Although Bali lost his kingdom, he gained the priceless blessing of the Lord's personal presence.</li>

                <li><strong>Humility is greater than power:</strong> Bali's greatness was revealed not through conquest but through his willingness to surrender everything before the Supreme Lord.</li>

                <li><strong>True charity is offering oneself to God:</strong> The highest donation is not wealth or land but complete surrender of one's heart and life in devotional service.</li>

                <li><strong>The Lord protects His devotees while upholding universal dharma:</strong> Lord Vamana restored the heavenly kingdom to the demigods without diminishing His affection for Bali Maharaja.</li>

                <li><strong>Parivartini Ekadashi is especially auspicious during Chaturmasya:</strong> Worshiping Lord Vamanadeva on this day grants immense spiritual merit and helps remove material bondage.</li>

                <li><strong>Simple devotional offerings made with faith are highly pleasing to the Lord:</strong> Offering yogurt mixed with rice, charity, and remaining awake in remembrance of the Lord are recommended observances for this Ekadashi.</li>

                <li><strong>Hearing the Lord's pastimes purifies the heart:</strong> Simply hearing the glories of Parivartini (Vamana) Ekadashi destroys sinful reactions and leads one toward the Lord's eternal abode.</li>
              </ul>`,
    banner: ekadasiImg,
  },
  {
    slug: 'indira',
    name: 'Indira Ekadasi',
    date: '2026-10-06',
    paksha: 'Krishna',
    description: 'This Ekadasi liberates ancestors from hellish conditions and grants the observer liberation.',
    significance: 'King Indrasena was informed by Narada Muni that his father was suffering in the lower realms. By observing Indira Ekadasi with full devotion and offering the merit to his departed father, the king freed his father from suffering and both attained the spiritual world.',
    pastime: `<h2>📖 Pastime</h2>

              <p>
              During the Satya-yuga, there ruled a righteous and powerful king named
              <strong>Indrasena</strong>, the sovereign of the prosperous kingdom of
              <strong>Mahishmati-puri</strong>. He was devoted to Lord Sri Vishnu and carefully
              protected his subjects while faithfully performing his royal duties.
              </p>

              <p>
              One day, while King Indrasena was presiding over his royal assembly,
              the great sage <strong>Narada Muni</strong> descended from the higher planets.
              The king welcomed him with great respect, washed his feet, and offered him
              an honorable seat. Narada, pleased by the king's devotion, inquired about the
              welfare of his kingdom and whether his mind remained fixed in the service of Lord Vishnu.
              </p>

              <p>
              After the king replied that everything was prosperous by the mercy of the Lord,
              he asked Narada the purpose of his visit. Narada then revealed that he had recently
              visited <strong>Yamaloka</strong>, where he met King Indrasena's deceased father.
              Although his father had lived a religious life, he was forced to remain in Yamaraja's
              kingdom because he had once broken an Ekadashi fast improperly before its completion.
              </p>

              <p>
              Narada conveyed the father's heartfelt message:
              <em>"Please observe the upcoming Indira Ekadashi on my behalf. By the spiritual merit
              earned through your sincere observance and charity, I shall be delivered from Yamaloka
              and attain the higher destination."</em>
              </p>

              <p>
              Desiring to rescue his father, King Indrasena humbly requested Narada to explain the
              proper procedure for observing <strong>Indira Ekadashi</strong>. Narada carefully instructed
              him to prepare from Dashami by practicing simplicity, offering oblations to the forefathers,
              eating only once, and sleeping on the floor. On Ekadashi, he was to observe a complete fast,
              worship Lord Vishnu (especially the Shaligrama Shila), perform charity, feed qualified
              Brahmanas with non-grain prasadam, offer prayers for his ancestors, remain awake throughout
              the night, and properly break the fast on Dvadashi after worshiping the Lord.
              </p>

              <p>
              King Indrasena faithfully followed every instruction exactly as Narada had prescribed.
              When he completed the observance and broke his fast on Dvadashi, celestial flowers showered
              from the heavens. By the immense spiritual merit of Indira Ekadashi, his father was immediately
              released from the jurisdiction of Yamaraja, attained a divine spiritual body, and ascended to
              the abode of Lord Vishnu upon the back of Garuda.
              </p>

              <p>
              Thus Lord Krishna declared that anyone who faithfully observes or even hears the glories
              of Indira Ekadashi receives immense spiritual merit, while sincere observance performed on
              behalf of departed ancestors can elevate them from suffering to the eternal shelter of
              Lord Hari.
              </p>

              <h2>🌟 Lessons Learned</h2>

              <ul>
                <li><strong>Ekadashi benefits both the living and the departed:</strong> Observing Indira Ekadashi with devotion can deliver departed ancestors from suffering and elevate them to higher spiritual destinations.</li>

                <li><strong>Even small lapses in spiritual practice have consequences:</strong> King Indrasena's father was otherwise righteous, yet improperly breaking an Ekadashi fast resulted in temporary residence in Yamaloka, emphasizing the importance of carefully following devotional practices.</li>

                <li><strong>The mercy of saintly devotees guides us toward liberation:</strong> Narada Muni compassionately carried the father's message and instructed the king on the proper observance of Indira Ekadashi.</li>

                <li><strong>Serving one's parents continues beyond their lifetime:</strong> True gratitude includes performing devotional acts for the spiritual welfare of departed family members.</li>

                <li><strong>Following scriptural instructions exactly brings divine results:</strong> King Indrasena observed every aspect of the Ekadashi vrata faithfully, leading to his father's liberation.</li>

                <li><strong>Charity combined with devotion becomes spiritually powerful:</strong> Worship, offerings, feeding devotees, and giving charity on Ekadashi greatly increase the spiritual merit of one's observance.</li>

                <li><strong>Association with Lord Vishnu is the ultimate destination:</strong> The greatest blessing of Indira Ekadashi is not merely heavenly enjoyment but attaining the eternal abode of Lord Hari.</li>

                <li><strong>The Lord accepts devotional service offered on behalf of others:</strong> Selflessly observing Ekadashi for another person's spiritual welfare is highly pleasing to the Lord.</li>

                <li><strong>Remembrance of the Lord purifies all karmic reactions:</strong> Worshiping Lord Vishnu through fasting, prayer, and night vigil destroys accumulated sins and brings spiritual purification.</li>

                <li><strong>Hearing Ekadashi glories is itself an act of devotion:</strong> Lord Krishna declares that even hearing or reading the narration of Indira Ekadashi grants immense spiritual merit, comparable to performing great Vedic sacrifices.</li>
              </ul>`,
    banner: ekadasiImg,
  },
  {
    slug: 'papankusha',
    name: 'Papankusha Ekadasi',
    date: '2026-10-22',
    paksha: 'Shukla',
    description: 'The "controller of sins" — this Ekadasi is a hook (ankusha) that pulls one out of the ocean of sinful reactions.',
    significance: 'Lord Krishna told Yudhishthira that just as an elephant is controlled by a goad (ankusha), all sins are controlled and destroyed by this Ekadasi. Even the sin of killing a brahmana is neutralized. Devotees who observe it with faith are guaranteed liberation.',
    pastime: `<h2>🌸 The Pastime of Papankusha Ekadashi</h2>

              <p>
              King Yudhishthira asked Lord Sri Krishna about the Ekadashi that occurs during the bright fortnight (Shukla Paksha) of the month of Ashwina (September–October). He wanted to know its name and the benefits of observing it.
              </p>

              <p>
              Lord Krishna replied that this sacred Ekadashi is called <strong>Papankusha Ekadashi</strong>, one of the most powerful Ekadashis for destroying sins and granting liberation. On this day, devotees should worship <strong>Lord Padmanabha (Lord Vishnu)</strong> according to the proper devotional process.
              </p>

              <p>
              Lord Krishna explained that simply offering sincere obeisances to Lord Vishnu on this day grants immense spiritual merit, greater than severe austerities or difficult pilgrimages. Chanting the holy names of the Lord such as <strong>Rama, Krishna, Vishnu,</strong> and <strong>Janardana</strong>, especially on Papankusha Ekadashi, frees one from the fear of Yamaraja, the lord of death.
              </p>

              <p>
              He further declared that the merit obtained by performing hundreds of Ashvamedha (horse) sacrifices or Rajasuya sacrifices cannot equal even a fraction of the merit obtained by faithfully observing Papankusha Ekadashi.
              </p>

              <p>
              Lord Krishna emphasized that until a person observes this Ekadashi, the reactions of sinful activities continue to follow them. But one who sincerely fasts and worships Lord Padmanabha becomes free from sins, attains prosperity, good health, liberation, and ultimately returns to the spiritual world.
              </p>

              <p>
              The Lord also glorified staying awake throughout Ekadashi night in hearing, chanting, and remembering Him. Such an observance not only liberates the devotee but also uplifts ten generations of ancestors from the father's side, mother's side, and even the spouse's family. These liberated ancestors attain beautiful four-armed spiritual forms and are carried to Vaikuntha on Garuda.
              </p>

              <p>
              Lord Krishna encouraged devotees to perform charity according to their capacity on this day, such as donating gold, sesame seeds, cows, grains, water, shoes, umbrellas, or land. Even those with little wealth should bathe, worship the Lord, and give charity as best they can.
              </p>

              <p>
              Finally, Lord Krishna concluded that those who faithfully observe Papankusha Ekadashi become free from all sins, avoid the punishments of Yamaraja, attain the mercy of Lord Vishnu, and eventually return to His eternal abode.
              </p>

              <hr>

              <h2>📖 Lessons Learned</h2>

              <ul>
                  <li>🙏 <strong>Devotional worship of Lord Vishnu is superior to all material rituals and sacrifices.</strong></li>

                  <li>🌿 <strong>Even the greatest sins can be destroyed through sincere observance of Papankusha Ekadashi.</strong></li>

                  <li>📿 <strong>Simply chanting the holy names of the Lord with faith grants immense spiritual benefit.</strong></li>

                  <li>🌙 <strong>Remaining awake on Ekadashi night while hearing and chanting about the Lord multiplies spiritual merit.</strong></li>

                  <li>👨‍👩‍👧‍👦 <strong>One devotee's sincere observance benefits not only themselves but also many generations of their ancestors.</strong></li>

                  <li>🎁 <strong>Charity offered on Ekadashi becomes especially auspicious when performed with devotion.</strong></li>

                  <li>⚖️ <strong>No pilgrimage, sacrifice, or material pious activity equals the spiritual merit of faithfully observing Ekadashi.</strong></li>

                  <li>🕊️ <strong>Ekadashi is ultimately meant to purify the heart and bring the soul back to the eternal service of Lord Vishnu.</strong></li>
              </ul>

              <hr>

              <h2>✨ Key Spiritual Teachings</h2>

              <ul>
                  <li>🪷 Worship Lord Padmanabha (Vishnu) with devotion on Papankusha Ekadashi.</li>

                  <li>📿 Chant the holy names of Lord Krishna and Lord Vishnu throughout the day.</li>

                  <li>🌙 Observe a complete fast according to one's capacity and remain spiritually engaged.</li>

                  <li>🎶 Spend the night in kirtan, hearing scriptures, and remembering the Lord.</li>

                  <li>💛 Offer charity according to one's means with humility and devotion.</li>

                  <li>🌺 Seek purification rather than material gain, knowing that devotion automatically brings the highest blessings.</li>

                  <li>🏵️ Understand that sincere devotion on Ekadashi benefits both the devotee and countless generations of their family.</li>
              </ul>`,
    banner: ekadasiImg,
  },
  {
    slug: 'rama',
    name: 'Rama Ekadasi',
    date: '2026-11-05',
    paksha: 'Krishna',
    description: 'Named in honour of Goddess Rama (Lakshmi), this Ekadasi brings wealth, prosperity, and spiritual fortune.',
    significance: 'Lord Krishna narrated to Yudhishthira how a devoted brahmana named Muchukunda, cursed with leprosy due to past sins, was advised to observe Rama Ekadasi. By its observance, he was cured of his disease, became prosperous, and eventually attained the spiritual realm.',
    pastime: `<h2>🌸 The Pastime of Rama Ekadashi</h2>

              <p>
              King Yudhishthira asked Lord Sri Krishna about the Ekadashi that occurs during the dark fortnight (Krishna Paksha) of the month of Kartika (October–November). He desired to know its name and the spiritual benefits of observing it.
              </p>

              <p>
              Lord Krishna replied that this sacred fast is known as <strong>Rama Ekadashi</strong>. It destroys even the greatest sins and grants the devotee entrance into the spiritual world. To illustrate its extraordinary power, Lord Krishna narrated the history of King Muchakunda, his daughter Chandrabhaga, and her husband Shobhana.
              </p>

              <p>
              King Muchakunda was a righteous ruler, devoted to Lord Vishnu and strict in observing every Ekadashi. His daughter Chandrabhaga had also faithfully observed Ekadashi since childhood. She was married to Prince Shobhana, the son of King Chandrasena.
              </p>

              <p>
              One day, Shobhana visited his father-in-law's palace on the day of Rama Ekadashi. Chandrabhaga became worried because her husband was physically weak and unlikely to tolerate a complete fast. She explained that in her father's kingdom no one—not even the animals—was allowed to eat or drink on Ekadashi.
              </p>

              <p>
              Although he knew his body was frail, Shobhana chose to observe the fast rather than violate the sacred vow. Throughout the day he endured severe hunger and thirst. By the following morning, after completing the Ekadashi fast, his weak body could no longer sustain him, and he passed away.
              </p>

              <p>
              King Muchakunda performed the prince's funeral rites, while Chandrabhaga remained at her father's palace, continuing her lifelong practice of faithfully observing every Ekadashi.
              </p>

              <p>
              Because Shobhana had observed Rama Ekadashi, although without full strength and complete faith, he attained a magnificent celestial kingdom situated upon Mount Mandarachala. His kingdom was filled with dazzling jewels, golden palaces, celestial musicians, and extraordinary opulence. Yet despite its splendor, the kingdom was temporary because his observance had lacked complete conviction.
              </p>

              <p>
              Later, a learned brahmana named Somasharma visited this celestial kingdom during his pilgrimage. Shobhana welcomed him warmly and requested that he return to King Muchakunda's kingdom and inform Chandrabhaga about his condition. He explained that only the spiritual merit accumulated by his devoted wife through her lifelong observance of Ekadashi could make his kingdom permanent.
              </p>

              <p>
              When Somasharma conveyed this message, Chandrabhaga was overjoyed. She requested the brahmana to take her to her husband immediately. On the way they visited the ashrama of Sage Vamadeva. After hearing their story, the sage performed sacred Vedic rites and sprinkled holy water upon Chandrabhaga. By the immense merit she had accumulated through faithfully observing every Ekadashi since childhood, her body became transcendental.
              </p>

              <p>
              Upon reaching Mount Mandarachala, Chandrabhaga reunited with her husband. She lovingly transferred the spiritual merit of her lifelong Ekadashi observances to Shobhana. By the power of her devotion, his celestial kingdom became permanent and inexhaustible, granting them eternal happiness together.
              </p>

              <p>
              Lord Krishna concluded by telling Yudhishthira that both the Ekadashis of the bright and dark fortnights are equally powerful. Just as black and white cows both give nourishing milk, both types of Ekadashi bestow equal spiritual benefit, remove sins, and ultimately lead sincere devotees back to Lord Vishnu's eternal abode.
              </p>

              <hr>

              <h2>📖 Lessons Learned</h2>

              <ul>
                  <li>🙏 <strong>Even imperfectly observing Ekadashi brings immense spiritual benefit when done with sincerity.</strong></li>

                  <li>❤️ <strong>The devotion and spiritual practices of one family member can greatly benefit another.</strong></li>

                  <li>🌙 <strong>Consistent observance of Ekadashi throughout one's life builds extraordinary spiritual merit.</strong></li>

                  <li>📿 <strong>Faith is what makes devotional practices complete and spiritually permanent.</strong></li>

                  <li>🤝 <strong>Association with saintly devotees and brahmanas helps connect us with the Lord's mercy.</strong></li>

                  <li>✨ <strong>Material achievements are temporary, but devotion performed with faith produces eternal results.</strong></li>

                  <li>⚖️ <strong>Both Krishna Paksha and Shukla Paksha Ekadashis are equally sacred and equally powerful.</strong></li>

                  <li>🕊️ <strong>The ultimate purpose of Ekadashi is purification of the heart and attaining Lord Vishnu's eternal abode.</strong></li>
              </ul>

              <hr>

              <h2>✨ Key Spiritual Teachings</h2>

              <ul>
                  <li>🌿 Observe Rama Ekadashi with sincerity according to one's capacity.</li>

                  <li>🪷 Worship Lord Vishnu with devotion throughout the day.</li>

                  <li>📖 Hear and remember the glories of Ekadashi to strengthen faith.</li>

                  <li>🌙 Spend the day and night absorbed in devotional activities whenever possible.</li>

                  <li>💛 Understand that lifelong devotional practices accumulate immeasurable spiritual wealth.</li>

                  <li>👨‍👩‍👧 Support family members in their spiritual life, knowing that devotion benefits everyone.</li>

                  <li>🏵️ Remember that sincere devotion—not physical strength alone—is what pleases Lord Krishna.</li>
              </ul>`,
    banner: ekadasiImg,
  },
  {
    slug: 'utthana',
    name: 'Utthana (Devutthana) Ekadasi',
    date: '2026-11-21',
    paksha: 'Shukla',
    description: 'Lord Vishnu awakens from His four-month sleep on this day. Chaturmas concludes and auspicious activities resume.',
    significance: 'Utthana means "rising." Lord Vishnu arises from His mystic slumber and the four-month period of restricted activities comes to an end. Weddings, house-warmings, and other auspicious ceremonies resume after this day. It is one of the most celebrated Ekadasis across India.',
    pastime: `<h2>🌸 The Pastime of Haribodhini (Devotthani) Ekadashi</h2>

              <p>
              Once, Narada Muni asked his father, Lord Brahma, to explain the glories of the Ekadashi that occurs during the bright fortnight (Shukla Paksha) of the month of Kartika (October–November), known as <strong>Haribodhini Ekadashi</strong> or <strong>Devotthani Ekadashi</strong>.
              </p>

              <p>
              Lord Brahma explained that Haribodhini Ekadashi is one of the most sacred and purifying Ekadashis. It destroys countless sins, bestows immense spiritual merit, and ultimately grants liberation to those who faithfully observe it. He declared that observing this Ekadashi is even more purifying than bathing at the holiest places of pilgrimage.
              </p>

              <p>
              Narada then asked about the difference between completely fasting and partially fasting on Ekadashi. Lord Brahma explained that one who eats only once during the day removes the sins of one previous birth. One who eats only once at night destroys the sins of two previous births. But one who completely fasts eradicates the sins accumulated over seven births. If a devotee not only fasts completely but also remains awake throughout the night engaged in devotional service, the sinful reactions of thousands of previous births are destroyed.
              </p>

              <p>
              Lord Brahma further explained that even a small act of devotion performed on Haribodhini Ekadashi yields unlimited spiritual merit. Conversely, those who neglect spiritual principles, deceive others, or ignore sacred observances cannot easily attain the fruits of religious activities regardless of their social position.
              </p>

              <p>
              He glorified the observance of remaining awake during Ekadashi night, explaining that such a devotee not only attains the eternal abode of Lord Vishnu after death but also elevates ancestors, relatives, and descendants to the Lord's spiritual kingdom.
              </p>

              <p>
              Lord Brahma instructed that devotees should rise during Brahma Muhurta, bathe, worship Lord Keshava, hear His glories, and make a sincere vow to fast. The devotee should pray for the Lord's protection, worship Him with flowers, fruits, camphor, and water offered from a conch shell, and avoid greed by practicing charity instead.
              </p>

              <p>
              A special emphasis was placed on serving Srimati Tulasi Devi. Lord Brahma explained that one who sees Tulasi, touches her, meditates upon her, glorifies her, offers obeisances, prays to her, plants her, worships her, or waters her receives eternal residence in Lord Hari's abode.
              </p>

              <p>
              Lord Brahma also explained that Haribodhini Ekadashi marks the conclusion of the four holy months of Chaturmasya. Whatever austerities or renunciations one observed during Chaturmasya should be concluded by offering appropriate charity, thereby multiplying one's spiritual merit.
              </p>

              <p>
              Thus Lord Brahma concluded that Haribodhini Ekadashi is one of the most powerful opportunities for purification, devotion, charity, and advancement toward eternal service of Lord Vishnu.
              </p>

              <hr>

              <h2>📖 Lessons Learned</h2>

              <ul>
                  <li>🙏 <strong>Haribodhini Ekadashi is one of the most spiritually powerful Ekadashis, capable of destroying sins accumulated over many lifetimes.</strong></li>

                  <li>🌙 <strong>Remaining awake throughout Ekadashi night while hearing and chanting the Lord's glories multiplies spiritual merit.</strong></li>

                  <li>🪷 <strong>Sincere devotion is more valuable than elaborate external rituals.</strong></li>

                  <li>🌿 <strong>Serving Tulasi Devi is one of the highest forms of devotional service and greatly pleases Lord Krishna.</strong></li>

                  <li>🎁 <strong>Replacing greed with charity transforms material wealth into eternal spiritual benefit.</strong></li>

                  <li>📖 <strong>Hearing and discussing the glories of the Lord is an essential part of observing Ekadashi.</strong></li>

                  <li>👨‍👩‍👧 <strong>A devotee's sincere observance benefits not only themselves but also their ancestors and future generations.</strong></li>

                  <li>🕊️ <strong>Haribodhini Ekadashi reminds us that spiritual awakening comes through sincere devotion, discipline, and surrender to Lord Vishnu.</strong></li>
              </ul>

              <hr>

              <h2>✨ Key Spiritual Teachings</h2>

              <ul>
                  <li>🌅 Rise during Brahma Muhurta and begin the day with purification and prayer.</li>

                  <li>🪷 Worship Lord Keshava (Sri Krishna/Vishnu) with devotion using flowers, fruits, incense, camphor, and water from a conch shell.</li>

                  <li>📿 Observe the Ekadashi fast according to one's capacity while remaining absorbed in remembrance of the Lord.</li>

                  <li>🌙 Stay awake during the night in kirtan, hearing scriptures, and devotional activities whenever possible.</li>

                  <li>🌿 Worship, serve, and glorify Srimati Tulasi Devi with love and reverence.</li>

                  <li>🎁 Practice charity and conclude Chaturmasya by offering gifts according to one's means.</li>

                  <li>💛 Remember that the ultimate purpose of Haribodhini Ekadashi is to awaken one's eternal relationship with Lord Vishnu and progress toward His eternal abode.</li>
              </ul>`,
    banner: ekadasiImg,
  },
  {
    slug: 'utpanna',
    name: 'Utpanna Ekadasi',
    date: '2026-12-04',
    paksha: 'Krishna',
    description: 'The origin of Ekadasi herself — this is considered the best day to begin the practice of Ekadasi fasting.',
    significance: 'This Ekadasi celebrates the appearance of Ekadasi Devi, who manifested from the body of Lord Vishnu to slay the demon Mura. Lord Krishna told Arjuna that Utpanna Ekadasi is the mother of all Ekadasis and the best day for a new observer to begin the sacred practice of fasting.',
    pastime: `<h2>🪔 Pastime of Utpanna Ekadasi</h2>

              <p>
              The origin of Ekadasi begins with a conversation between Arjuna and Lord Sri Krishna.
              Arjuna asked about the importance of observing Ekadasi and why it is considered greater than even the most powerful Vedic sacrifices and acts of charity.
              In response, Lord Krishna narrated the divine appearance of Ekadasi Devi.
              </p>

              <p>
              In Satya-yuga, there lived a mighty demon named <strong>Mura</strong>, born in the dynasty of Brahma through the demon Nadijangha.
              Mura possessed extraordinary strength and conquered the three worlds.
              He defeated Indra, Agni, Yama, Vayu, Varuna, the Moon-god, and many other demigods, driving them from their heavenly kingdoms.
              Having usurped their positions, he ruled the universe with fear and oppression.
              </p>

              <p>
              Unable to defeat the demon, the demigods approached Lord Shiva for help.
              Lord Shiva advised them to seek shelter of Lord Vishnu, the protector of all living beings.
              The demigods then approached Lord Vishnu and offered heartfelt prayers, begging Him to rescue them from Mura's tyranny.
              </p>

              <p>
              Hearing their prayers, Lord Vishnu assured them of His protection and led the demigods to Mura's capital city, Chandravati.
              A fierce battle broke out between the Lord and the demon's massive army.
              Lord Vishnu destroyed countless demons with His divine weapons, but Mura himself proved exceptionally powerful.
              The battle continued for one thousand celestial years without conclusion.
              </p>

              <p>
              Finally, to enact His divine pastime, Lord Vishnu appeared to withdraw from the battle and entered a beautiful cave called Himavati in Badarikashrama.
              There He lay down to rest.
              Mura followed Him into the cave and, seeing the Lord apparently asleep, thought it was the perfect opportunity to kill Him.
              </p>

              <p>
              Just as Mura approached, a dazzling young maiden suddenly emerged from the transcendental body of Lord Vishnu.
              She shone with brilliant effulgence and carried many celestial weapons.
              Without hesitation she challenged Mura to battle.
              A fierce fight followed, and despite all his strength, Mura could not overcome her.
              Finally, with one powerful strike, she severed the demon's head, killing him instantly and freeing the three worlds from fear.
              </p>

              <p>
              When Lord Vishnu awoke, He saw Mura lying dead and the radiant maiden standing before Him with folded hands.
              The Lord asked who had slain such a powerful demon.
              The maiden humbly replied that she had manifested from His own transcendental energy to protect Him and the universe.
              </p>

              <p>
              Greatly pleased, Lord Vishnu offered her any boon she desired.
              The maiden requested that anyone who observed a fast on the day of her appearance should be freed from even the greatest sins and ultimately attain the Lord's spiritual abode.
              She also requested that even those unable to perform a complete fast, but who observed Ekadasi according to their capacity, receive great spiritual merit.
              </p>

              <p>
              Lord Vishnu gladly granted her request and declared:
              <strong>"Since you have appeared on the eleventh lunar day (Ekadasi), you shall forever be known as Ekadasi Devi.
              Whoever faithfully observes your vrata shall have all sins destroyed and will ultimately attain My eternal abode."</strong>
              From that day onward, Ekadasi became the most sacred and spiritually powerful day of the lunar month.
              </p>

              <p>
              Lord Krishna concluded by telling Arjuna that both Krishna Paksha and Shukla Paksha Ekadasis are equally sacred.
              Whoever observes Ekadasi with sincerity, devotion, and according to scriptural regulations receives immense spiritual benefit, progresses rapidly in devotional service, and ultimately returns to the eternal abode of Lord Vishnu.
              </p>

              <hr>

              <h2>✨ Lessons Learned</h2>

              <ul>
                <li>True protection comes only by taking shelter of Lord Vishnu.</li>
                <li>Even the most powerful demigods depend upon the Supreme Lord for protection.</li>
                <li>Ekadasi is not man-made—it is a divine manifestation of the Lord's internal spiritual potency.</li>
                <li>Lord Vishnu personally established Ekadasi as the most sacred fasting day for spiritual purification.</li>
                <li>Sincere observance of Ekadasi destroys accumulated sins from many lifetimes.</li>
                <li>The Lord mercifully accepts sincere effort according to one's capacity, whether through complete fasting or simplified observance.</li>
                <li>Both Krishna Paksha and Shukla Paksha Ekadasis award equal spiritual merit.</li>
                <li>Staying awake on Ekadasi night in hearing and chanting the Lord's glories greatly increases spiritual benefit.</li>
                <li>Acts of charity, pilgrimage, and sacrifices are all surpassed by sincere observance of Ekadasi.</li>
                <li>Ekadasi is meant not merely for fasting but for increasing remembrance, devotion, and surrender to Lord Hari.</li>
              </ul>

              <hr>

              <h2>🌺 Spiritual Significance</h2>

              <ul>
                <li>Marks the divine appearance of Ekadasi Devi from Lord Vishnu's transcendental body.</li>
                <li>Demonstrates the Lord's mercy in creating a simple process for liberation during Kali-yuga.</li>
                <li>Shows that spiritual victory is achieved through devotion rather than material strength.</li>
                <li>Highlights the supreme importance of observing Ekadasi among all religious practices.</li>
              </ul>

              <hr>

              <h2>🙏 Main Teachings</h2>

              <ul>
                <li>Observe Ekadasi with sincerity, devotion, and scriptural discipline.</li>
                <li>Spend the day hearing, chanting, worshipping, and remembering Lord Hari.</li>
                <li>Avoid sinful activities and worldly distractions on Ekadasi.</li>
                <li>Break the fast properly on Dvadashi according to scriptural guidelines.</li>
                <li>Understand that Ekadasi is a direct gift of the Lord to help souls return to Him.</li>
              </ul>`,
    banner: ekadasiImg,
  },
  {
    slug: 'mokshada',
    name: 'Mokshada Ekadasi (Gita Jayanti)',
    date: '2026-12-20',
    paksha: 'Shukla',
    description: 'The giver of liberation. Also celebrated as Gita Jayanti — the day Lord Krishna spoke the Bhagavad Gita.',
    significance: 'This Ekadasi is doubly sacred: it grants moksha (liberation) and is also the anniversary of the day Lord Sri Krishna spoke the Bhagavad Gita to Arjuna on the battlefield of Kurukshetra. Known as Vaikuntha Ekadasi in South India, devotees throng temples like Srirangam and Tirumala to pass through the symbolic Vaikuntha Dwaram.',
    pastime: `<h2>🪔 Pastime of Mokshada Ekadashi</h2>

              <p>
              During a conversation with Maharaja Yudhishthira, Lord Sri Krishna explained the glories of the Ekadashi that falls during the bright fortnight (Shukla Paksha) of the month of Margashirsha. This sacred day is known as <strong>Mokshada Ekadashi</strong>, meaning "the Ekadashi that grants liberation." Lord Krishna declared that its worshipable Deity is <strong>Lord Damodara</strong>, and sincere observance of this Ekadashi frees one from sinful reactions and ultimately awards liberation.
              </p>

              <p>
              Long ago, there was a prosperous kingdom called <strong>Champakanagar</strong>, ruled by the righteous King <strong>Vaikhanasa</strong>. He governed his kingdom with great affection, treating his subjects as his own children. The kingdom was filled with learned brahmanas and devoted Vaishnavas who faithfully followed Vedic principles.
              </p>

              <p>
              One night, King Vaikhanasa had a disturbing dream. He saw his deceased father suffering terrible punishments in one of the hellish regions ruled by Yamaraja. His father cried out in agony, begging his son to rescue him from his suffering. The vision deeply disturbed the king, leaving him unable to find peace.
              </p>

              <p>
              The following morning, King Vaikhanasa shared his dream with his ministers and asked how he could free his father from such misery. The ministers advised him to seek the guidance of the great sage <strong>Parvata Muni</strong>, who possessed knowledge of the past, present, and future.
              </p>

              <p>
              The king immediately traveled to the sage's forest hermitage. After respectfully offering his obeisances, he explained his troubling dream and requested guidance. Parvata Muni entered deep meditation to understand the cause of the king's father's suffering.
              </p>

              <p>
              After some time, the sage revealed the truth. In his previous life, the king's father had committed a serious sin by forcibly approaching his wife during her menstrual period, disregarding scriptural principles and religious conduct. As a result of this sinful act, he was now suffering in the hellish planets.
              </p>

              <p>
              Filled with compassion, King Vaikhanasa asked if there was any way to rescue his father. Parvata Muni instructed him to observe <strong>Mokshada Ekadashi</strong>, which occurs during the bright fortnight of Margashirsha. He advised the king to fast with full devotion and then dedicate all the spiritual merit earned from the observance to his suffering father.
              </p>

              <p>
              Following the sage's instructions exactly, King Vaikhanasa returned home. When Mokshada Ekadashi arrived, he observed a strict fast together with his wife, children, relatives, and the citizens of his kingdom. At the conclusion of the vrata, he sincerely offered all the accumulated merit to his departed father.
              </p>

              <p>
              Immediately, the king's father was freed from his suffering in the hellish planets. The messengers of the devas glorified him and escorted him to the heavenly realms. Having been liberated from his sinful reactions, he later continued his devotional service to Lord Krishna and eventually attained the Supreme Abode.
              </p>

              <p>
              Lord Krishna concluded by telling Yudhishthira that whoever faithfully observes Mokshada Ekadashi with devotion becomes purified of sinful reactions, delivers oneself and even one's ancestors, and ultimately attains liberation from the cycle of birth and death.
              </p>

              <hr>

              <h2>✨ Lessons Learned</h2>

              <ul>
                <li>Every action produces karmic reactions, and even hidden sins eventually bear results.</li>
                <li>The sincere observance of Mokshada Ekadashi has the power to free even departed ancestors from suffering.</li>
                <li>The spiritual merit earned through devotional service can be offered for the welfare of others.</li>
                <li>Seeking the guidance of enlightened saints leads to the proper solution for life's greatest problems.</li>
                <li>Observing Ekadashi with faith benefits not only oneself but also one's entire family lineage.</li>
                <li>True compassion includes helping departed relatives attain spiritual elevation.</li>
                <li>Repentance, devotion, and surrender to Lord Krishna can overcome even severe karmic reactions.</li>
                <li>Lord Damodara mercifully grants liberation to those who worship Him sincerely on Mokshada Ekadashi.</li>
                <li>Material prosperity alone cannot remove suffering; only spiritual practices can provide lasting liberation.</li>
                <li>The ultimate goal of Ekadashi is not merely heavenly enjoyment but returning to the eternal abode of Lord Krishna.</li>
              </ul>

              <hr>

              <h2>🌺 Spiritual Significance</h2>

              <ul>
                <li>Mokshada Ekadashi literally means "the Ekadashi that grants liberation."</li>
                <li>The worshipable Deity of this Ekadashi is Lord Damodara.</li>
                <li>It is especially powerful for delivering departed ancestors from suffering.</li>
                <li>The observance purifies sinful reactions and helps devotees progress toward returning to Godhead.</li>
              </ul>

              <hr>

              <h2>🙏 Main Teachings</h2>

              <ul>
                <li>Observe Mokshada Ekadashi with sincere fasting and devotion.</li>
                <li>Worship Lord Damodara with incense, lamps, flowers, Tulasi, and prayers.</li>
                <li>Dedicate the spiritual merit to the welfare of departed ancestors if desired.</li>
                <li>Follow the instructions of bona fide saints and scriptures.</li>
                <li>Use Ekadashi as an opportunity to seek liberation and deepen devotion to Lord Krishna.</li>
              </ul>`,
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

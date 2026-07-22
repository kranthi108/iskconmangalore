import LegalPageLayout, { type LegalSection } from '@/components/legal/LegalPageLayout'

const SECTIONS: readonly LegalSection[] = [
  {
    title: 'Overview',
    paragraphs: [
      'This website is owned and operated by ISKCON Sri Krishna Balaram Mandir, Mangalore. In this Privacy Policy, "we", "us" and "our" refer to ISKCON Mangalore.',
      'We recognize that you may be concerned about the information we collect through our website and how we treat that information. We are committed to ensuring that your privacy is protected.',
      'This policy describes what information we collect from you, why we collect it, how it is used, protected and retained, as well as your choices regarding this information.',
    ],
  },
  {
    title: 'Personal Information',
    paragraphs: [
      'We respect your privacy when you visit our website. We do not collect personally identifiable information unless you provide it to us voluntarily. To access most content on the website you need not register or provide your personal information.',
      'However, we gather certain personally identifiable data under specific circumstances — for example when you donate, register for seva, contact us, or subscribe to updates. We do not sell or trade such information to third parties. We do not share such information with third parties unless authorized by the person submitting the information or when required by law.',
    ],
  },
  {
    title: 'Donations and Seva Offerings',
    paragraphs: [
      'When you make a donation or offer seva through our online donation page, we collect your name, mobile number, e-mail address, postal address and pin code. We use this information to acknowledge the receipt of your donation, process seva offerings, and communicate regarding your contribution.',
      'We also use this information to send you an 80G certificate (if applicable) upon your request and to communicate with you in case of any difficulty in processing the donation.',
      'If you are donating for any seva, you may specify in whose name the seva should be offered. In such cases, we may collect additional details such as the sevakarta’s name, relationship with you, rashi, nakshatra and gotra, which are needed to perform sankalpa in the sevakarta’s name.',
    ],
  },
  {
    title: 'Contact and Enquiries',
    paragraphs: [
      'When you send us an enquiry through the Contact page or other forms on this website, we collect your name, email address, phone number and message to communicate with you and answer your questions.',
    ],
  },
  {
    title: 'Newsletter and Communications',
    paragraphs: [
      'If you subscribe to our newsletter or opt in to receive temple updates, we collect your email address to send you information about festivals, events, special offerings and volunteer opportunities.',
      'You may unsubscribe from these communications at any time using the unsubscribe option provided in our emails or by contacting us directly.',
    ],
  },
  {
    title: 'Payment Gateways',
    paragraphs: [
      'Payment gateways allow you to make a payment electronically using your credit card, debit card, net banking, UPI or other payment methods.',
      'Payment gateways collect data that may include your contact details, card details and transaction details to facilitate your online payment. We do not collect or store your full card or banking details. This data is managed by the payment gateway according to its own privacy policies.',
    ],
    list: ['We use Razorpay as our online payment gateway for donations and seva offerings.'],
  },
  {
    title: 'Analytics',
    paragraphs: [
      'We may use analytics tools to understand how visitors use our website so we can improve your experience and our temple outreach. Such tools may collect non-personal data such as browser type, pages visited, and general usage patterns.',
    ],
  },
  {
    title: 'Security',
    paragraphs: [
      'We are committed to ensuring that the information you share with us is secure. To protect your data from unauthorized access, disclosure, unlawful processing, or accidental loss, destruction or damage, we put in place suitable physical, electronic and managerial procedures.',
    ],
  },
  {
    title: 'Cookies',
    paragraphs: [
      'Third-party tools used on our website may use cookies to automatically collect non-personal information. Cookies are small text files a website uses to recognize repeat visitors and facilitate ongoing access to the site.',
      'If you do not want information collected through cookies, most browsers allow you to deny or accept cookies. Blocking cookies may affect the performance of some website features.',
    ],
  },
  {
    title: 'External Links',
    paragraphs: [
      'Our website may contain links to other websites of interest. Providing a link does not constitute endorsement unless expressly stated. We are not responsible for the privacy practices of external sites regarding the collection and use of your personal information.',
    ],
  },
  {
    title: 'Data Retention',
    paragraphs: [
      'We retain your personal information only as long as necessary to fulfil the purposes described in this policy, unless a longer retention period is required by law or regulations. Tax laws in India may require us to keep contact information and contribution details on file.',
    ],
  },
  {
    title: 'Your Rights',
    paragraphs: [
      'You have certain rights with respect to the personal information we collect about you. Upon your request, we will tell you what information we hold about you, rectify incomplete or inaccurate information, and restrict the use of your information where applicable.',
      'We will make reasonable efforts to delete your information if you ask us to do so, unless we are otherwise required to keep it by law.',
    ],
  },
  {
    title: 'Amendments',
    paragraphs: [
      'If we decide to change our privacy policy, we will post those changes on this page so you are always aware of what information we collect, how we use it, and under what circumstances we disclose it.',
      'We encourage you to periodically review this policy for the latest information on our privacy practices.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="How we collect, use and protect your personal information"
      metaDescription="Privacy Policy for ISKCON Sri Krishna Balaram Mandir, Mangalore — learn how we handle donations, seva registrations and personal data."
      sections={SECTIONS}
      lastUpdated="July 2026"
    />
  )
}

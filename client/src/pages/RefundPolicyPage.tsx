import LegalPageLayout, { type LegalSection } from '@/components/legal/LegalPageLayout'

const SECTIONS: readonly LegalSection[] = [
  {
    title: 'Our Commitment',
    paragraphs: [
      'We follow a reliable refund policy so our donors feel confident about their association with ISKCON Sri Krishna Balaram Mandir, Mangalore.',
      'We take utmost care when processing donations as per the details submitted through our online and offline donation forms. However, in the unlikely event of an erroneous deduction, duplicate charge, or if you wish to cancel a donation before seva has been performed, we will respond within 7 working days from the date of receiving your written request.',
    ],
  },
  {
    title: 'Eligible Refund Situations',
    paragraphs: [
      'Refunds may be considered in the following situations:',
    ],
    list: [
      'The payment gateway debited your account but the transaction was not confirmed in our system.',
      'A duplicate or incorrect amount was charged due to a technical error.',
      'You request cancellation within two days of donation, before the associated seva or offering has been performed.',
    ],
  },
  {
    title: 'Refund Process',
    paragraphs: [
      'To request a refund, please email contact@iskconmangalore.org with proof of the transaction (payment receipt or bank statement showing the deduction) and a written explanation of your request.',
      'The timely refund of the amount will depend on the payment method and bank used during the transaction. Refunds are typically processed within 10–15 working days after verification.',
      'Please note that international donations may require additional working days for refund processing.',
    ],
  },
  {
    title: 'Non-Refundable Situations',
    paragraphs: [
      'Refunds may not be possible in the following cases:',
    ],
    list: [
      'The seva, sankalpa, archana or other offering associated with your donation has already been performed.',
      'A tax exemption receipt (80G certificate) has already been issued for the donation — in such cases, the original receipt must be returned to our official address before any refund can be processed.',
      'The donation was made for a completed festival seva or time-bound offering that has already taken place.',
    ],
  },
  {
    title: 'Failed Transactions',
    paragraphs: [
      'Transactions successfully debited by the payment gateway but not confirmed back to the ISKCON Mangalore system will be treated as failed transactions. All such transactions are eligible for refund after reconciliation.',
    ],
  },
  {
    title: 'Contact for Refunds',
    paragraphs: [
      'For refund-related enquiries, please contact us at contact@iskconmangalore.org or call +91 9686107444 during temple office hours.',
      'ISKCON Sri Krishna Balaram Mandir, PVS Kalakunj, Mangalore, Karnataka 575002.',
    ],
  },
]

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      title="Refund Policy"
      subtitle="Guidelines for donation refunds and failed transactions"
      metaDescription="Refund Policy for ISKCON Sri Krishna Balaram Mandir, Mangalore — learn about eligible refunds, processing times and how to request a refund."
      sections={SECTIONS}
      lastUpdated="July 2026"
    />
  )
}

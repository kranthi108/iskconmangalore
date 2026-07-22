import LegalPageLayout, { type LegalSection } from '@/components/legal/LegalPageLayout'

const SECTIONS: readonly LegalSection[] = [
  {
    title: 'Copyright',
    paragraphs: [
      'This website is Copyright by ISKCON Sri Krishna Balaram Mandir, Mangalore. All Rights Reserved.',
      'The temple appreciates your feedback. Any information including suggestions, questions, comments, creative ideas, graphics or other materials submitted to the temple shall be treated as non-confidential unless otherwise stated. You agree that you will not send any copyrighted information to us without proper authorization.',
      'Physical reprints of material from the site are permitted if you reference the URL for each original web page and the page title. Website content is subject to change without notice and at the sole editorial discretion of ISKCON Mangalore.',
      'Other websites may not copy pages or articles. Instead, please use a hyperlink to the original article on iskconmangalore.org. No artwork or images may be copied to another website without prior written permission.',
      'Websites wishing to link to this site may do so. However, we reserve the right to have any website remove a link to our site for any reason whatsoever.',
    ],
  },
  {
    title: 'Disclaimer',
    paragraphs: [
      'Thank you for visiting iskconmangalore.org, a website of ISKCON Sri Krishna Balaram Mandir, Mangalore, India. By viewing this website (the "Site"), you agree to the terms and conditions specified in this disclaimer, the copyright notice and the privacy policy (collectively, the "Terms and Conditions").',
      'ISKCON Mangalore may update the Terms and Conditions at any time without notice. Please review them from time to time, as your continued use of the Site means you accept any changes.',
      'Upon acceptance of the Terms and Conditions, permission is granted for you to view, copy, print or download material on this site. You may not modify, license, transfer or sell any information obtained from this website. Any use of information from this website must credit ISKCON Mangalore.',
      'This website is for informational purposes only and its content is subject to change without notice. The inclusion of information regarding a product or service on this website does not imply endorsement by ISKCON Mangalore.',
      'Links to other websites are provided solely for the convenience of users. Linked sites are not under the control of ISKCON Mangalore, and we are not responsible for the contents of any linked site, including any link contained in a linked site or any changes or updates to a linked site.',
      'In no event shall ISKCON Mangalore, its members and suppliers be liable for any direct, indirect, punitive, incidental, special or consequential damages arising out of or connected with the use or inability to use this website or linked sites, whether based on contract, tort, negligence, strict liability or otherwise.',
      'If you are dissatisfied with any portion of the site or with any of these terms and conditions, your sole and exclusive remedy is to discontinue using the site.',
      'While ISKCON Mangalore follows procedures to ensure the accuracy and reliability of its website content, your use of it is at your sole risk. You agree to abide by these Terms and Conditions and to comply with all applicable local rules, regulations and laws regarding online conduct and acceptable content.',
    ],
  },
  {
    title: 'Personal Information',
    paragraphs: [
      'We respect your privacy when you visit our website. We do not collect personally identifiable information unless you provide it to us voluntarily. To access the content of the website you need not register or provide your personal information.',
      'However, we gather certain personally identifiable data under specific circumstances. We do not sell or trade such information to third parties. We do not share such information with third parties unless authorized by the person submitting the information or when required by law.',
    ],
  },
  {
    title: 'Donations and Seva',
    paragraphs: [
      'Online donations and seva offerings made through this website are voluntary contributions toward temple activities, festivals, prasadam distribution, and related devotional services.',
      'By making a donation or seva offering, you confirm that the information you provide is accurate and that you authorize the temple to use it for processing your contribution and related communications.',
    ],
  },
  {
    title: 'Refund and Cancellation',
    paragraphs: [
      'Transactions successfully debited by the payment gateway but not confirmed back to the ISKCON Mangalore system will be deemed failed transactions. All such transactions are eligible for refund post reconciliation and will typically be refunded within 10–15 working days.',
      'For full details on refunds, please refer to our Refund Policy page.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'Comments and inquiries regarding these Terms and Conditions should be sent to contact@iskconmangalore.org.',
    ],
  },
]

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout
      title="Terms and Conditions"
      subtitle="Terms of use for the ISKCON Mangalore website"
      metaDescription="Terms and Conditions for using the ISKCON Sri Krishna Balaram Mandir, Mangalore website — copyright, disclaimer and usage terms."
      sections={SECTIONS}
      lastUpdated="July 2026"
    />
  )
}

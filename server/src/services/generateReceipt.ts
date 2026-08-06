import { jsPDF } from 'jspdf'
import { LOGO_BASE64 } from './assets/logo.base64'

export interface ReceiptData {
  receiptNumber: string
  date: string
  donorName: string
  donorAddress: string
  donorPhone: string
  donorEmail: string
  donorPan: string
  amount: number
  amountInWords: string
  paymentType: string
  sevaType: string
}

export async function generateReceiptPDF(data: ReceiptData): Promise<Uint8Array> {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const margin = 18
  const contentWidth = pageWidth - margin * 2
  const centerX = pageWidth / 2

  // Colors
  const darkBrown: [number, number, number] = [101, 67, 33]
  const black: [number, number, number] = [0, 0, 0]
  const gray: [number, number, number] = [80, 80, 80]
  const gold: [number, number, number] = [178, 134, 46]
  const maroon: [number, number, number] = [128, 0, 0]

  let y = 14
  // --- Logo ---
  const logoWidth = 28
  const logoHeight = 14

  pdf.addImage(
    LOGO_BASE64,
    "PNG",
    centerX - logoWidth / 2,
    y,
    logoWidth,
    logoHeight
  )

  y += logoHeight + 8

  // --- Header ---
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(13)
  pdf.setTextColor(...maroon)
  pdf.text('INTERNATIONAL SOCIETY FOR KRISHNA CONSCIOUSNESS', centerX, y, { align: 'center' })
  y += 5.5

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(8)
  pdf.setTextColor(...gray)
  pdf.text('(Founder Acharya: His Divine Grace A.C Bhaktivedanta Swami Prabhupada)', centerX, y, { align: 'center' })
  y += 4
  pdf.text('A non-profit charitable society registered in Bangalore, India, Registration No. S-49/78-79', centerX, y, { align: 'center' })
  y += 4
  pdf.text('Registered office: Hare Krishna Hill, Chord Road, Bangalore - 560 010, India.', centerX, y, { align: 'center' })
  y += 4
  pdf.text('(BO) D.No. 5-7-638, P.V.S Kalakunj, Kodialbail, Mangalore - 575003.', centerX, y, { align: 'center' })
  y += 4
  pdf.text('Ph: +91 88676 22108  |  E-Mail: donorcare.mlr@iskconmangalore.org', centerX, y, { align: 'center' })
  y += 7

  // --- Divider ---
  pdf.setDrawColor(...gold)
  pdf.setLineWidth(0.8)
  pdf.line(margin, y, pageWidth - margin, y)
  y += 6

  // --- Title ---
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(16)
  pdf.setTextColor(...maroon)
  pdf.text('DONATION RECEIPT', centerX, y, { align: 'center' })
  y += 7

  pdf.setDrawColor(...gold)
  pdf.setLineWidth(0.5)
  pdf.line(margin, y, pageWidth - margin, y)
  y += 8

  // --- Receipt No / Date row ---
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(10)
  pdf.setTextColor(...black)
  pdf.text(`No: ${data.receiptNumber}`, margin, y)
  pdf.text(`Date: ${data.date}`, pageWidth - margin, y, { align: 'right' })
  y += 10

  // --- To section ---
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(10)
  pdf.setTextColor(...gray)
  pdf.text('To,', margin, y)
  y += 6

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(11)
  pdf.setTextColor(...black)
  pdf.text(data.donorName, margin, y)
  y += 5.5

  if (data.donorAddress) {
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(9.5)
    pdf.setTextColor(...gray)
    const addressLines = pdf.splitTextToSize(data.donorAddress, contentWidth)
    pdf.text(addressLines, margin, y)
    y += addressLines.length * 4.5
  }
  y += 2

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(9.5)
  pdf.setTextColor(...gray)

  const details: [string, string][] = [
    ['Mobile', data.donorPhone],
    ['Email', data.donorEmail],
    ['PAN', data.donorPan || 'N/A'],
  ]
  for (const [label, value] of details) {
    if (value) {
      pdf.text(`${label}: ${value}`, margin, y)
      y += 5
    }
  }
  y += 6

  // --- Greeting + Body ---
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(10.5)
  pdf.setTextColor(...black)
  pdf.text(`Dear ${data.donorName},`, margin, y)
  y += 8

  const amountFormatted = `Rs. ${data.amount.toLocaleString('en-IN')}`

  const bodyText = `We thank you for your kind & generous donation of ${amountFormatted}/- (Rupees ${data.amountInWords} only) through ${data.paymentType} towards ${data.sevaType} Donation for FY 2026-27.`

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(10)
  const bodyLines = pdf.splitTextToSize(bodyText, contentWidth)
  pdf.text(bodyLines, margin, y)
  y += bodyLines.length * 5 + 4

  const ackText = `ISKCON Mangalore acknowledges the receipt of your donation made on ${data.date} vide Receipt No: ${data.receiptNumber}.`
  const ackLines = pdf.splitTextToSize(ackText, contentWidth)
  pdf.text(ackLines, margin, y)
  y += ackLines.length * 5 + 16

  // --- Amount box ---
  pdf.setFillColor(252, 248, 240)
  pdf.setDrawColor(...gold)
  pdf.setLineWidth(0.6)
  pdf.roundedRect(margin, y, contentWidth, 16, 2, 2, 'FD')
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(12)
  pdf.setTextColor(...maroon)
  pdf.text(`Total Donation: ${amountFormatted}/-`, centerX, y + 10, { align: 'center' })
  y += 26

  // --- Signature ---
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(9.5)
  pdf.setTextColor(...darkBrown)
  pdf.text('For ISKCON Mangalore', pageWidth - margin, y, { align: 'right' })
  y += 12
  pdf.setFont('helvetica', 'bold')
  pdf.text('Authorized Signatory', pageWidth - margin, y, { align: 'right' })
  y += 14

  // --- Divider ---
  pdf.setDrawColor(...gold)
  pdf.setLineWidth(0.4)
  pdf.line(margin, y, pageWidth - margin, y)
  y += 6

  // --- Footer ---
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(7.5)
  pdf.setTextColor(...gray)
  pdf.text('(Donations to this institution are exempted u/s 80G)', centerX, y, { align: 'center' })
  y += 3.5
  y += 5

  pdf.setFont('helvetica', 'italic')
  pdf.setFontSize(8)
  pdf.setTextColor(...maroon)
  pdf.text('Hare Krishna Hare Krishna Krishna Krishna Hare Hare', centerX, y, { align: 'center' })
  y += 3.5
  pdf.text('Hare Rama Hare Rama Rama Rama Hare Hare', centerX, y, { align: 'center' })
  y += 5

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(7.5)
  pdf.setTextColor(...gray)
  pdf.text('For queries - Please contact: +91 88676 22108  |  Website: https://www.iskconmangalore.org', centerX, y, { align: 'center' })

    const buffer = pdf.output("arraybuffer");
    return new Uint8Array(buffer);
}

function numberToWords(num: number): string {
  if (num === 0) return 'Zero'

  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

  function convertLessThanThousand(n: number): string {
    if (n === 0) return ''
    if (n < 20) return ones[n]
    if (n < 100) {
      const ten = Math.floor(n / 10)
      const unit = n % 10
      return tens[ten] + (unit ? ' ' + ones[unit] : '')
    }
    const hundred = Math.floor(n / 100)
    const remainder = n % 100
    return ones[hundred] + ' Hundred' + (remainder ? ' and ' + convertLessThanThousand(remainder) : '')
  }

  function convert(n: number): string {
    if (n === 0) return ''
    
    const scales = ['', 'Thousand', 'Lakh', 'Crore']
    let result = ''
    let scaleIndex = 0
    
    while (n > 0) {
      const chunk = n % 100
      n = Math.floor(n / 100)
      
      if (chunk > 0) {
        if (scaleIndex === 0) {
          result = convertLessThanThousand(chunk) + (result ? ' ' + result : '')
        } else {
          const chunkStr = convertLessThanThousand(chunk)
          if (chunkStr) {
            result = chunkStr + ' ' + scales[scaleIndex] + (result ? ' ' + result : '')
          }
        }
      }
      
      scaleIndex++
    }
    
    return result.trim()
  }

  return convert(num)
}

export function amountInWords(amount: number): string {
  const rupees = Math.floor(amount)
  const paise = Math.round((amount - rupees) * 100)
  
  let words = numberToWords(rupees) + ' Rupees'
  
  if (paise > 0) {
    words += ' and ' + numberToWords(paise) + ' Paise'
  }
  
  return words
}

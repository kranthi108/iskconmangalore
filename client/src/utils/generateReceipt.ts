import { jsPDF } from 'jspdf'
import logoUrl from '@/assets/logo.png'

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

async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

export async function downloadReceipt(data: ReceiptData): Promise<void> {
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
  try {
    const logo = await loadImage(logoUrl)
    const logoH = 22
    const logoW = logoH * (logo.naturalWidth / logo.naturalHeight)
    pdf.addImage(logo, 'PNG', centerX - logoW / 2, y, logoW, logoH)
    y += logoH + 4
  } catch {
    y += 6
  }

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
  pdf.text('Donations to this institution are exempted u/s 80G vide No. ITA/355/2010 DT.12.01.2011', centerX, y, { align: 'center' })
  y += 3.5
  pdf.text('Valid from 01-04-2009  |  PAN: AAATI2696G', centerX, y, { align: 'center' })
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

  pdf.save(`ISKCON-Receipt-${data.receiptNumber}.pdf`)
}

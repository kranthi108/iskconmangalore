#!/usr/bin/env node

const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

// Load logo from client assets
const logoPath = path.join(__dirname, '../client/src/assets/logo.png');
let logoBase64 = '';

try {
  if (fs.existsSync(logoPath)) {
    const logoBuffer = fs.readFileSync(logoPath);
    logoBase64 = logoBuffer.toString('base64');
  } else {
    console.log('Logo not found, will generate without logo');
  }
} catch (error) {
  console.log('Error loading logo:', error.message);
}

// Amount to words converter (Indian numbering system)
function numberToWords(num) {
  if (num === 0) return 'Zero';

  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertLessThanHundred(n) {
    if (n === 0) return '';
    if (n < 20) return ones[n];
    const ten = Math.floor(n / 10);
    const unit = n % 10;
    return tens[ten] + (unit ? ' ' + ones[unit] : '');
  }

  function convertLessThanThousand(n) {
    if (n === 0) return '';
    if (n < 100) return convertLessThanHundred(n);
    const hundred = Math.floor(n / 100);
    const remainder = n % 100;
    return ones[hundred] + ' Hundred' + (remainder ? ' and ' + convertLessThanHundred(remainder) : '');
  }

  // Indian numbering system: process last 3 digits, then groups of 2
  function convert(n) {
    if (n === 0) return '';
    
    let result = '';
    
    // Process last 3 digits (hundreds)
    const lastThree = n % 1000;
    n = Math.floor(n / 1000);
    
    if (lastThree > 0) {
      result = convertLessThanThousand(lastThree);
    }
    
    // Process remaining in groups of 2
    const scales = ['', 'Thousand', 'Lakh', 'Crore', 'Arab', 'Kharab'];
    let scaleIndex = 1;
    
    while (n > 0) {
      const chunk = n % 100;
      n = Math.floor(n / 100);
      
      if (chunk > 0) {
        const chunkStr = convertLessThanHundred(chunk);
        if (chunkStr) {
          result = chunkStr + ' ' + scales[scaleIndex] + (result ? ' ' + result : '');
        }
      }
      
      scaleIndex++;
    }
    
    return result.trim();
  }

  return convert(num);
}

function amountInWords(amount) {
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);
  
  let words = numberToWords(rupees) + ' Rupees';
  
  if (paise > 0) {
    words += ' and ' + numberToWords(paise) + ' Paise';
  }
  
  return words;
}

// Format address from database format
function formatAddress(address) {
  if (!address || typeof address !== 'object') return '';
  
  const parts = [];
  if (address.house) parts.push(address.house);
  if (address.street) parts.push(address.street);
  if (address.city) parts.push(address.city);
  if (address.state) parts.push(address.state);
  if (address.pincode) parts.push(address.pincode);
  
  return parts.filter(p => p).join(', ');
}

// Format date from database format
function formatDate(dateStr) {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0];
}

// Generate PDF
function generateReceiptPDF(data) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  const centerX = pageWidth / 2;

  // Colors
  const darkBrown = [101, 67, 33];
  const black = [0, 0, 0];
  const gray = [80, 80, 80];
  const gold = [178, 134, 46];
  const maroon = [128, 0, 0];

  let y = 14;

  // --- Logo ---
  if (logoBase64) {
    const logoWidth = 28;
    const logoHeight = 14;
    pdf.addImage(logoBase64, "PNG", centerX - logoWidth / 2, y, logoWidth, logoHeight);
    y += logoHeight + 8;
  } else {
    y += 6;
  }

  // --- Header ---
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(13);
  pdf.setTextColor(...maroon);
  pdf.text('INTERNATIONAL SOCIETY FOR KRISHNA CONSCIOUSNESS', centerX, y, { align: 'center' });
  y += 5.5;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(...gray);
  pdf.text('(Founder Acharya: His Divine Grace A.C Bhaktivedanta Swami Prabhupada)', centerX, y, { align: 'center' });
  y += 4;
  pdf.text('A non-profit charitable society registered in Bangalore, India, Registration No. S-49/78-79', centerX, y, { align: 'center' });
  y += 4;
  pdf.text('Registered office: Hare Krishna Hill, Chord Road, Bangalore - 560 010, India.', centerX, y, { align: 'center' });
  y += 4;
  pdf.text('(BO) D.No. 5-7-638, P.V.S Kalakunj, Kodialbail, Mangalore - 575003.', centerX, y, { align: 'center' });
  y += 4;
  pdf.text('Ph: +91 88676 22108  |  E-Mail: donorcare.mlr@iskconmangalore.org', centerX, y, { align: 'center' });
  y += 7;

  // --- Divider ---
  pdf.setDrawColor(...gold);
  pdf.setLineWidth(0.8);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 6;

  // --- Title ---
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.setTextColor(...maroon);
  pdf.text('DONATION RECEIPT', centerX, y, { align: 'center' });
  y += 7;

  pdf.setDrawColor(...gold);
  pdf.setLineWidth(0.5);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 8;

  // --- Receipt No / Date row ---
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(...black);
  pdf.text(`No: ${data.receiptNumber}`, margin, y);
  pdf.text(`Date: ${data.date}`, pageWidth - margin, y, { align: 'right' });
  y += 10;

  // --- To section ---
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(...gray);
  pdf.text('To,', margin, y);
  y += 6;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(...black);
  pdf.text(data.donorName, margin, y);
  y += 5.5;

  if (data.donorAddress) {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9.5);
    pdf.setTextColor(...gray);
    const addressLines = pdf.splitTextToSize(data.donorAddress, contentWidth);
    pdf.text(addressLines, margin, y);
    y += addressLines.length * 4.5;
  }
  y += 2;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9.5);
  pdf.setTextColor(...gray);

  const details = [
    ['Mobile', data.donorPhone],
    ['Email', data.donorEmail],
    ['PAN', data.donorPan || 'N/A'],
  ];
  for (const [label, value] of details) {
    if (value) {
      pdf.text(`${label}: ${value}`, margin, y);
      y += 5;
    }
  }
  y += 6;

  // --- Greeting + Body ---
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10.5);
  pdf.setTextColor(...black);
  pdf.text(`Dear ${data.donorName},`, margin, y);
  y += 8;

  const amountFormatted = `Rs. ${data.amount.toLocaleString('en-IN')}`;

  const bodyText = `We thank you for your kind & generous donation of ${amountFormatted}/- (Rupees ${data.amountInWords} only) through ${data.paymentType} towards ${data.sevaType} Donation for FY 2026-27.`;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  const bodyLines = pdf.splitTextToSize(bodyText, contentWidth);
  pdf.text(bodyLines, margin, y);
  y += bodyLines.length * 5 + 4;

  const ackText = `ISKCON Mangalore acknowledges the receipt of your donation made on ${data.date} vide Receipt No: ${data.receiptNumber}.`;
  const ackLines = pdf.splitTextToSize(ackText, contentWidth);
  pdf.text(ackLines, margin, y);
  y += ackLines.length * 5 + 16;

  // --- Amount box ---
  pdf.setFillColor(252, 248, 240);
  pdf.setDrawColor(...gold);
  pdf.setLineWidth(0.6);
  pdf.roundedRect(margin, y, contentWidth, 16, 2, 2, 'FD');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.setTextColor(...maroon);
  pdf.text(`Total Donation: ${amountFormatted}/-`, centerX, y + 10, { align: 'center' });
  y += 26;

  // --- Signature ---
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9.5);
  pdf.setTextColor(...darkBrown);
  pdf.text('For ISKCON Mangalore', pageWidth - margin, y, { align: 'right' });
  y += 12;
  pdf.setFont('helvetica', 'bold');
  pdf.text('Authorized Signatory', pageWidth - margin, y, { align: 'right' });
  y += 14;

  // --- Divider ---
  pdf.setDrawColor(...gold);
  pdf.setLineWidth(0.4);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 6;

  // --- Footer ---
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(...gray);
  pdf.text('(Donations to this institution are exempted u/s 80G)', centerX, y, { align: 'center' });
  y += 3.5;
  y += 5;

  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(8);
  pdf.setTextColor(...maroon);
  pdf.text('Hare Krishna Hare Krishna Krishna Krishna Hare Hare', centerX, y, { align: 'center' });
  y += 3.5;
  pdf.text('Hare Rama Hare Rama Rama Rama Hare Hare', centerX, y, { align: 'center' });
  y += 5;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(...gray);
  pdf.text('For queries - Please contact: +91 88676 22108  |  Website: https://www.iskconmangalore.org', centerX, y, { align: 'center' });

  return pdf;
}

// Convert database record to receipt data
function convertToReceiptData(record) {
  return {
    receiptNumber: record.receipt_number,
    date: formatDate(record.created_at),
    donorName: record.donor_name,
    donorAddress: formatAddress(record.donor_address),
    donorPhone: record.donor_phone,
    donorEmail: record.donor_email || '',
    donorPan: record.donor_pan || '',
    amount: record.amount,
    amountInWords: amountInWords(record.amount),
    paymentType: record.payment_method || 'Online',
    sevaType: record.seva_name,
  };
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: node batchGenerateReceipts.js [options]

Options:
  --input <path>              Path to JSON file containing donation records (required)
  --output <path>             Output folder path (default: ./receipts)
  --status <status>           Filter by status: created, captured (optional, default: all)
  --skip-existing             Skip if PDF already exists (optional)

Example:
  node batchGenerateReceipts.js --input donations.json --output ./receipts

JSON format:
  [
    {
      "id": 1,
      "receipt_number": "ISKCONMLR-202608-0001",
      "seva_name": "Sri Krishna Janmashtami",
      "donor_name": "John Doe",
      "donor_email": "john@example.com",
      "donor_phone": "+91 9876543210",
      "donor_pan": "ABCDE1234F",
      "donor_address": {"city": "Mangalore", "state": "Karnataka", "street": "ISKCON", "pincode": "575003"},
      "amount": 1000,
      "payment_method": "UPI",
      "status": "captured",
      "created_at": "2026-08-06 10:00:00"
    }
  ]
    `);
    process.exit(0);
  }

  // Parse arguments
  let inputFile = null;
  let outputFolder = './receipts';
  let statusFilter = null;
  let skipExisting = false;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--input':
        inputFile = args[++i];
        break;
      case '--output':
        outputFolder = args[++i];
        break;
      case '--status':
        statusFilter = args[++i];
        break;
      case '--skip-existing':
        skipExisting = true;
        break;
    }
  }

  if (!inputFile) {
    console.error('Error: --input is required');
    console.error('Run with --help for usage information');
    process.exit(1);
  }

  try {
    // Read input file
    console.log(`Reading donations from: ${inputFile}`);
    const fileContent = fs.readFileSync(inputFile, 'utf8');
    const donations = JSON.parse(fileContent);

    console.log(`Found ${donations.length} donation records`);

    // Filter by status if specified
    let filteredDonations = donations;
    if (statusFilter) {
      filteredDonations = donations.filter(d => d.status === statusFilter);
      console.log(`Filtered to ${filteredDonations.length} records with status: ${statusFilter}`);
    }

    // Create output folder if it doesn't exist
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    // Process each donation
    for (const donation of filteredDonations) {
      // Sanitize donor name for filename (remove special characters)
      const sanitizedDonorName = donation.donor_name.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_');
      
      // Format date for filename (DD-MM-YYYY)
      const dateObj = new Date(donation.created_at);
      const dateStr = dateObj.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
      
      const filename = `${sanitizedDonorName}-${donation.amount}-${dateStr}.pdf`;
      const outputPath = path.join(outputFolder, filename);

      // Skip if file exists and --skip-existing flag is set
      if (skipExisting && fs.existsSync(outputPath)) {
        console.log(`Skipping existing: ${filename}`);
        skipCount++;
        continue;
      }

      try {
        const receiptData = convertToReceiptData(donation);
        const pdf = generateReceiptPDF(receiptData);
        pdf.save(outputPath);
        console.log(`Generated: ${filename}`);
        successCount++;
      } catch (error) {
        console.error(`Error generating ${filename}:`, error.message);
        errorCount++;
      }
    }

    console.log('\n=== Summary ===');
    console.log(`Total processed: ${filteredDonations.length}`);
    console.log(`Successfully generated: ${successCount}`);
    console.log(`Skipped (existing): ${skipCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Output folder: ${path.resolve(outputFolder)}`);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();

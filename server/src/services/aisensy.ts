interface AisensyMessageParams {
  phoneNumber: string
  campaignName: string
  pdfUrl: string
  fileName: string
  recipientName: string
}

export async function sendWhatsAppReceipt(params: AisensyMessageParams, apiKey: string): Promise<void> {
  const { phoneNumber, campaignName, pdfUrl, fileName, recipientName } = params

  // Format phone number to ensure it has country code
  let formattedPhone = phoneNumber.replace(/\D/g, '')
  if (!formattedPhone.startsWith('91')) {
    formattedPhone = '91' + formattedPhone
  }

  const messageData = {
    apiKey,
    campaignName,
    destination: formattedPhone,
    userName: recipientName,
    templateParams: [],
    source: "donation receipt",
    media: {
      url: pdfUrl,
      filename: fileName,
    },
    buttons: [],
    carouselCards: [],
    location: {},
    attributes: {},
    paramsFallbackValue: {},
  }

  try {
    const response = await fetch(
      "https://backend.aisensy.com/campaign/t1/api/v2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Aisensy API error: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    console.log('Aisensy response:', result)
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error)
    // Don't throw error - we don't want to fail the payment if WhatsApp fails
    // Just log the error for monitoring
  }
}

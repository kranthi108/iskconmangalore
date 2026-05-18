import type { ApiResponse, ContactFormData } from '@/types'
import type { AxiosResponse } from 'axios'
import { api, assertApiEnvelope } from '@/services/api'

export interface VolunteerApplicationData {
  name: string
  email: string
  phone: string
  sevaAreas: string[]
  availabilityNotes: string
  skills?: string
  message?: string
}

interface ContactSubmissionAck {
  id: string
  receivedAt: string
}

interface VolunteerSubmissionAck extends ContactSubmissionAck {
  onboardingEmailSent?: boolean
}

export async function submitContact(data: ContactFormData): Promise<ContactSubmissionAck> {
  const response = await api.post<
    ApiResponse<ContactSubmissionAck>,
    AxiosResponse<ApiResponse<ContactSubmissionAck>>,
    ContactFormData
  >('/contact', data)

  return assertApiEnvelope(response.data)
}

export async function submitVolunteer(data: VolunteerApplicationData): Promise<VolunteerSubmissionAck> {
  const response = await api.post<
    ApiResponse<VolunteerSubmissionAck>,
    AxiosResponse<ApiResponse<VolunteerSubmissionAck>>,
    VolunteerApplicationData
  >('/volunteers', data)

  return assertApiEnvelope(response.data)
}

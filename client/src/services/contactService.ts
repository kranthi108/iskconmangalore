import type { ApiResponse, ContactFormData } from '@/types'
import type { AxiosResponse } from 'axios'
import { api, assertApiEnvelope } from '@/services/api'

export interface VolunteerSignupData {
  name: string
  phone: string
  date: string
  hoursAvailable: number
  sevaCategory: string
}

interface ContactSubmissionAck {
  id: string
  createdAt: string
}

interface VolunteerSubmissionAck {
  id: string
  createdAt: string
}

export async function submitContact(data: ContactFormData): Promise<ContactSubmissionAck> {
  const response = await api.post<
    ApiResponse<ContactSubmissionAck>,
    AxiosResponse<ApiResponse<ContactSubmissionAck>>,
    ContactFormData
  >('/contact', data)

  return assertApiEnvelope(response.data)
}

export async function submitVolunteer(data: VolunteerSignupData): Promise<VolunteerSubmissionAck> {
  const response = await api.post<
    ApiResponse<VolunteerSubmissionAck>,
    AxiosResponse<ApiResponse<VolunteerSubmissionAck>>,
    VolunteerSignupData
  >('/volunteers', data)

  return assertApiEnvelope(response.data)
}

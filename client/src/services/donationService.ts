import type { ApiResponse, Donation, RazorpayOrder, RazorpayPaymentResponse } from '@/types'
import type { AxiosResponse } from 'axios'
import { api, assertApiEnvelope } from '@/services/api'

export interface CreateDonationOrderInput {
  campaignId: string
  amount: number
  donorEmail: string
  donorName: string
  donorPhone: string
}

export async function createOrder(payload: CreateDonationOrderInput): Promise<RazorpayOrder> {
  const response = await api.post<
    ApiResponse<RazorpayOrder>,
    AxiosResponse<ApiResponse<RazorpayOrder>>,
    Omit<CreateDonationOrderInput, 'amount'> & {
      amount: number
    }
  >('/donations/order', payload)
  return assertApiEnvelope(response.data)
}

export interface VerifyPaymentInput extends RazorpayPaymentResponse {
  campaignId: string
  donorEmail: string
  donorName: string
  donorPhone: string
  amount: number
  isAnonymous?: boolean
  dedication?: string
  donorPAN?: string
}

export async function verifyPayment(payload: VerifyPaymentInput): Promise<Donation> {
  const response = await api.post<ApiResponse<Donation>, AxiosResponse<ApiResponse<Donation>>, VerifyPaymentInput>(
    '/donations/verify',
    payload,
  )
  return assertApiEnvelope(response.data)
}

export async function getReceipt(id: string): Promise<Donation> {
  const response = await api.get<ApiResponse<Donation>>(`/donations/${encodeURIComponent(id)}/receipt`)
  return assertApiEnvelope(response.data)
}

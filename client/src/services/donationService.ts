import type { ApiResponse, Donation, RazorpayOrder, RazorpayPaymentResponse } from '@/types'
import type { AxiosResponse } from 'axios'
import { api, assertApiEnvelope } from '@/services/api'

export interface DonorAddress {
  house?: string
  street?: string
  city?: string
  state?: string
  pincode?: string
}

export interface CreateDonationOrderInput {
  campaignId: number
  amount: number
  donorEmail: string
  donorName: string
  donorPhone: string
  donorPAN?: string
  donorAddress?: DonorAddress
  isAnonymous?: boolean
  dedication?: string
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

export type VerifyPaymentInput = RazorpayPaymentResponse

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

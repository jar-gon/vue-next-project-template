import { post } from '@/utils/http'

const baseUrl = '/api/leads/leads/stats'
export async function getLeadsDateStats(params: Record<string, any>): Promise<any> {
  return post(`${baseUrl}/getLeadsDateStats`, {
    ...params,
  })
}

export async function getLeadsFreshStats(data: Record<string, any>): Promise<any> {
  return post(`${baseUrl}/getLeadsFreshStats`, data)
}

export async function getLeadsRegionStats(data: Record<string, any>): Promise<any> {
  return post(`${baseUrl}/getLeadsRegionStats`, {
    ...data,
  })
}

export async function getLeadsStateTodayStats(): Promise<any> {
  return post(`${baseUrl}/getLeadsStateTodayStats`)
}

export async function getPageData(data: Record<string, any>): Promise<any> {
  return post(`${baseUrl}/page`, {
    ...data,
  })
}

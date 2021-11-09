import { get } from '@/utils/http'

const baseUrl = '/api/leads/dict'
export async function queryByGroupCode(params: DictRuleType): Promise<any> {
  return get(`${baseUrl}/queryByGroupCode`, {
    ...params,
  })
}

export async function saveOrUpdate(params: DictRuleType): Promise<any> {
  return get(`${baseUrl}/saveOrUpdate`, {
    ...params,
  })
}

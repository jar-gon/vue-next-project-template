import { get } from '@/utils/http'

// 组织架构接口
// BU 大区 团队 销售
/**
 * BU/区域/团队/销售层级列表
 * @param params
 * {
 *  buIds  大区ID逗号分割, eg 1,2
 *  isCC   是否CC  true/false
 *  teamAttribute 团队属性 CC,CR
 *  type  类型：1 掌门OA，2 代理 3 销售系统
 * }
 */
export async function getBdts(params = {}): Promise<any> {
  return get('/api/seller/cascade/bdts', params)
}
/**
 * 区域/团队/销售层级列表
 * @param params
 * {
 *  buIds  大区ID逗号分割, eg 1,2
 *  isCC   是否CC  true/false
 *  teamAttribute 团队属性 CC,CR
 *  type  类型：1 掌门OA，2 代理 3 销售系统
 * }
 */
export async function getDts(params = {}): Promise<any> {
  return get('/api/seller/cascade/dts', params)
}
/**
 * 区域/团队层级列表
 * @param params
 * {
 *  buIds  大区ID逗号分割, eg 1,2
 *  isCC   是否CC  true/false
 *  teamAttribute 团队属性 CC,CR
 *  type  类型：1 掌门OA，2 代理 3 销售系统
 * }
 */
export async function getDt(params = {}): Promise<any> {
  return get('/api/seller/cascade/dt', params)
}
/**
 * BU/区域/团队层级列表
 * @param params
 * {
 *  buIds  大区ID逗号分割, eg 1,2
 *  isCC   是否CC  true/false
 *  teamAttribute 团队属性 CC,CR
 *  type  类型：1 掌门OA，2 代理 3 销售系统
 * }
 */
export async function getBdt(params = {}): Promise<any> {
  return get('/api/seller/cascade/bdt', params)
}

export async function queryCCAndCRTeam(params: any): Promise<any> {
  return get('api/zmbiz-sale-crm/config/queryCCAndCRTeam', {
    ...params,
  })
}

export async function getSeller(): Promise<any> {
  return get(`/api/seller/seller/getSeller`)
}
// 获取当前登陆人信息
export async function getCommonUserInfo(): Promise<any> {
  return get('/api/seller/seller/info')
}

// 无权限的获取 bdt 的接口
export async function getbdtNoPerson(params: any): Promise<any> {
  return get('/api/seller/cascade/bdtNoPerson', params)
}

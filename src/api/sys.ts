import { get, post } from '@/utils/http'

/**
 * 从权限系统获取 menus permission me
 * @param code 权限code
 */
export async function getAuth(code: string, systemType = 0): Promise<SysInfoResType> {
  return await get('/api/auth/sys/initInfo', {
    appCode: code,
    // 用户类型，0或空代表OA用户，1代表销售用户
    systemType,
  })
}

/**
 * 创建订单时根据优惠券获取叠加券
 * @param {} params
 */
export async function queryByGroupCodes(
  codes: string[],
): Promise<Record<string, DictValueItemType[]>> {
  return post('/api/leads/dict/queryByGroupCodes', {
    groupCodes: codes,
  })
}

export function queryByGroupCode(groupCode: string): Promise<DictValueItemType[]> {
  return get('/api/leads/dict/queryByGroupCode', {
    groupCode,
  })
}

// 获取公共服务的字典
// 常用的
// 获取 科目
// [{"converCode": "ZM_SALE", "dictCode": "BASIC_SUBJECTS"}]
// 获取 年级
// data: [{"converCode": "ZM_SALE", "dictCode": "GRADE"}],
export function cascade(params: Record<string, any>[]): Promise<CascadeValueItemType[]> {
  if (!Array.isArray(params)) {
    console.error('Please input array search conditions')
    Promise.reject({})
  }
  return new Promise((resolve, reject) => {
    post('/api/dict/service/cascade', params)
      .then((res) => {
        const data = (res.children || []).map((item: any) => {
          const { label, extendLabel, value } = item
          return {
            label: extendLabel || label,
            value,
          }
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function cascadeSubject(): Promise<CascadeValueItemType[]> {
  return cascade([{ converCode: 'ZM_SALE', dictCode: 'BASIC_SUBJECTS' }])
}

export function cascadeGrade(): Promise<CascadeValueItemType[]> {
  return cascade([{ converCode: 'ZM_SALE', dictCode: 'GRADE' }])
}

// 获取省市区
/**
 * 获取省份城市地区
 */
export async function getProvinceCityCountyList(): Promise<any> {
  return get('/api/common/area/provinceCityCountyList')
}
/**
 * 获取省份城市
 */
export async function getProvinceCityList(): Promise<any> {
  return get('/api/common/area/provinceCityList')
}
/**
 * 获取省份
 */
export async function getProvinceList(): Promise<any> {
  return get('/api/common/area/provinceList')
}
/**
 * 根据省市获取城市
 * @param province
 */
export async function getCityList(provinceId: number): Promise<any> {
  if (!provinceId) {
    throw Error(`params provinceId empty is not allow!`)
  }
  return get('/api/common/area/cityList', { provinceId })
}
/**
 * 获取区
 * @param cityId
 * @param province
 */
export async function getCountyList(cityId: number, province: number): Promise<any> {
  if (!cityId) {
    throw Error(`params cityId empty is not allow!`)
  }
  return get('/api/common/area/countyList', { province, cityId })
}
export function queryByMemberGroupCode(groupCode: string): Promise<DictValueItemType[]> {
  return get('/api/member/dict/queryByGroupCode', {
    groupCode,
  })
}

export async function queryByMemberGroupCodes(
  codes: string[],
): Promise<Record<string, DictValueItemType[]>> {
  return post('/api/member/dict/queryByGroupCodes', {
    groupCodes: codes,
  })
}

export async function getDictPC(): Promise<PCCType[]> {
  return get('/api/zmbiz-common-data/area/provinceCity', {})
}

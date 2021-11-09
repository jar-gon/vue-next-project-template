interface QueryParamsDefault {
  pageSize: number;
  pageNo: number;
}
interface HttpResType {
  code: number;
  data: any;
  status: number;
}
interface CommonResType {
  code: string;
  fallback?: boolean;
  message: string;
  status?: string;
  data: any;
}
interface LeadPageParams extends QueryParamsDefault {
  merchantCode: string;
  name: string;
  state: string;
  type: string;
}
interface OrgRulePageParams extends QueryParamsDefault {
  classifierNos?: string[];
  name: string;
  teamId: string;
  ruleGroup?: string;
}

interface PageResType {
  list: [];
  total: number;
  pages?: number;
}

// dict arr type
interface DictValueItemType {
  createTime?: string;
  dictKey: string;
  dictValue: string;
  extra?: string;
  groupCode: string;
  id: number;
  remark?: string;
  sort?: number
  updateTime?: string;
  disabled?: boolean;
}


// declare your own store states
interface StateType {
  count: number;
  permission: string[];
  collapsed: boolean;
  menus: MenuItemType[];
  userInfo: any;
  pageLoading: boolean;
  flatMenu: MenuItemType[];
  bdt: any[];
  menuConfig: any;
  dictMap: any;
  sellerInfo: any;
  locationPC: any[];
  locationPCMap:{[key:string]:string};
  org: any[];
  orgMap:{[key:string]:string};
}

interface UserInfoType {

}
interface InitInfoType {
  permission: string[];
  userInfo: UserInfoType | T;
  flatMenu: MenuItemType[];
  menus: MenuItemType[];
}

// sys
interface MenuItemType {
  ext1: any;
  ext2: any;
  ext3: any;
  ext4: any;
  ext5: any;
  icon: any;
  id: number;
  menuName: string;
  path: string;
  permission: string;
  subMenu: null | MenuItemType[];
  parent?: MenuItemType;
  level?: number;
}

interface SysInfoResType {
  me: any;
  menu: MenuItemType[];
  permission: string[];
}

interface ATableColumnType {
  title: string;
  dataIndex: string;
  width?: string | number;
  scopedSlots?: {[key: string]:string};
  slots?: {[key: string]:string};
  key?: string | number;
}

// time-table
interface TimeTableTimeItemType {
  start: moment.Moment | null
  end: moment.Moment | null
}

interface TimeTableItemBaseType {
  open: boolean
}

interface TimeTableItemType extends TimeTableItemBaseType {
  title: string
  dateTime: TimeTableTimeItemType[]
}

interface TimeTableItemPropType {
  open: boolean
  dateTime: string[]
}

// leads
interface ClassifierRuleType {
  bottom?: boolean | number;
  expr: string;
  id?: number;
  merchantCode: string;
  name: string;
  no?: string;
  reclassify?: boolean;
  sort: number;
  state?: boolean | string;
  type: string | null;
  userId?: number;
  maximumInflow?: number | null;
}

interface RuleAttrType {
  expr: string | null;
  merchantCode?: string;
  moduleType?: string;
  ruleAttrNo?: string;
  ruleKey: string | null;
  ruleName?: string;
  ruleValue: string;
  ruleValueArr?: any[];
  sort: number;
  ruleKeyDisabled?:boolean;
}

interface LeadRuleType {
  classifierRule: ClassifierRuleType;
  ruleAttrs: RuleAttrType[];
  ruleType?: string;
}

interface LeadRuleFormType extends ClassifierRuleType {
  ruleAttrs: RuleAttrType[];
  ruleType: string;
}

interface CascadeValueItemType {
  childNodeCode?: string | null
  childNodeName?: string | null
  children: CascadeValueItemType[] | null
  extendLabel?: string | null
  extendValue?: string | null
  dictKey?: string | null
  dictValue?: string | null
  label: string
  value: string
}
interface RulesApis {
  queryOrgRules: ()=>{};
  batchUpdateOrgRuleState: ()=>{};
  deleteRuleById: ()=>{};
}

interface PCCType {
  value: string;
  label: string;
  children?: PCCType;
  children_c?:PCCType;
  dictKey?:string;
  dictValue?:string;
}

interface QuotaConfigType {
  dayQuota:number,
  monthQuota:number,
  quoRules:Record<string,string>
}

interface ColumnItem {
    title: string;
    dataIndex?: string;
    align?: string;
    width?: string;
    slots?: any;
    ellipsis?: boolean;
}

interface DictRuleType {
  groupCode:string,
  dictKey?:string,
  appGroup:string,
}

interface ClasssifyType {
  no:string,
  name:string,
}

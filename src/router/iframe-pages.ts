import appConfig from '@/appConfig'
import IframePage from '@/views/iframe/index.vue'
import { AppRouteRecordRaw } from './types'

const BASE_URL = appConfig.authDomain
const timestamp = Date.now()
export interface IFrameApp {
  name: string
  entry: string
  path_hash: RegExp
  regx: RegExp
}
const apps: IFrameApp[] = [
  {
    name: 'page-work', // app name registered
    entry: `${BASE_URL}/sale-work/index.html?_nocache=${timestamp}`,
    path_hash:
      /^\/(new_home|quit-school-active|phone_call|stude_inten_new|stude_list|cr_todo_table|tmk_list|sale_retur_order|stude_manag|make-up-course-hours|my-todo-list|data_sale_perfo|order_manage|stude_resum|lz_account|lz_qa|lz_report|qy_report|lz_addConfig|tmk_query|course_receive|cr_retri_order_work|examinat_analysi|lz_customer|data_progress)(\/.*)?(\?.*)?(#.*)?$/i,
    regx: /^\/salework(\/.*)?(\?.*)?(#.*)?$/i,
  },
  {
    name: 'kidsa',
    entry: `${BASE_URL}/kidsa/index.html?_nocache=${timestamp}`,
    path_hash:
      /^\/(kid_cr_home|kid_cc_student_list|kid_tmk_student_list|cr_leave_list_apply|cr_leave_list_manage|children_trans_config|course_manage|course_calendar_new_small|small_class_formal|small_class|cc_small_class|small_evaluation_class|small_class_perfo|data_menus|kid_sales_data|teaching_aids_management|child_teach_data|video_square|all-todo-list)(\/.*)?(\?.*)?(#.*)?$/i,
    regx: /^\/kidsa(\/.*)?(\?.*)?(#.*)?$/i,
  },
  {
    name: 'page-data', // app name registered
    entry: `${BASE_URL}/sale-data/index.html?_nocache=${timestamp}`,
    // 最后都整合到 regx 上
    path_hash:
      /^\/(class_list|cr_evaluation_list|course_calendar|class_report|course_calendar_new|incentive-list|rank_list|incentive-config|new-rank-list|cours_syste|call_serv_monit_cr|tmk-handover-list|child_transfer|dataRpoint-of-money|new_recommend_chart|manage-of-kpi|quality_inspect|student_serv|recommend_chart|zm-activity|prizesSearch|cr_todo_month|perfo_manag|youke_perfo|qc_weekly|exten_exper|award_list|tmk_report_form|data_renewal|transferIntroData|cr_extend_subject_monit|youke_perfo_kpi|teacher_evaluate_cr|trainingData|stu_list_manage|salesperson-pk)(\/.*)?(\?.*)?(#.*)?$/i,
    regx: /^\/saledata(\/.*)?(\?.*)?(#.*)?$/i,
  },
  {
    name: 'page-config', // app name registered
    entry: `${BASE_URL}/sale-config/index.html?_nocache=${timestamp}`,
    path_hash:
      /^\/(kid_payment_order|renewalAudit|sales_config|tianrong_mobile_setting|sale_behavior|todo_progress|organization|commission_rule|student-assign|data_config|exon_deploy|call_script|kpi_manag|performance_complaint|resource_manage|auto_alloc|call_center_setting|retrieve_config|award-config|activity-config|cc-team-grade-config|youke_config|thematic-config|toolbox|sms_log|reset_pwd|self_msg|personal-settings|work-order-management|work_log|configureCenter|stageConfig|qrcode_manage|help_config|sms-config|stu_score|production|pro_active_tem_conf|commo_query|trans_test|call-data|skin_config|call-config|svip_operate)(\/.*)?(\?.*)?(#.*)?$/i,
    regx: /^\/saleconfig(\/.*)?(\?.*)?(#.*)?$/i,
  },
  {
    name: 'page-roster', // app name registered
    entry: `${BASE_URL}/sale-roster/index.html?_nocache=${timestamp}`,
    path_hash: /^\/rostercenter(\/.*)?(\?.*)?(#.*)?$/i,
    regx: /^\/(saleroster|rostercenter)(\/.*)?(\?.*)?(#.*)?$/i,
  },
  {
    name: 'zmop-activities-admin', // app name registered
    entry: `${BASE_URL}/zmop-activities-admin/index.html?_nocache=${timestamp}`,
    path_hash: /^\/(zmop-activities)(\/.*)?(\?.*)?(#.*)?$/i,
    regx: /^\/zmop-activities(\/.*)?(\?.*)?(#.*)?$/i,
  },
  // 线索中心项目
  {
    name: 'zmsale-leads-webapp', // app name registered
    entry: `${BASE_URL}/leads/index.html?_nocache=${timestamp}`,
    path_hash: /^\/(leads)(\/.*)?(\?.*)?(#.*)?$/i,
    regx: /^\/leads(\/.*)?(\?.*)?(#.*)?$/i,
  },
]

function getAppByPath(path: string): IFrameApp | undefined {
  return apps.find(({ path_hash, regx }) => {
    const isActive = path_hash.test(path)
    return isActive || regx.test(path)
  })
}

export const iframeRoutes: AppRouteRecordRaw[] = [
  // 通过iframe的方式渲染旧系统的页面，增改是没问题的
  {
    name: 'iframe-page',
    path: '/iframe-page/:page*',
    component: IframePage,
    props: (route) => {
      const realPath = route.path.replace(/^\/iframe-page/, '')
      const menu = getAppByPath(realPath)
      if (menu) {
        return {
          name: menu.name,
          frameSrc: menu.entry,
        }
      }
    },
    meta: {
      // title: '', // set at router guards
    },
  },
]

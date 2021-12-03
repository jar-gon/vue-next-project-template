import { registerMicroApps, start } from 'qiankun'
// import pageRoster from './pages/page-roster/main';
function getHash() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  const href = window.location.href
  const index = href.indexOf('#')
  return index === -1 ? '' : href.slice(index + 1)
}
const timestamp = process.env.BUILD_TIMESTAMP
// 合作商外网域名特殊处理
// const iscoo = location.hostname.indexOf('cooportal') > -1;
// const BASE_URL = (process.env.BASE_URL && !iscoo) ? process.env.BASE_URL : location.origin;
const BASE_URL = process.env.BASE_URL ? process.env.BASE_URL : location.origin
const apps = [
  {
    name: 'page-work', // app name registered
    entry: `${BASE_URL}/sale-work/index.html?_nocache=${timestamp}`,
    activeRule: () => {}, // 增量的url必须以 /salework/xxx 开头
    props: {},
    app: {
      routes: [],
      // 最后都整合到 regx 上
      path_hash:
        /^\/(new_home|quit-school-active|phone_call|stude_inten_new|stude_list|cr_todo_table|tmk_list|sale_retur_order|stude_manag|make-up-course-hours|my-todo-list|data_sale_perfo|order_manage|stude_resum|lz_account|lz_qa|lz_report|qy_report|lz_addConfig|tmk_query|course_receive|cr_retri_order_work|examinat_analysi|lz_customer|data_progress)(\/.*)?(\?.*)?(#.*)?$/i,
    },
    regx: /^\/salework(\/.*)?(\?.*)?(#.*)?$/i,
  },
  {
    name: 'kidsa',
    entry: `${BASE_URL}/kidsa/index.html?_nocache=${timestamp}`,
    activeRule: () => {}, // 增量的url必须以 /kidsa/xxx 开头
    props: {},
    app: {
      routes: [],
      // 最后都整合到 regx 上
      path_hash:
        /^\/(kid_cr_home|kid_cc_student_list|kid_tmk_student_list|cr_leave_list_apply|cr_leave_list_manage|children_trans_config|course_manage|course_calendar_new_small|small_class_formal|small_class|cc_small_class|small_evaluation_class|small_class_perfo|data_menus|kid_sales_data|teaching_aids_management|child_teach_data|video_square|all-todo-list)(\/.*)?(\?.*)?(#.*)?$/i,
    },
    regx: /^\/kidsa(\/.*)?(\?.*)?(#.*)?$/i,
  },
  {
    name: 'page-data', // app name registered
    entry: `${BASE_URL}/sale-data/index.html?_nocache=${timestamp}`,
    activeRule: () => {}, // 增量的url必须以 /saledata/xxx 开头
    props: {},
    app: {
      routes: [],
      // 最后都整合到 regx 上
      path_hash:
        /^\/(class_list|cr_evaluation_list|course_calendar|class_report|course_calendar_new|incentive-list|rank_list|incentive-config|new-rank-list|cours_syste|call_serv_monit_cr|tmk-handover-list|child_transfer|dataRpoint-of-money|new_recommend_chart|manage-of-kpi|quality_inspect|student_serv|recommend_chart|zm-activity|prizesSearch|cr_todo_month|perfo_manag|youke_perfo|qc_weekly|exten_exper|award_list|tmk_report_form|data_renewal|transferIntroData|cr_extend_subject_monit|youke_perfo_kpi|teacher_evaluate_cr|trainingData|stu_list_manage|salesperson-pk)(\/.*)?(\?.*)?(#.*)?$/i,
    },
    regx: /^\/saledata(\/.*)?(\?.*)?(#.*)?$/i,
  },
  {
    name: 'page-config', // app name registered
    entry: `${BASE_URL}/sale-config/index.html?_nocache=${timestamp}`,
    activeRule: () => {}, // 增量的url必须以 /saleconfig/xxx 开头
    props: {},
    app: {
      routes: [],
      path_hash:
        /^\/(kid_payment_order|renewalAudit|sales_config|tianrong_mobile_setting|sale_behavior|todo_progress|organization|commission_rule|student-assign|data_config|exon_deploy|call_script|kpi_manag|performance_complaint|resource_manage|auto_alloc|call_center_setting|retrieve_config|award-config|activity-config|cc-team-grade-config|youke_config|thematic-config|toolbox|sms_log|reset_pwd|self_msg|personal-settings|work-order-management|work_log|configureCenter|stageConfig|qrcode_manage|help_config|sms-config|stu_score|production|pro_active_tem_conf|commo_query|trans_test|call-data|skin_config|call-config|svip_operate)(\/.*)?(\?.*)?(#.*)?$/i,
    },
    regx: /^\/saleconfig(\/.*)?(\?.*)?(#.*)?$/i,
  },
  {
    name: 'page-roster', // app name registered
    entry: `${BASE_URL}/sale-roster/index.html?_nocache=${timestamp}`,
    activeRule: () => {},
    props: {},
    app: {
      routes: [],
      path_hash: /^\/rostercenter(\/.*)?(\?.*)?(#.*)?$/i,
    },
    regx: /^\/(saleroster|rostercenter)(\/.*)?(\?.*)?(#.*)?$/i,
  },
  {
    name: 'zmop-activities-admin', // app name registered
    entry: `${BASE_URL}/zmop-activities-admin/index.html?_nocache=${timestamp}`,
    activeRule: () => {}, // 增量的url必须以 /saleconfig/xxx 开头
    props: {},
    app: {
      routes: [],
      path_hash: /^\/(zmop-activities)(\/.*)?(\?.*)?(#.*)?$/i,
    },
    regx: /^\/zmop-activities(\/.*)?(\?.*)?(#.*)?$/i,
  },
  // 线索中心项目
  {
    name: 'zmsale-leads-webapp', // app name registered
    entry: `${BASE_URL}/leads/index.html?_nocache=${timestamp}`,
    activeRule: () => {}, // 增量的url必须以 /saleconfig/xxx 开头
    props: {},
    app: {
      routes: [],
      path_hash: /^\/(leads)(\/.*)?(\?.*)?(#.*)?$/i,
    },
    regx: /^\/leads(\/.*)?(\?.*)?(#.*)?$/i,
  },
]
/**
 *
 * @param {*} Vue
 * @param Object opts {
 *  router 必填
 *  store  必填
 * }
 */
const install = function (Vue, opts = {} as any) {
  if (!opts.router || !opts.store) {
    throw Error('Init page module error, router & store require!')
  }
  const { router, store } = opts
  const subApps = apps.map(({ name, entry, app, regx }) => {
    return {
      name,
      entry,
      container: '#subappcontainer',
      activeRule: () => {
        const curHash = getHash()
        const isActive = app.path_hash.test(curHash)
        // console.log('app %s is ', app.path_hash, name, isActive);
        return isActive || regx.test(curHash)
      },
      props: {
        Vue,
        router,
        store,
        utils: {},
      },
    }
  })
  // 注册微应用
  registerMicroApps(subApps)
}

export default {
  install,
  appStart: start,
}

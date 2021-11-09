import type { App } from 'vue';
import ElementPlus, {
  ElCascader,
  ElCollapse,
  ElCollapseItem,
  ElProgress,
  ElRate,
  ElSlider,
  ElSteps,
  ElStep,
  ElTag,
  ElTree,
  ElUpload,
  ElPagination,
  ElDialog,
  ElAutocomplete,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElInput,
  ElInputNumber,
  ElRadio,
  ElRadioGroup,
  ElRadioButton,
  ElCheckbox,
  ElCheckboxGroup,
  ElSwitch,
  ElSelect,
  ElOption,
  ElOptionGroup,
  ElButton,
  ElButtonGroup,
  ElTable,
  ElTableColumn,
  ElDatePicker,
  ElTimeSelect,
  ElTimePicker,
  ElPopover,
  ElTooltip,
  ElForm,
  ElFormItem,
  ElTabs,
  ElTabPane,
  ElAlert,
  ElIcon,
  ElRow,
  ElCol,
  ElColorPicker,
  ElBadge,
  ElCard,
  ElCarousel,
  ElScrollbar,
  ElCarouselItem,
  ElTransfer,
  ElDrawer,
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification
} from 'element-plus';

// const components = [
//   ElCascader,
//   ElCollapse,
//   ElCollapseItem,
//   ElProgress,
//   ElRate,
//   ElSlider,
//   ElSteps,
//   ElStep,
//   ElTag,
//   ElTree,
//   ElUpload,
//   ElPagination,
//   ElDialog,
//   ElAutocomplete,
//   ElDropdown,
//   ElDropdownMenu,
//   ElDropdownItem,
//   ElMenu,
//   ElSubmenu,
//   ElMenuItem,
//   ElMenuItemGroup,
//   ElInput,
//   ElInputNumber,
//   ElRadio,
//   ElRadioGroup,
//   ElRadioButton,
//   ElCheckbox,
//   ElCheckboxGroup,
//   ElSwitch,
//   ElSelect,
//   ElOption,
//   ElOptionGroup,
//   ElButton,
//   ElButtonGroup,
//   ElTable,
//   ElTableColumn,
//   ElDatePicker,
//   ElTimeSelect,
//   ElTimePicker,
//   ElPopover,
//   ElTooltip,
//   ElForm,
//   ElFormItem,
//   ElTabs,
//   ElTabPane,
//   ElAlert,
//   ElIcon,
//   ElRow,
//   ElCol,
//   ElColorPicker,
//   ElBadge,
//   ElCard,
//   ElCarousel,
//   ElScrollbar,
//   ElCarouselItem,
//   ElTransfer,
//   ElDrawer,
// ];

// const plugins = [
//   ElInfiniteScroll,
//   ElLoading,
//   ElMessage,
//   ElMessageBox,
//   ElNotification,
// ]
import 'element-plus/lib/theme-chalk/index.css';
function install(Vue: App<Element>) {
  // components.forEach(component => {
  //   Vue.component(component.name, component)
  // })

  // plugins.forEach(plugin => {
  //   Vue.use(plugin)
  // })
  Vue.use(ElementPlus);
  Vue.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 };
  Vue.config.globalProperties.$loading = ElLoading.service;
  Vue.config.globalProperties.$alert = ElMessageBox.alert;
  Vue.config.globalProperties.$confirm = ElMessageBox.confirm;
  Vue.config.globalProperties.$prompt = ElMessageBox.prompt;
  Vue.config.globalProperties.$notify = ElNotification;
  Vue.config.globalProperties.$message = ElMessageBox;
}

export const message = ElMessage;

export default {
  install,
  message,
}


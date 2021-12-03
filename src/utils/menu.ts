// 这段代码居然有问题
// export function flatMenus(menus: any[]): [] {
//   return menus.reduce((acc: any, menu: { subMenu: any }) => {
//     return Array.isArray(menu.subMenu) ? [...acc, ...flatMenus(menu.subMenu)] : [...acc, menu]
//   }, [])
// }
// TODO 格式化数据
export function flatMenus(menus: any[]) {
  const arr: any[] = []
  function fn(data, floor = 0) {
    data.forEach((item) => {
      item.floor = floor
      item.meta = item.meta || {
        title: item.menuName,
        icon: item.icon || 'icon-shouye',
      }
      item.children = item.subMenu || []
      // 过滤掉非 url 的部分
      if (item.path.indexOf('/') > -1) {
        arr.push(item)
      }
      if (item.subMenu && item.subMenu.length) {
        fn(item.subMenu, floor + 1)
      }
    })
  }
  fn(menus)
  return arr
}

export function formatMenu(arr: MenuItemType[]): MenuItemType[] {
  function fn(data: MenuItemType[], parent?: MenuItemType) {
    data.forEach((item: MenuItemType) => {
      item.parent = parent
      if (item.subMenu && item.subMenu.length) {
        fn(item.subMenu, item)
      }
    })
  }
  fn(arr)
  return arr
}

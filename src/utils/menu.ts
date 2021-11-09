export function flatMenus(menus: any[]): [] {
  return menus.reduce((acc: any, menu: { subMenu: any }) => {
    return Array.isArray(menu.subMenu) ? [...acc, ...flatMenus(menu.subMenu)] : [...acc, menu]
  }, [])
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

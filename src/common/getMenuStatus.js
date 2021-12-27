export default () => {
  const clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
  console.log('clientWidth:', clientWidth)
// 菜单栏状态
  let menuStatus = {
    // 是否折叠
    isCollapsed: false,
    // 菜单类型，NavMenu/Drawer
    type: 'NavMenu'
  };

  if (clientWidth <= 900) {
    menuStatus = {
      isCollapsed: false,
      type: 'Drawer'
    }
  }
  else if (clientWidth <= 1024) {
    menuStatus = {
      isCollapsed: true,
      type: 'NavMenu'
    }
  }
  return menuStatus;
}
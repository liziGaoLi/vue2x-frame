export default [
  {
    // 菜单图标名称
    icon: 's-data',
    // 菜单名称
    label: '首页',
    name: 'home',
    // 路由地址，如果只是菜单分类，则link是undefined
    link: '/home'
  },
  {
    icon: 's-data',
    label: '管理中心',
    name: 'chargeCenter',
    children: [
      {
        icon: 's-data',
        label: '机构管理',
        name: 'organizationCharge',
        link: '/chargeCenter/organizationCharge'
      },
      {
        icon: 's-data',
        label: '机构审批',
        name: 'organizationApprove',
        link: '/chargeCenter/organizationApprove'
      },
      {
        icon: 's-data',
        label: '应用管理',
        name: 'applyCharge',
        link: '/chargeCenter/applyCharge'
      },
      {
        icon: 's-data',
        label: '中心管理服务',
        name: 'centerChargeService',
        link: '/chargeCenter/centerChargeService'
      },
    ]
  },
  {
    icon: 's-data',
    label: '查询统计',
    name: 'searchStatistics',
    children: [
      {
        icon: 's-data',
        label: '使用明细查询',
        name: 'usageDetailQuery',
        link: '/searchStatistics/usageDetailQuery'
      },
      {
        icon: 's-data',
        label: '监控大屏',
        name: 'bigScreen',
        link: '/searchStatistics/bigScreen'
      }
    ]
  },
  {
    icon: 's-data',
    label: '系统管理',
    name: 'systemCharge',
    children: [
      {
        icon: 's-data',
        label: '用户管理',
        name: 'userCharge',
        link: '/systemCharge/userCharge'
      },
      {
        icon: 's-data',
        label: '角色管理',
        name: 'roleCharge',
        link: '/systemCharge/roleCharge'
      },
      {
        icon: 's-data',
        label: '菜单管理',
        name: 'menuCharge',
        link: '/systemCharge/menuCharge'
      },
      {
        icon: 's-data',
        label: '协议管理',
        name: 'agreementCharge',
        link: '/systemCharge/agreementCharge'
      },
      {
        icon: 's-data',
        label: '字典管理',
        name: 'dicCharge',
        link: '/systemCharge/dicCharge'
      },
      {
        icon: 's-data',
        label: '日志管理',
        name: 'recordCharge',
        children: [
          {
            icon: 's-data',
            label: '操作日志',
            name: 'operateRecord',
            link: '/systemCharge/recordCharge/operateRecord'
          },
          {
            icon: 's-data',
            label: '登录日志',
            name: 'loginRecord',
            link: '/systemCharge/operateRecord/loginRecord'
          },
        ]
      },
    ]
  },
  {
    icon: 's-data',
    label: '系统工具',
    name: 'systemTools',
    children: [
      {
        icon: 's-data',
        label: '代码生成',
        name: 'codeGenerate',
        link: '/systemTools/codeGenerate'
      }
    ]
  },
  {
    icon: 's-data',
    label: '开发者中心',
    name: 'developerCenter',
    children: [
      {
        icon: 's-data',
        label: '秘钥生成',
        name: 'keyGenetate',
        link: '/developerCenter/keyGenetate'
      }
    ]
  }
];
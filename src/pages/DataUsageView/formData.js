export default {
  formStructure: {
    // 机构信息
    orgStructure: [
      {
        type: 'input',
        label: '机构名称',
        id: 'orgName',
        value: '华信永道',
        rule: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '机构类型',
        id: 'orgType',
        option: 'orgType',
        rule: []
      },
      {
        type: 'input',
        label: '机构简称',
        id: 'orgShortName',
        rule: []
      },
      {
        type: 'input',
        label: '统一社会信用代码',
        id: 'certNumber',
        rule: []
      },
      {
        type: 'input',
        label: '机构地址',
        id: 'orgAddress',
        rule: []
      },
      {
        type: 'select',
        label: '服务运行状态',
        id: 'runStatus',
        option: 'runStatus',
        rule: []
      },
      {
        type: 'upload',
        label: '营业执照',
        id: 'license',
        items: [
          {
            label: '查看图片',
            id: 'license1',
            // 图片适应容器形式, 默认fill
            // fill / contain / cover / none / scale-down
            fit: '',
            // 图片容器宽高，默认均为100
            width: '60',
            height: '60'
          },
          {
            label: '查看图片',
            id: 'license2',
            // 图片适应容器形式, 默认fill
            // fill / contain / cover / none / scale-down
            fit: '',
            // 图片容器宽高，默认均为100
            width: '60',
            height: '60'
          }
        ]
      },

    ],
    // 经办人信息
    handlerInfo: [
      {
        type: 'input',
        label: '经办人姓名',
        id: 'handlerName',
        rule: []
      },
      {
        type: 'input',
        label: '经办人身份证号',
        id: 'handlerIdCard',
        rule: []
      },
      {
        type: 'input',
        label: '经办人电话',
        id: 'handlerTel',
        rule: []
      },
      {
        type: 'upload',
        label: '营业执照',
        id: 'idCard',
        items: [
          {
            label: '查看图片',
            id: 'idCard1',
            // 图片适应容器形式, 默认fill
            // fill / contain / cover / none / scale-down
            fit: '',
            // 图片容器宽高，默认均为100
            width: '60',
            height: '60'
          },
          {
            label: '查看图片',
            id: 'idCard2',
            // 图片适应容器形式, 默认fill
            // fill / contain / cover / none / scale-down
            fit: '',
            // 图片容器宽高，默认均为100
            width: '60',
            height: '60'
          }
        ]
      },
    ]
  }
}
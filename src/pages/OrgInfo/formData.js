export default {
  orgStructure: [
    {
      type: 'select',
      label: '所属城市',
      id: 'cityCode',
      option: 'cityCode',
      rule: [
        { required: true, message: '请输入活动名称', trigger: 'blur' }
      ]
    },
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
      rule: [
        { required: true, message: '请输入活动名称', trigger: 'blur' }
      ]
    },
    {
      type: 'input',
      label: '机构简称',
      id: 'orgShortName',
      rule: [
        { required: true, message: '请输入活动名称', trigger: 'blur' }
      ]
    },
    {
      type: 'input',
      label: '统一社会信用代码',
      id: 'certNumber',
      rule: [
        { required: true, message: '请输入活动名称', trigger: 'blur' }
      ]
    },
    {
      type: 'input',
      label: '机构地址',
      id: 'orgAddress',
      rule: [
        { required: true, message: '请输入活动名称', trigger: 'blur' }
      ]
    }
  ],
  handlerInfo: [
    {
      type: 'input',
      label: '联系人姓名',
      id: 'orgContactName',
      rule: [
        { required: true, message: '请输入活动名称', trigger: 'blur' }
      ]
    },
    {
      type: 'input',
      label: '联系人身份证号',
      id: 'orgContactCardNo',
      rule: [
        { required: true, message: '请输入活动名称', trigger: 'blur' }
      ]
    },
    {
      type: 'input',
      label: '联系人电话',
      id: 'orgContactTel',
      rule: [
        { required: true, message: '请输入活动名称', trigger: 'blur' }
      ]
    },
    null,
    {
      type: 'upload',
      label: '身份证正面',
      id: 'idCard1',
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
        }
      ]
    },
    {
      type: 'upload',
      label: '身份证反面',
      id: 'idCard2',
      items: [
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
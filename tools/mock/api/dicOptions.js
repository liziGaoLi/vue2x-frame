module.exports = async (ctx, util) => {
  let { dictType } = ctx.query;
  let rows;
  switch (dictType) {
    case 'sys_bdsp_certtype':
      rows = [
        { dictLabel: '身份证', dictValue: '01' },
        { dictLabel: '军官证', dictValue: '02' },
      ];
      break;
    case 'sys_bdsp_authstatus':
      rows = [
        { dictLabel: '授权状态1', dictValue: '00' },
        { dictLabel: '授权状态2', dictValue: '01' },
      ];
      break;
    case 'sys_bdsp_authtype':
      rows = [
        { dictLabel: '同步授权', dictValue: '1' },
        { dictLabel: '预授权', dictValue: '2' },
      ];
      break;
    case 'sys_bdsp_auth_uses':
      rows = [
        { dictLabel: '用途1', dictValue: '1' },
        { dictLabel: '用途2', dictValue: '2' },
      ];
      break;
    case 'sys_bdsp_verity_type':
      rows = [
        { dictLabel: '核身类型1', dictValue: '1' },
        { dictLabel: '核身类型2', dictValue: '2' },
      ];
      break;
    case 'sys_org_type':
      rows = [
        { dictLabel: '公积金中心', dictValue: '01' },
        { dictLabel: '银行', dictValue: '02' },
      ];
      break;
    case 'sys_org_status':
      rows = [
        { dictLabel: '运行中', dictValue: '1' },
        { dictLabel: '已停用', dictValue: '2' },
      ];
      break;
    case 'mc_contract_status':
      rows = [
        { dictLabel: '已生效', dictValue: '00' },
        { dictLabel: '未生效', dictValue: '01' },
      ];
      break;
    case 'sys_org_approvalstatus':
      rows = [
        { dictLabel: '待审批', dictValue: '0' },
        { dictLabel: '审批未通过', dictValue: '1' },
        { dictLabel: '审批通过', dictValue: '2' },
      ];
      break;
    case 'sys_org_citycode':
      rows = [{ dictLabel: '广东省深圳市', dictValue: '440300' }];
      break;
    case 'dc_app_status':
      rows = [
        { dictLabel: '禁用中', dictValue: '0' },
        { dictLabel: '启用中', dictValue: '1' },
      ];
      break;
    default:
      rows = [];
  }
  ctx.body = util.succ({ rows });
}
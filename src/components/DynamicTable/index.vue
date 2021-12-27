<script type="text/jsx">
  export default {
    name: "DynamicTable",
    props: ['data', 'column', 'rowKey', 'dicOptions', 'pageSize', 'currentPage', 'total'],
    methods: {
      // 分页器-每页数据条数改变
      handleSizeChange(pageSize) {
        this.$emit('query', {currentPage: this.currentPage, pageSize: pageSize});
      },
      // 分页器-当前页码改变
      handleCurrentPageChange(currentPage) {
        this.$emit('query', {currentPage: currentPage, pageSize: this.pageSize});
      }
    },
    render() {
      return (
        <div class="DynamicTable">
          <el-table
            data={this.data}
            row-key={row => row[this.rowKey]}
          >
            {
              this.column.map(item => {
                const scopedSlots = {
                  default: ({row}) => {
                    // 汉化字典数据
                    if (item.options && row[item.id] && this.dicOptions ) {
                      let keys = row[item.id].split(',');
                      const values = keys.map(key => {
                        const targetOption = (this.dicOptions[item.options] || []).find(option => option.dictValue === key);
                        return targetOption ? targetOption.dictLabel : '';
                      });
                      return <span>{values.join(',')}</span>
                    }
                    return <span>{row[item.id]}</span>
                  }
                }
                return (
                  <el-table-column
                    prop={item.id}
                    label={item.label}
                    scopedSlots={scopedSlots}
                  >
                  </el-table-column>
                )
              })
            }
          </el-table>

          <div class="pagination">
            <el-pagination
              layout="prev, pager, next, sizes, jumper"
              currentPage={this.currentPage}
              pageSize={this.pageSize}
              total={this.total}
              page-sizes={[5, 10, 15, 20]}
              onSize-change={this.handleSizeChange}
              onCurrent-change={this.handleCurrentPageChange}
            />
          </div>
        </div>
      )
    }
  }
</script>

<style lang="scss">
.DynamicTable {

  thead {

    th {
      background: #f8f8f8!important;
    }

    .cell {
      color: #333;
    }
  }
}
</style>
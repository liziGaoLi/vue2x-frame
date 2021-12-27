<script type="text/jsx">

  export default {
    name: "DynamicForm",
    props: ['values', 'cols', 'structure', 'readonly', 'options'],
    computed: {
      span() {
        return Math.floor(24/this.cols);
      }
    },
    created() {
    },
    methods: {
      changeFormValue(id, value) {
        this.$emit('change', {[id]: value});
      },
      /**
       * 根据配置数据生成对应的表单项
       * @param {Object} formItem 表单项数据
       */
      createFormItem(formItem) {
        const { type } = formItem;
        const isReadOnly = formItem.readonly || this.readonly;
        switch (type) {
          case 'input': {
            return (
              <el-input
                value={this.values[formItem.id]}
                disabled={isReadOnly}
                onInput={(value) => this.changeFormValue(formItem.id, value)}
                size="small"
                placeholder={formItem.placeholder || '请输入'}
                class={isReadOnly ? 'read-only' : ''}
              />
            )
          }
          case 'select': {
            return (
              <el-select
                value={this.values[formItem.id]}
                placeholder={formItem.placeholder || '请选择'}
                disabled={isReadOnly}
                size="small"
                class={isReadOnly ? 'read-only' : ''}
                onChange={(value) => this.changeFormValue(formItem.id, value)}
              >
                {
                  (this.options[formItem.option] || []).map(option => {
                    return <el-option label={option.dictLabel} value={option.dictValue} key={option.dictValue} />
                  })
                }
              </el-select>
            )
          }
          case 'upload': {
            let items = formItem.items;
            if (!Array.isArray(formItem.items)) items = [ formItem.items ];
            // 如果是只读表单元素，使用图片组件
            if (isReadOnly) {
              return items.map(item => {
                return (
                  <div
                    class="img-item"
                    style={{width: `${item.width || 100}px`}}
                  >
                    <el-image
                      src={this.values[item.id]}
                      preview-src-list={[this.values[item.id]]}
                      ref={item.id}
                      fit={item.fit || 'fill'}
                      style={{width: `${item.width || 100}px`, height: `${item.height || 100}px`}}
                    >
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <span
                      class="img-btn"
                      onClick={() => this.$refs[item.id].clickHandler()}
                    >{item.label || '查看'}</span>
                  </div>
                )
              })
            }
            // 如果非只读，使用上传图片组件
            return items.map(item => {
              return (
                <div
                  class="img-item"
                  style={{width: `${item.width || 100}px`}}
                >
                  <el-upload
                    action="upload"
                    multiple={false}
                    name="filename"
                    data={{key: '9999'}}
                    show-file-list={false}
                    auto-upload={true}
                    limit={1}
                    on-success={(res) => this.changeFormValue(item.id, res)}
                    ref={item.id}
                  >
                    <div
                      slot="trigger"
                      class="upload-btn"
                      style={{width: `${item.width || 100}px`, height: `${item.height || 100}px`}}
                    >
                      {
                        this.values[item.id] && <img  src={this.values[item.id]}/>
                      }
                      {
                        !this.values[item.id] && <i class="el-icon-plus"></i>
                      }
                    </div>
                  </el-upload>
                  <span
                    class="img-btn"
                    onClick={() => this.$refs[item.id].$refs['upload-inner'].handleClick()}
                  >
                    上传文件
                  </span>
                </div>
              )
            })
          }
        }

      },
      renderForm() {
        return this.structure.map((item, index) => {
          if (!item) {
            return (
              <el-col span={this.span} key={index} class="space-col"></el-col>
            );
          }
          const formItem = this.createFormItem(item);

          return (
            <el-col span={this.span} key={item.id}>
              <el-form-item
                label={`${item.label}:`}
                prop={item.id}
                rules={item.rule}
              >
                {formItem}
              </el-form-item>
            </el-col>
          )
        })
      }
    },
    render() {
      return (
        <div class="DynamicForm">
          <el-form
            {
              ...{
                "props": {
                  "model": this.values,
                  "label-width": "160px"
                }
              }
            }
          >
            <el-row gutter={6}>
              {this.renderForm()}
            </el-row>
          </el-form>
        </div>
      )
    }
  }
</script>
<style lang="scss">
@import "index.scss";
</style>
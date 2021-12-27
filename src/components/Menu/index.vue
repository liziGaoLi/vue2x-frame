<script type="text/jsx">
  import {
    CHANGE_CURRENT_TAB_ID,
    ADD_TAB
  } from "../../store/mutations/types";
  import {mapState} from 'vuex';

  export default {
    name: "Menu",
    props: [],
    computed: {
      ...mapState(['menuData', 'tabs', 'currentTabId', 'menuStatus']),
      currentMenuIndex() {
        return this.tabs.find(tab => tab.id === this.currentTabId).name;
      },
      isCollapsed() {
        const {type, isCollapsed} = this.$store.state.menuStatus;
        return type !== 'Drawer' ? isCollapsed : false;
      }
    },
    methods: {
      // 生成主菜单dom结构
      createMainMenu(menu) {
        if (menu.link && (!menu.children || menu.children.length === 0)) {
          return <el-menu-item index={menu.name} route={{path: menu.link}}>
            <i class={`el-icon-${menu.icon}`}></i>
            <span slot="title">{menu.label}</span>
          </el-menu-item>
        }
        let subMenu = (menu.children || []).map(subMenu => {
          return this.createMainMenu(subMenu);
        });
        return (
          <el-submenu
            index={menu.name}
          >
            <template slot="title">
              <i class={`el-icon-${menu.icon}`}></i>
              <span slot="title">{menu.label}</span>
            </template>
            { subMenu }
          </el-submenu>
        )
      },
      // 切换菜单
      toggleMenu: function (index) {
        const isExist = this.tabs.find(tab => tab.name === index);
        if (!isExist) {
          const menu = this.getMenuItem(index, this.menuData);
          // 添加页签
          const id = menu.name === 'home' ? 'home' : `${Date.now()}`;
          this.$store.commit(ADD_TAB, {
            id,
            multiply: false,
            ...menu
          });
          this.$store.commit(CHANGE_CURRENT_TAB_ID, id);
        }
        else {
          // 切换页签
          this.$store.commit(CHANGE_CURRENT_TAB_ID, isExist.id);
        }
      },
      /**
       * 根据name查找被激活的菜单项数据
       * @param {String} index 被点击菜单的菜单项name属性
       * @param {Array} menus 主菜单数据
       */
      getMenuItem: function (index, menus) {
        for (let menu of menus) {
          if (menu.name === index) return menu;
          if (menu.children) {
            const targetMenu = this.getMenuItem(index, menu.children);
            if (targetMenu) return targetMenu;
          }
        }
      }
    },
    render() {

      return (
        <div class="Menu">
          <el-menu
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#1890ff"
            unique-opened={true}
            default-active={this.currentMenuIndex}
            router={true}
            collapse={this.isCollapsed}
            onSelect={this.toggleMenu}
          >
            <el-menu-item
              index="logo"
              class="logo-container"
              disabled={true}
            >
              <img src={require('../../images/logo.png')} alt="" />
              <span slot="title">区块链数据共享平台</span>
            </el-menu-item>
            {
              (this.menuData || []).map(menu => {
                return this.createMainMenu(menu);
              })
            }
          </el-menu>
        </div>
      );
    }
  }
</script>

<style lang="scss">
@import "./index.scss";
</style>
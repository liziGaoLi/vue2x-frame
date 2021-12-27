import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Container,
  Aside,
  Header,
  Main,
  Button,
  Menu,
  Submenu,
  MenuItem,
  Scrollbar,
  Breadcrumb,
  Tabs,
  TabPane,
  Popconfirm,
  Popover,
  Drawer,
  Row,
  Col,
  Input,
  Select,
  Option,
  DatePicker,
  Pagination,
  Form,
  FormItem,
  Image,
  Icon,
  Upload,
  Table,
  TableColumn,
  Timeline,
  TimelineItem,
  Switch,
  Loading,
  MessageBox,
  Message
} from 'element-ui';

Vue.use(Button);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Scrollbar);
Vue.use(Breadcrumb);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Popconfirm);
Vue.use(Popover);
Vue.use(Drawer);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Image);
Vue.use(Icon);
Vue.use(Upload);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Switch);
Vue.use(Loading);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message
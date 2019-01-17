/**
|--------------------------------------------------
| 通用布局
|--------------------------------------------------
*/
import { Layout, Menu, Icon } from 'antd';
import { Component } from 'react';
import Link from 'umi/link';
import {Provider} from 'react-redux';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import store from '../redux/store';
import logo from '../assets/logo.svg';
import BlankLayout from './blankLayout'
import styles from './index.less';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
class BasicLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    let layout=null

    if (this.props.location.pathname === '/login') {
      layout = <BlankLayout>{this.props.children}</BlankLayout>
    }else{
      layout=<Layout>
      <Sider
        collapsible
        trigger={null}
        collapsed={this.state.collapsed}
        className={styles.sider}
        width={240}
      >
        <div className={styles.logo} key="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </Link>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="user">
            <Link to="/user">
              <Icon type="user" />
              <span>首页</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className={styles.trigger}
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
        </Header>
        <Content style={{ margin: '20px 20px 0', height: '100%', overflow: 'hidden' }}>
          {/*此处可加面包屑*/}
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          AHUIFE ©2019 大数据平台模板
        </Footer>
      </Layout>
    </Layout>
    }
    return (
      <LocaleProvider locale={zhCN}>
        <Provider store={store}>
            {layout}
        </Provider>
      </LocaleProvider>
    )
  }
}

export default BasicLayout;
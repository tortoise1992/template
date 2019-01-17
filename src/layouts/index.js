import styles from './index.less';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Component } from 'react';
import Link from 'umi/link';
import logo from '../assets/logo.svg';
const {Header, Content, Footer, Sider} = Layout;
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

render(){
return (
    <Layout>
        <Sider
          collapsible
          trigger={null}
          collapsed={this.state.collapsed}
          className={styles.sider}
        >
        <div className={styles.logo} key="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
          <h1>Ant Design Pro</h1>
        </Link>
       </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="users">
            <Link to="/users">
              <Icon type="user" />
              <span>Users</span>
              </Link>
            </Menu.Item>

            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
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
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
              {/*此处可加面包屑*/}
              { this.props.children }
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
  );
}
}

export default BasicLayout;
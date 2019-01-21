import React, { Component,Fragment } from 'react'
import styles from './index.less';
import logo from '../assets/logo.svg';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';
const { Sider } = Layout;
export default class SiderLayout extends Component {
  state={
    menus:[],
    menuKey:[],
    openKey:[]
  }
  componentDidMount() {  
    // 初次加载的时候默认进第一个有页面的路由，同时设置菜单默认选中
    if(localStorage.getItem('userInfo') && localStorage.getItem('keepMenu')){
      let userInfo=JSON.parse(localStorage.getItem('userInfo')) 
      let keepMenu=JSON.parse(localStorage.getItem('keepMenu'))           
      this.setState({
        menus:userInfo.menus,
        menuKey:keepMenu.menuKey,
        openKey:keepMenu.openKey
      })
    }
  }
  handleMenuSelect=(values)=>{
    // 更新当前选中
    this.setState({
      menuKey:values.selectedKeys
    })
  }
  handleSubMenu=(values)=>{   
    // 更新当前展开 
    this.setState({
      openKey:values
    })
  }
  renderMenus = data => data.map((item) => {
    if (item.subMenus && item.subMenus.length>0) {
      return (
        <Menu.SubMenu title={
        <span><Icon type={item.iconUrl}/><span>{item.name}</span></span>
        } key={item.id}>
          {this.renderMenus(item.subMenus)}
        </Menu.SubMenu>
      );
    }else{
      return <Menu.Item key={item.id}>
                <Link to={item.url}>
                  <span>{item.name}</span>
                </Link>
              </Menu.Item>;
    }
    
  })
  render() {
    const {menus}=this.state
    return (
      <Fragment>
        <Sider
        collapsible
        trigger={null}
        collapsed={this.props.collapsed}
        className={styles.sider}
        width={240}
      >
        <div className={styles.logo} key="logo">
          {/* <Link to="/"> */}
            <img src={logo} alt="logo" />
            <h1>大数据平台 2.0</h1>
          {/* </Link> */}
        </div>
        <Menu inlineCollapsed={this.props.collapsed} onOpenChange={this.handleSubMenu} openKeys={this.state.openKey} onSelect={this.handleMenuSelect} theme="dark" selectedKeys={this.state.menuKey} mode="inline">
          {this.renderMenus(menus)}
        </Menu>
      </Sider>
      </Fragment>
    )
  }
}

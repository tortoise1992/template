import React, { Component,Fragment } from 'react'
import {Layout,Icon,Menu, Dropdown} from 'antd'
import styles from './index.less';
import router from 'umi/router';
const { Header} = Layout;
export default class HeaderLayout extends Component {
  state={
    username:''
  }
  componentDidMount() {
    if(localStorage.getItem('userInfo')){
      let userInfo=JSON.parse(localStorage.getItem('userInfo'))
      this.setState({
        username:userInfo.username
      })
    }
    
  }
  handleLogout=()=>{
    localStorage.clear()
    router.replace('/login')
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <span><Icon type="setting" style={{marginRight:10}} />设置中心</span>
        </Menu.Item>
        <Menu.Item>
          <span><Icon type="lock" style={{marginRight:10}} />修改密码</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <span onClick={this.handleLogout}><Icon type="poweroff" style={{marginRight:10}} />退出登录</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <Fragment>
        <Header style={{ background: '#fff', padding: 0 }}>
          {/* <Icon
            className={styles.trigger}
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.props.toggle}
          /> */}
          <Dropdown overlay={menu} placement="bottomRight">
            <span style={{display:'block',height:64,lineHeight:'64px',float:'right',marginRight:24,cursor:'pointer'}}><Icon type="user" style={{marginRight:5}} />{this.state.username}</span>
          </Dropdown>
          
        </Header>
      </Fragment>
    )
  }
}

/**
|--------------------------------------------------
| 通用布局
|--------------------------------------------------
*/
import { Layout, Menu } from 'antd';
import { Component } from 'react';
import {Provider} from 'react-redux';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import store from '../redux/store';
import BlankLayout from './blankLayout'
import HeaderLayout from './header'
import SiderLayout from './sider'
import FooterLayout from './footer'
const { Content} = Layout;
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
      <SiderLayout collapsed={this.state.collapsed}></SiderLayout>
      <Layout>        
        <HeaderLayout collapsed={this.state.collapsed} toggle={this.toggle}></HeaderLayout>
        <Content style={{ margin: '20px 20px 0', height: '100%', overflow: 'hidden' }}>
          {/*此处可加面包屑*/}
            <TransitionGroup>
              <CSSTransition key={this.props.location.pathname} classNames="fade" timeout={300}>
                {this.props.children}
              </CSSTransition>
            </TransitionGroup>          
        </Content>
        <FooterLayout></FooterLayout>
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

export default withRouter(BasicLayout);
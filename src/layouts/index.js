import React, { Component,Fragment } from 'react'
import SideMenu from '../components/Menu'
import './index.less'
export default class BasicLayout extends Component {
  render() {
    return (
      <Fragment>
        <div className='header'>

        </div>
        <div className='content-wrapper'>
          <div className='sideNav'>
            {/* 左侧菜单 */}
            <SideMenu>

            </SideMenu>
          </div>
            {/* 右侧内容区域 */}
          <div className='content'>
            <div className='container'>
              我是内容区域
            </div>
            
          </div>
        </div>        
      </Fragment>
    )
  }
}


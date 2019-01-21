import React, { Component ,Fragment} from 'react'
import {Layout} from 'antd'
const { Footer} = Layout;
export default class FooterLayout extends Component {
  render() {
    return (
      <Fragment>
        <Footer style={{ textAlign: 'center' }}>
          AHUIFE ©2019 大数据平台模板
        </Footer>
      </Fragment>
    )
  }
}

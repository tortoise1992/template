/**
|--------------------------------------------------
| 这是一个空白的layout，适用于登录页面的布局
|--------------------------------------------------
*/
import React, { Component,Fragment } from 'react'
export default class BlankLayout extends Component {
  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    )
  }
}

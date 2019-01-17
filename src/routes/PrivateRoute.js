import React, { Component } from 'react'

export default class PrivateRoute extends Component {
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <div>我要是出现了，你就通过了私有路由的权限验证</div>
                {this.props.children}
            </div>
        )
    }
}

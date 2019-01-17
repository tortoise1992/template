import React, { Component } from 'react'
import Redirect from 'umi/redirect';
export default class PrivateRoute extends Component {    
    render() {
        // 判断是否登录
        let loginStatus=localStorage.getItem('loginStatus')
        if(loginStatus){
            return (
                <div>
                    <div>我要是出现了，你就通过了私有路由的权限验证</div>
                    {this.props.children}
                </div>
            )
        }else{
            return <Redirect to="/login" />
        }
        
    }
}

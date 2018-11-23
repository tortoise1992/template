import React from 'react';
import { withRouter} from "react-router-dom";
import { Menu } from 'antd';
import './leftcomponent.css'
import nav from './nav';
// import { getLocal } from '../../../utils';

const SubMenu = Menu.SubMenu;

class LeftComponent extends React.Component{
	
    state = {
        current:'',
        openKeys:[],
        menus:[]
    }
    
    componentWillMount(){
        // let userInfo = JSON.parse(getLocal('userInfo'));
        // let menus = userInfo?userInfo.menus:[];
        let current = this.props.location.pathname;
        let openKeys = [];
        nav.forEach(item=>{
            if(item.subMenus){
                item.subMenus.forEach(ele=>{
                    if(ele.url === current){
                        openKeys = [item.name];
                    }
                })
            }
        })
        let resMenu = nav;//nav
        // menus.forEach(element => {
        //     if(nav.some(a=>a.name===element.name)){
        //         let item;
        //         const navItem = nav.filter(b=>b.name===element.name)[0] || {};
        //         if(element.subMenus && navItem.subMenus && element.subMenus.length>0){
        //             item = Object.assign({},element,{icon:navItem.icon});
        //             navItem.subMenus.forEach((n)=>{
        //                 item.subMenus.forEach(c=>{
        //                     if(c.name===n.name){
        //                         c = Object.assign({},c,n);
        //                     }
        //                 })
        //             })
        //         }  else {
        //             item = Object.assign({},element,navItem);
        //         }
        //         resMenu.push(item);
        //     }
        // });
        this.setState({
            current,
            openKeys,
            menus:resMenu
        })
        
    }
    
    selectClick = ({ key })=> {
        this.setState({
            current: key
        });
        this.props.history.push(key);
    }
    
    onOpenChange = (openKeys)=> {
        this.setState({
            openKeys
        })
    }
    
    render () {
        return (
            <div className='leftcomponent'>
                <div className="scrollconstainer">
                    <Menu
                        onClick={this.selectClick}
                        onOpenChange={this.onOpenChange}
                        selectedKeys={this.state.current ? [this.state.current] : null}
                        openKeys={this.state.openKeys}
                        mode="inline"
                        theme="dark">
                        {this.state.menus.map(item=>{
                            if(item.subMenus && item.subMenus.length>0){
                                return (
                                <SubMenu key={item.name} title={<span>{item.icon}<span>{item.name}</span></span>}>
                                    {item.subMenus.map(child=>(<Menu.Item key={child.url}>
                                            {child.name}
                                        </Menu.Item>))}
                                </SubMenu>)
                            } else {
                                return (<Menu.Item key={item.url}>
                                    <span>{item.icon}</span>{item.name}
                                </Menu.Item>)
                            }
                        })}
                    </Menu>
                </div>
            </div>
        )
    }
}

export default withRouter(LeftComponent)
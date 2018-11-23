/**
 * Created by hutao on 2018/8/31.
 * 权限配置
 */
import React, { Component } from 'react';
import { Card, Checkbox, Button, message } from 'antd';
import './style.less'

const CheckboxGroup = Checkbox.Group;

//权限配置子菜单样式
const subMenuStyle = {
    borderTop:'1px solid #ccc',
    borderBottom:'1px solid #ccc',
    overflow:'auto',
    lineHeight:'52px',
    paddingLeft:'46px',
    marginBottom: '20px'
}

class MenuLists extends Component {
    state = {
        menuLists:[],//菜单列表
        roleMenuData:[]
    }
    componentWillMount() {
        //获取菜单列表,根绝请求数据设置菜单列表
        const res = {
            "success": true,
            "msg": "成功",
            "obj": [
                {
                    "id": 150,
                    "parentId": -1,
                    "name": "综合画像",
                    "url": "",
                    "iconUrl": "n_ico2.png",
                    "iconSelectedUrl": "n_ico2.png",
                    "seq": 11,
                    "tags": [],
                    "subMenus": [
                        {
                            "id": 151,
                            "parentId": 150,
                            "name": "群体画像",
                            "url": "/mainframe/GroupPortrait",
                            "iconUrl": "",
                            "iconSelectedUrl": "",
                            "seq": 12,
                            "tags": [],
                            "subMenus": []
                        },
                        {
                            "id": 152,
                            "parentId": 150,
                            "name": "个人画像",
                            "url": "/mainframe/personalportrait",
                            "iconUrl": "",
                            "iconSelectedUrl": "",
                            "seq": 13,
                            "tags": [],
                            "subMenus": []
                        }
                    ]
                },
                {
                    "id": 2,
                    "parentId": -1,
                    "name": "轨迹分析",
                    "url": "",
                    "iconUrl": "n_ico3.png",
                    "iconSelectedUrl": "n_ico3.png",
                    "seq": 14,
                    "tags": [],
                    "subMenus": [
                        {
                            "id": 4,
                            "parentId": 2,
                            "name": "个人轨迹",
                            "url": "/mainframe/personalpath",
                            "iconUrl": "",
                            "iconSelectedUrl": "",
                            "seq": 58,
                            "tags": [],
                            "subMenus": []
                        },
                        {
                            "id": 153,
                            "parentId": 2,
                            "name": "群体轨迹",
                            "url": "/mainframe/grouppath",
                            "iconUrl": "",
                            "iconSelectedUrl": "",
                            "seq": 59,
                            "tags": [],
                            "subMenus": []
                        }
                    ]
                },
                {
                    "id": 178,
                    "parentId": -1,
                    "name": "综合预警",
                    "url": "/mainframe/comprehensivewarning",
                    "iconUrl": "",
                    "iconSelectedUrl": "",
                    "seq": 256,
                    "tags": [],
                    "subMenus": []
                },
                {
                    "id": 179,
                    "parentId": -1,
                    "name": "系统设置",
                    "url": "/mainframe/systemsetup",
                    "iconUrl": "",
                    "iconSelectedUrl": "",
                    "seq": 257,
                    "tags": [],
                    "subMenus": [
                        {
                            "id": 180,
                            "parentId": 179,
                            "name": "预警设置",
                            "url": "/mainframe/systemsetup/earlywarningsetting",
                            "iconUrl": "",
                            "iconSelectedUrl": "",
                            "seq": 387,
                            "tags": [],
                            "subMenus": []
                        },
                        {
                            "id": 181,
                            "parentId": 179,
                            "name": "行为轨迹设置",
                            "url": "/mainframe/systemsetup/behaviortrajectory",
                            "iconUrl": "",
                            "iconSelectedUrl": "",
                            "seq": 388,
                            "tags": [],
                            "subMenus": []
                        }
                    ]
                },
                {
                    "id": 10,
                    "parentId": -1,
                    "name": "权限管理",
                    "url": "",
                    "iconUrl": "xitongguanli.png",
                    "iconSelectedUrl": "xitongguanli2.png",
                    "seq": 259,
                    "tags": [],
                    "subMenus": [
                        {
                            "id": 25,
                            "parentId": 10,
                            "name": "账户管理",
                            "url": "/mainframe/accessmanage/account",
                            "iconUrl": "",
                            "iconSelectedUrl": "",
                            "seq": 264,
                            "tags": [],
                            "subMenus": []
                        },
                        {
                            "id": 24,
                            "parentId": 10,
                            "name": "菜单管理",
                            "url": "/mainframe/accessmanage/menu",
                            "iconUrl": "",
                            "iconSelectedUrl": "",
                            "seq": 265,
                            "tags": [],
                            "subMenus": []
                        },
                        {
                            "id": 26,
                            "parentId": 10,
                            "name": "权限配置",
                            "url": "/mainframe/accessmanage/authority",
                            "iconUrl": "",
                            "iconSelectedUrl": "",
                            "seq": 266,
                            "tags": [],
                            "subMenus": []
                        }
                    ]
                }
            ],
            "errorCode": null
        }
        
        if(res.success){
            this.setState({
                menuLists: res.obj || []
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        //当选中角色改变时重新获取权限配置
        if(nextProps.activeRole.id !== this.props.activeRole.id ){
            this.getRoleMenuLists({roleId:nextProps.activeRole.id,sourceCode:'pc'})
        }
    }
    //获取角色菜单权限列表
    getRoleMenuLists = (data)=> {
        //获取当前角色的权限列表
        const res = {
            "success": true,
            "msg": "成功",
            "obj": {
                "roleId": 1,
                "menu": [
                    150,
                    151,
                    152,
                    2,
                    4,
                    153
                ]
            },
            "errorCode": null
        }
		if(res.success){
            this.setState({roleMenuData:res.obj.menu || []})
        }
    }
    //修改菜单权限
    changeCheckMenu = (checkedValue) => {
        let newValue = Object.assign([],checkedValue);//变化后
        let oldValue = Object.assign([],this.state.roleMenuData);//变化前
        let isAdd = newValue.length>oldValue.length;//是否增加
        let changeValue;//选中取消改变的值
        if(isAdd){
            changeValue = newValue[newValue.length-1];
        } else {
            oldValue.forEach((item,i)=>{
                if(!changeValue && item!==newValue[i]){
                    changeValue = item;
                }
            })
        }

        //是否是父节点
        const isParent = this.state.menuLists.filter(item => changeValue === item.id)[0];

        let menuLists = this.state.menuLists;
        for(let i = 0;i<menuLists.length;i++) {
            if(isParent && menuLists[i].id===changeValue){ //父节点
                if(isAdd){ //选中父节点
                    for(let j=0;j<menuLists[i].subMenus.length;j++){
                        newValue.push(menuLists[i].subMenus[j].id);
                    }
                } else {
                    //取消父节点
                    for(let j=0;j<menuLists[i].subMenus.length;j++){
                        newValue = newValue.filter(id=>id!==menuLists[i].subMenus[j].id);
                    }
                }
            } else if(menuLists[i].subMenus.length>0){ //子节点
                if(isAdd) {//选中子节点
                    for(let j=0;j<menuLists[i].subMenus.length;j++){
                        if(menuLists[i].subMenus[j].id===changeValue && !newValue.some(item=>item===menuLists[i].id)){
                            newValue.push(menuLists[i].id)
                        }
                    }
                } else {//取消子节点
                    for(let j=0;j<menuLists[i].subMenus.length;j++){
                        if(menuLists[i].subMenus[j].id===changeValue){
                            let arr = menuLists[i].subMenus.map(item=>item.id);
                            let hasOther = false;
                            for(let m=0;m<arr.length;m++) {
                                if(newValue.some(n=>n===arr[m])){
                                    hasOther = true;
                                }
                            }
                            if(!hasOther){
                                newValue = newValue.filter(id=>id!==menuLists[i].id);
                            }
                        }
                    }
                }
            }
        }
        this.setState({roleMenuData:newValue})
    }
    //保存修改后的菜单权限
    saveAction = () => {
        // 进行保存操作，获取对应数据，发送请求，根据请求返回就行相应提示
        // let data = {
        //     roleId: this.props.activeRole.id,
        //     menuIds: this.state.roleMenuData.join(',')
        // }
        const res = {success:true};
        if(res.success) {
            message.success('权限配置成功！');
        } else {
            message.error(res.obj);
        }
        
    }
	render () {
        // console.log(this.state.menuLists)
		return (
			<Card
                title={<span style={{color:'#1890FF'}}>{this.props.activeRole.roleName}角色权限配置</span>}
            >
                <div>
                    <CheckboxGroup 
                        value={this.state.roleMenuData}
                        onChange={this.changeCheckMenu}
                    >
                        {
                            this.state.menuLists.map(item=>(
                                <div key={item.id}>
                                    <div style={{height:'52px',lineHeight:'52px'}}>
                                        <Checkbox value={item.id}>{item.name}</Checkbox>
                                    </div>
                                    {
                                        item.subMenus.length > 0 && (
                                            <div style={subMenuStyle}>
                                                {
                                                    item.subMenus.map(childItem => (
                                                        <Checkbox value={childItem.id} key={childItem.id}>{childItem.name}</Checkbox>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </CheckboxGroup>
                </div>
                <div style={{textAlign:'right'}}>
                    <Button type="primary" onClick={this.saveAction}>保存</Button>
                </div>
            </Card>
		)
	}
}

export default MenuLists;
/**
 * Created by hutao on 2018/8/31.
 * 权限配置
 */
import React, { Component } from 'react';
import { Card, Button, List, message, Modal } from 'antd';
import AddOrEditRoleModel from './AddOrEditRoleModel'
import './style.less'

class RoleLists extends Component {
	state = {
        roleLists: [], //角色列表
        activeIndex: 0, //当前选中角色的索引
        activeRole: undefined, //当前选中的角色
        visible: false, //是否显示新增或修改模态框
        isEditor: false, //是否是编辑
        editData: undefined, //当前编辑的角色的信息
	}
	componentWillMount() {
        //获取角色列表
		this.getDataLists();
    }
    getDataLists = (activeIndex) => {
        //获取角色列表
        const res = {
            "success": true,
            "msg": "成功",
            "obj": [
                {
                    "id": 1,
                    "roleName": "领导",
                },
                {
                    "id": 10,
                    "roleName": "学生",
                },
                {
                    "id": 20,
                    "roleName": "辅导员",
                },
                {
                    "id": 21,
                    "roleName": "代课教师",
                },
                {
                    "id": 29,
                    "roleName": "超级管理员",
                }
            ],
            "errorCode": null
        }
		if(res.success){
            let index = activeIndex || 0; //当前选中的索引，默认为0
            this.setState({
                activeRole: res.obj[index],
                roleLists: res.obj || []
            },()=>{
                this.props.changeRole(res.obj[index]); //把当前选中的角色信息传到父组件
            })
        }
    }
    //新增角色，显示模态框，清空编辑数据
    addAction = () => {
        this.setState({visible:true,isEditor:false,editData:undefined})
    }
    //编辑角色，显示模态框，获取当前编辑的角色信息
    editorAction = (editData) => {
        this.setState({visible:true,isEditor:true,editData})
    }
    //删除角色
    deleteAction = (item) => {
        Modal.confirm({
            title: `确定删除${item.roleName}?`,
            onOk:()=> {
                //进行删除操作
                
                // let data = {
                //     id: item.id
                // }
                const res = { success:false,obj:'服务异常！' }
                if(res.success){
                    message.success('删除成功！');
                    this.getDataLists();
                } else {
                    message.error(res.obj);
                }
            },
            onCancel() {},
            okText:'确定',
            cancelText:'取消',
        });
        
    }
    //编辑和新增确定时保存角色信息
    saveAction = (values) => {
        let isEditor = this.state.isEditor;
        let { roleName, remark } = values;
        let data = {roleName, remark, sourceCode: 'pc'};
        // let url = '/bigdata/system/role/save'; //新增时的角色保存接口
        if(isEditor){ //编辑角色时修改请求接口、添加角色id参数
            // url = '/bigdata/system/role/update';
            data.id = this.state.editData.id
        }
        
        //进行保存操作，根据返回数据对页面进行处理
        const res = {success:true};
        if(res.success) {
            message.success('保存成功！');
            this.setState({visible:false,isEditor:false,editData:undefined});
            this.getDataLists(this.state.activeIndex);
        } else {
            message.error(res.obj);
        }
    }
    //当前角色点击、设置当前选中的索引，显示高亮
    rowClick = (item,activeIndex) => {
        this.setState({activeIndex},()=>{
            this.props.changeRole(item); //把当前选中的角色信息传到父组件
        });
    }
	render () {
		return (
			<Card
                className={'authority-roleLists'}
                style={{height:'100%',overflowY:'auto'}}
                title={<span style={{color:'#1890FF',lineHeight:'34px'}}>角色</span>}
                extra={<Button icon="plus" type="primary" onClick={this.addAction}>添加角色</Button>}
            >
                <List
                    dataSource={this.state.roleLists}
                    renderItem={(item,index) => (
                        <List.Item 
                            className={index===this.state.activeIndex?'active':''}
                            onClick={()=>this.rowClick(item,index)}
                            actions={[<a style={{color:'#71CF09'}} href="javascript:;" onClick={()=>this.editorAction(item,index)}>编辑</a>, 
                                <a style={{color:'#E45A5A'}} href="javascript:;" onClick={(e)=>{
                                    e.stopPropagation();
                                    this.deleteAction(item,index);
                                }}>删除</a>]}>
                            {item.roleName}
                        </List.Item>)}
                />
                {this.state.visible?(
                    <AddOrEditRoleModel
                        title={this.state.isEditor?'修改角色':'添加角色'}
                        visible={this.state.visible}
                        onOk={this.saveAction}
                        editData={this.state.editData}
                        onCancel={()=>this.setState({visible:false,isEditor:false,editData:undefined})}
                    />
                ):null}
            </Card>
		)
	}
}

export default RoleLists;
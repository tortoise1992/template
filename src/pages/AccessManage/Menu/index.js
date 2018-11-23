import React from 'react';
import { Card, Tree, Button, Icon, Modal, message } from 'antd';
import AddOrEditRoleModel from './AddOrEditRoleModel'

const TreeNode = Tree.TreeNode;

const iconStyle = {
	fontSize: '20px',
	color: '#aaa',
	marginLeft: '10px'
}
const iconActiveStyle = Object.assign({},iconStyle,{color:'rgb(24, 144, 255)'});

class Menu extends React.Component {
	state = {
		menuLists: [], //菜单列表
		selectedKeys: [], //选中节点
		expandedKeys: [], //展开节点
		visible: false, //是否显示新增或修改模态框
		isEditor: false, //是否修改
		activeData: undefined, //选中节点信息
	}
	componentWillMount() {
		this.getMenuLists();
	}
	//获取菜单列表
	getMenuLists = () => {
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
		if (res.success) {
			this.setState({
				menuLists: res.obj || []
			})
		}
	}
	//选中节点修改
	onSelect = (selectedKeys, info) => {
		if(selectedKeys.length>0){
			this.setState({ selectedKeys, activeData: info.node.props.detail });
		} else {
			this.setState({ selectedKeys, activeData: undefined });
		}
	}
	//拖拽开始
	onDragEnter = (info) => {
		// expandedKeys 需要受控时设置
		this.setState({
		  expandedKeys: info.expandedKeys,
		});
	}
	//拖拽中
	onDrop = (info) => {
		// 拖拽限制处理以及获取拖拽节点的id和父节点id以及计算
		// console.log(info.dragNode)
		// let dragNodeDetail = info.dragNode.props.detail;//拖动节点
		// let dropNodeDetail = info.node.props.detail;//放置节点

		// const dropKey = info.node.props.eventKey; //放置节点id
		// const dragKey = info.dragNode.props.eventKey; //拖动节点id
		// const dropPos = info.node.props.pos.split('-');

		// //如果是父节点不能拖动到别人节点里面
		
		// if(dragNodeDetail && dragNodeDetail.parentId<=0 && dragNodeDetail.subMenus.length>0 &&(dropPos.length>2 || !info.dropToGap)){
		// 	message.warn('不能移动有子节点的节点！');
		// 	return;
		// }
		// //限制不能拖动到子节点上
		// if(!info.dropToGap && dropPos.length>2){
		// 	return;
		// }
		// const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
		// //参数
		// let targetSeq,targetParentId,id=dragKey;
		// if(dropPos.length===2 && !info.dropToGap){
		// 	targetParentId = dropKey;
		// 	targetSeq = dropNodeDetail.seq+1;
		// } else if(dropPos.length>2){
		// 	targetParentId = dropNodeDetail.parentId;
		// 	targetSeq = dropNodeDetail.seq+dropPosition;
		// } else if(dropPos.length===2 && info.dropToGap){
		// 	targetParentId = -1;
		// 	targetSeq = dropNodeDetail.seq+dropPosition;
		// }

		// console.log(dropPos.length,dropPosition,info.dropToGap,targetSeq,targetParentId,id)
		//拖动后请求接口改变菜单的排序
		
	}

	//删除菜单
    deleteAction = () => {
		if(this.state.activeData){
			Modal.confirm({
				title: `确定删除${this.state.activeData.name}菜单吗?`,
				onOk:()=> {
					//处理删除功能,根据返回结果处理
					// let data = {
					// 	id: this.state.activeData.id
					// }

					const res = {
						success:true
					}
					if(res.success){
						message.success('删除成功！');
						this.getMenuLists();
					} else {
						message.error(res.obj);
					}
				},
				onCancel() {},
				okText:'确定',
				cancelText:'取消',
			});
		}
    }
	//编辑和新增确定时保存角色信息
	saveAction = (values) => {
		let isEditor = this.state.isEditor;
        let { name, seq, url } = values;
        let data = {name, seq, url, sourceCode: 'pc',iconUrl:'test',iconSelectedUrl:'test'};
        // let reqUrl = '/bigdata/system/menu/save'; //新增时的角色保存接口
        if(isEditor){ //编辑角色时修改请求接口、添加角色id参数
            // reqUrl = '/bigdata/system/menu/update';
            data.id = this.state.activeData.id
		} else if(this.state.activeData && this.state.activeData.parentId<=0) {
			data.parentId = this.state.activeData.id;
		}
		//保存操作，根据结果进行界面处理
		const res = {
			success: true
		}
        if(res.success){
			message.success('保存成功！');
			this.setState({visible:false,isEditor:false},()=>{
				this.getMenuLists();
			});
		} else {
			message.error(res.obj);
		}
	}
	render() {
		//递归菜单列表
		const loop = data => data.map((item) => {
			if (item.subMenus && item.subMenus.length) {
				return <TreeNode key={item.id} title={item.name} detail={item}>{loop(item.subMenus)}</TreeNode>;
			}
			return <TreeNode key={item.id} title={item.name} detail={item}/>;
		});
		return (
			<div style={{ padding: '20px' }}>
				<Card
					title={<span style={{ color: '#1890FF', lineHeight: '34px' }}>菜单</span>}
					extra={<div>
						<Button icon="plus" type="primary" disabled={this.state.activeData&&this.state.activeData.parentId>0} style={{ marginRight: 20 }} onClick={()=>{
							this.setState({visible:true,isEditor:false})
						}}>添加菜单</Button>
						<Icon type="form" style={this.state.activeData?iconActiveStyle:iconStyle} onClick={()=>{
							if(this.state.activeData){
								this.setState({visible:true,isEditor:true})
							}
						}} />
						<Icon type="delete" style={this.state.activeData?iconActiveStyle:iconStyle} onClick={this.deleteAction} />
					</div>}
				>
					<Tree
						onSelect={this.onSelect}
						selectedKeys={this.state.selectedKeys}
						defaultExpandedKeys={this.state.expandedKeys}
						draggable
						onDragEnter={this.onDragEnter}
						onDrop={this.onDrop}
					>
						{loop(this.state.menuLists)}
					</Tree>
				</Card>
				{this.state.visible?(
                    <AddOrEditRoleModel
                        title={this.state.isEditor?'编辑菜单':'新建菜单'}
						visible={this.state.visible}
						isEditor={this.state.isEditor}
                        onOk={this.saveAction}
                        activeData={this.state.activeData}
                        onCancel={()=>this.setState({visible:false,isEditor:false})}
                    />
                ):null}
			</div>
		)
	}
}

export default Menu;
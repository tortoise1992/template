import React from 'react';
import { Input, Select, Button } from 'antd';
import AddOrEditAccountModel from './AddOrEditAccountModel';

const Option = Select.Option;

class Filter extends React.Component{
	
	constructor (props) {
		super(props);
		this.state={
			account: "", // 账户
			name: "", // 名称
			code: "", // 学号/教工号
			role:"", // 账户角色
			roleList: [], // 账户角色下拉
            // 显示隐藏创建新用户弹出框
            addModalShow: false, 
		};
		this.accountChange = this.accountChange.bind(this); // 账户名称
		this.nameChange = this.nameChange.bind(this); // 姓名
		this.codeChange = this.codeChange.bind(this); // 学号/教工号
		this.roleChange = this.roleChange.bind(this); // 选择角色
		this.handleSearch = this.handleSearch.bind(this); // 搜索
		this.showAddModal = this.showAddModal.bind(this); // 显示创建新用户弹出框
		this.hideAddModal = this.hideAddModal.bind(this); // 显示创建新用户弹出框
	}
	
	 // 账户名称
	accountChange (e) {
		this.setState({
			account:e.target.value
		})
	}
	
	 // 姓名
	nameChange (e) {
		this.setState({
			name:e.target.value
		})
	}
	
	 // 学号/教工号
	codeChange (e) {
		this.setState({
			code:e.target.value
		})
	}
	
	// 选择角色
	roleChange(value){
		this.setState({
			role: value
		})
	}
	
	// 搜索
	handleSearch(){
		const obj = { // 键名按照后端数据键名给
			username: this.state.account, // 账户
			name: this.state.name, // 名称
			accountCode: this.state.code, // 学号/教工号
			roleId: this.state.role // 账户角色
		};
		this.props.changeFilter(obj);
	}
	
	// 显示创建用户弹出框
	showAddModal(){
		this.setState({
			addModalShow: true,
		})
	}
	
	// 隐藏创建用户弹出框
	hideAddModal(){
		this.setState({
			addModalShow: false
		})
	}
	
	componentDidMount(){
		// 获取账户角色下拉选项数据,需要请求数据

		const res = {
			"success": true,
			"msg": "成功",
			"obj": [
				{
					"id": 1,
					"roleName": "管理员4",
					"remark": "管理员",
					"createTime": 1516431152000,
					"updateTime": 1536045400000
				},
				{
					"id": 10,
					"roleName": "学生",
					"remark": "",
					"createTime": 1519810586000,
					"updateTime": 1519811232000
				},
				{
					"id": 20,
					"roleName": "教师123",
					"remark": "教师1",
					"createTime": 1524736133000,
					"updateTime": 1524736319000
				},
				{
					"id": 29,
					"roleName": "超级管理员",
					"remark": "拥有权限管理模块的设置权限不包含菜单",
					"createTime": 1536549032000,
					"updateTime": 1536550539000
				}
			]
		}

		if (res.success) {
			let newRoleList=[];
			res.obj.forEach(
				(item) => {
					newRoleList.push({
						label: item.roleName,
						value: item.id
					})
				}
			);
			newRoleList.unshift({ // 加入全部选项
				label: "全部",
				value: ""
			})
			this.setState({
				roleList: newRoleList
			})
		}
	}
	
	render () {
		return (
			<React.Fragment>
				<span>账户</span>
				
				<Input 
					value={this.state.account} 
					onChange={this.accountChange} 
					placeholder="请输入账户名称"
					style={{
						width: 130, 
						display: "inline-block",
						marginLeft: 10, 
						marginRight: 10
					}} 
				/>
				
				<span>姓名</span>
				<Input 
					value={this.state.name} 
					onChange={this.nameChange} 
					placeholder="请输入姓名"
					style={{
						width: 130, 
						display: "inline-block",
						marginLeft: 10, 
						marginRight: 10
					}} 
				/>
				
				<span>学号/教工号</span>
				<Input 
					value={this.state.code} 
					onChange={this.codeChange} 
					placeholder="请输入学号/教工号"
					style={{
						width: 150, 
						display: "inline-block",
						marginLeft: 10, 
						marginRight: 10
					}} 
				/>
				
				<span style={{marginRight: 10}}>账户角色</span>
				<Select placeholder='请选择账户角色' style={{ width: 150 }} onChange={this.roleChange}>
					{
						this.state.roleList.length >0
						?
						this.state.roleList.map(
							(item)=>{
								return (
									<Option value={item.value} key={item.value}>{item.label}</Option>
								)
							}
						)
						:
						null
					}
			    </Select>
				
				<Button type="primary" onClick={this.handleSearch} style={{margin: "0px 10px"}}>搜索</Button>
				
				<Button type="primary" icon="plus" onClick={this.showAddModal}>创建新用户</Button>
				
				{
					this.state.addModalShow
					?
					<AddOrEditAccountModel 
						title={'新增用户'}
						onOk = {this.handleSearch}
						hideModal = {this.hideAddModal}
					/>
					:
					null
				}
				
				
			</React.Fragment>
		)
	}
}

export default Filter;

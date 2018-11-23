import React from 'react';
import { Table, message } from 'antd';
import AddOrEditAccountModel from './AddOrEditAccountModel';

class AccountTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// table表头设置
			columns: [
                {
                    title: '序号',
                    dataIndex: 'sortIndex',
                    width: "6%"
                }, {
                    title: '账户名',
                    dataIndex: 'username',
                    width: "10%",
			        render: (text) => {
			        	return (
			        		<span title={text}>{text}</span>
			        	)
			        }
                }, {
                    title: '姓名',
                    dataIndex: 'name'
                }, {
                    title: '性别',
                    dataIndex: 'sex',
                    render: (text)=> {
                    	if (text === 1) {
                    		return (
                    			<span>男</span>
                    		)
                    	} else if (text === 2) {
                    		return (
                    			<span>女</span>
                    		)
                    	} else {
                    		return (
                    			<span>-</span>
                    		)
                    	}
                    }
                }, {
                    title: '学工/教工号',
                    dataIndex: 'accountCode'
                }, {
                    title: '角色',
                    dataIndex: 'roles'
                }, {
                    title: '操作',
                    dataIndex: 'menus',
                    width: "25%",
                    render: (text, record)=> {
                		return (
                			<span style={{color: "#1890ff"}}>
	                			<span
	                				onClick={()=>{this.showEdit(record)}}
	                				style={{
	                					marginRight: 10,
	                					cursor: "pointer"
	                				}}>编辑
	                			</span>|
	                			
	                			<span
	                				onClick={()=>{this.initcode(record)}}
	                				style={{
	                					marginRight: 10, 
	                					marginLeft: 10, 
	                					cursor: "pointer"
	                				}}>初始化密码
	                			</span>|
	                			
	                			<span
	                				onClick={()=>{this.deleteUser(record)}}
	                				style={{
	                					marginLeft: 10, 
	                					cursor: "pointer"
	                				}}>删除
	                			</span>
                			</span>
                		)
                    }
                }
            ],
            // tabel数据源
            data: [ // table数据结构形式
//              {
//                 key: '1',
//                 sortIndex: "1",
//                 username: "admin",
//                 name: '胡彦斌',
//                 sex: "1",
//                 accountCode: "111111",
//                 roles: "普通管理员",
//                 menus: null
//              }
            ],
            // 分页设置
            pagination: {
                current: 1,
                pageSize: 10,
                total: null
            },
            // 显示隐藏编辑弹出框
            editShow: false,
            // 传递给子组件（编辑弹出框）的数据（编辑行的所有数据）
            rowInfo: ""
		};
		this.handleTableChange = this.handleTableChange.bind(this); // 分页操作
	    this.getData = this.getData.bind(this); // 请求table数据
	    this.initcode = this.initcode.bind(this); // 初始化密码
	    this.deleteUser = this.deleteUser.bind(this); // 删除用户
	    this.showEdit = this.showEdit.bind(this); // 显示编辑弹出框
	    this.hideEdit = this.hideEdit.bind(this); // 隐藏编辑弹出框
	    this.reloadTable = this.reloadTable.bind(this); // 重新加载表单， 主要用于子组件中操作完成之后重新载入当前页面的table
	}
	
	// 分页操作
	handleTableChange(page) {
        const {current, pageSize, total} = page;
        this.setState(
            ()=>{
                return {
                    pagination: {
                        current,
                        pageSize,
                        total
                    }
                }
            },
            () => {
                this.getData()
            }
        )
    }
	
	// 重新加载表单， 主要用于子组件中操作完成之后重新载入当前页面的table
	reloadTable() {
		let page = {
			current: this.state.pagination.current,
			pageSize: this.state.pagination.pageSize,
			total: this.state.pagination.total
		};
		this.handleTableChange(page);
	}
	
	
	getData(){
		// 父级组件传递进来的参数
		// const {sourceCode, username, name, accountCode, roleId} = this.props;
		const res = {
			"success": true,
			"msg": "成功",
			"obj": {
				"page": 1,
				"pageSize": 10,
				"totalPage": 3,
				"total": 23,
				"rows": [
					{
						"password": "0c8a80688b671e290381acb56b1bd4e9",
						"username": "admin",
						"authorities": [],
						"accountNonExpired": true,
						"accountNonLocked": true,
						"credentialsNonExpired": true,
						"enabled": true,
						"id": 1,
						"userId": null,
						"accountCode": "11111111",
						"name": "Administrator",
						"sex": 1,
						"roles": "超级管理员",
						"menus": null
					},
					{
						"password": "0c8a80688b671e290381acb56b1bd4e9",
						"username": "liujie",
						"authorities": [],
						"accountNonExpired": true,
						"accountNonLocked": true,
						"credentialsNonExpired": true,
						"enabled": true,
						"id": 30,
						"userId": null,
						"accountCode": "111",
						"name": "刘杰",
						"sex": 2,
						"roles": "管理员4",
						"menus": null
					},
				]
			},
			"errorCode": null
		}
		if(res.success && res.obj && res.obj.rows.length > 0){
			// 后端返回的数据加上key值， antd组件所需，
			let newData = res.obj.rows;
			newData.forEach(
				(item, index) => {
					item.key= item.id;
					// 后端数据并不返回排序， 这里循环加上序号
					item.sortIndex = (index - 0) + 1;
				}
			);
			// 更新本地数据源， 以及分页设置
			this.setState({
				data: newData,
				pagination: {
					current: res.obj.page,
					pageSize: res.obj.pageSize,
					total: res.obj.total
				}
			})
		} else { // 如果请求失败， 数据源重置
			this.setState({
				data:[],
				pagination: {
					current: 1,
					pageSize: 10,
					total: null
				}
			})
		}
        
    }
	
	// 点击编辑，显示编辑弹出框
	showEdit(record){
		this.setState({
			editShow: true,
			rowInfo: record
		})
	}
	
	// 隐藏/ 卸载编辑弹出框
	hideEdit(){
		this.setState({
			editShow: false
		})
	}
	
	// 初始化密码
	initcode(record) {
		//初始化操作
		message.success("初始化密码成功， 初始密码： !23qaz")
	}
	
	// 删除用户
	deleteUser(record){
		//删除操作

	}
	
	// props参数发生时， table重置， 重新加载
	componentWillReceiveProps(nextProps){
        if(nextProps !== this.props){
            this.setState(
                () => {
                    return {
                        data:[],
                        pagination: {
                            current: 1,
                            pageSize: 10,
                            total: null
                        }
                    }
                },
                () => {
                    this.getData()
                }
            )
        }
    }
	
	// 性能优化， props改变不继续render， 只有当state发生变化才继续render
	shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state) {
            return true
        } else {
            return false            
        }
    }

    componentDidMount(){
        this.getData() // 请求table数据
    }
        
	render() {
		return(
			<React.Fragment>
				<Table
	                columns={this.state.columns}
	                dataSource={this.state.data}
	                pagination={this.state.pagination}
	                onChange={this.handleTableChange}
	                bordered={true}
	                style={{
	                	marginTop: 20
	                }}
	            />
				
				{
					this.state.editShow
					?
					<AddOrEditAccountModel 
						title={'编辑用户'}
						rowInfo={this.state.rowInfo}
						hideModal={this.hideEdit} 
						onOk={this.reloadTable}
					/>
					:
					null
				}
				
				
			</React.Fragment>
		)
	}
}

export default AccountTable;
import React from 'react';
import { Card } from 'antd';
import Filter from './Filter'; // 顶部过滤器
import AccountTable from './AccountTable'; // 本页table组件

class Account extends React.Component {
	constructor (props) {
		super(props);
		this.state={ // 参数命名根据后端键值对名称而来
			sourceCode: "pc", // 端
			username: "", // 账户
			name: "", // 名称
			accountCode: "", // 学号/教工号
			roleId:"" // 账户角色
		};
		this.changeFilter = this.changeFilter.bind(this); // 从子组件（过滤器Filter）中更新获取后端请求的最新参数， 并传给table组件
	}
	
	// 从子组件（过滤器Filter）中更新获取后端请求的最新参数， 并传给table组件
	changeFilter(obj){
		this.setState({
			username: obj.username, // 账户
			name: obj.name, // 名称
			accountCode: obj.accountCode, // 学号/教工号
			roleId:obj.roleId // 账户角色
		})
	}
	
	render () {
		return (
			<Card style={{margin: "15px 20px"}} title='账户管理'>
				<Filter changeFilter={this.changeFilter} />
				<AccountTable
					sourceCode={this.state.sourceCode}
					username={this.state.username}
					name={this.state.name}
					accountCode={this.state.accountCode}
					roleId={this.state.roleId}
				/>
			</Card>
		)
	}
}

export default Account;

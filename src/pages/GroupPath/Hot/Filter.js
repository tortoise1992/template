import React from 'react';
import { DatePicker, Select, Button, message } from 'antd';
// import { postAction } from './../../../axios';

const Option = Select.Option;

class Filter extends React.Component{
	constructor (props) {
		super(props);
		this.state={
			dateStr: "", // 选择的日期
			mark: "", // 选择的标签
			markList: [], // 标签列表
		};
		this.dateChange = this.dateChange.bind(this); // 改变日期
		this.markChange = this.markChange.bind(this); // 改变标签
		this.sureClick = this.sureClick.bind(this); // 确定按钮
	}
	
	
	// 改变日期
	dateChange (date, dateString) {
		this.setState({
			dateStr: dateString
		})
	}
	
	// 改变标签
	markChange (value) {
		this.setState({
			mark: value
		})
	}
	
	
	// 确定按钮
	sureClick () {
		if (!this.state.dateStr) { // 验证是否输入 
			message.warn("请选择日期");
			return
		};
		if (!this.state.mark) { // 验证是否输入 
			message.warn("请选择标签");
			return
		};
		
		const obj = {
			dateStr: this.state.dateStr,
			mark: this.state.mark
		}
		
		this.props.setData(obj);
		
	}
	
	componentDidMount(){
		const markList = [
			{name:'疑似藏独',id:1},
			{name:'一二三四五六七八九十一二三四五',id:2},
			{name:'同性恋',id:3},
			{name:'重点关注',id:4},
			{name:'成绩较差学生',id:5},
			{name:'成绩较好学生',id:6},
		];
		this.setState({
			markList: markList
		})
	}
	
	render () {
		return (
			<div style={{padding: "10px 20px"}}>
				<span>选择条件:</span>
				
				<DatePicker onChange={this.dateChange}  style={{marginRight: 20, marginLeft: 20}} />
				
				<Select placeholder="请选择标签" style={{ width: 150 }} onChange={this.markChange}>
					{
						this.state.markList && this.state.markList.length > 0 ?
						this.state.markList.map((item,index)=>{
							return (
								<Option value={item.id} key={index}>{item.name}</Option>
							)
						}) : null
					}
			    </Select>
			    
			    <Button type="primary" icon="search" style={{marginLeft: 20}} onClick={this.sureClick}>确定</Button>
			</div>
		)
	}
}

export default Filter;

import React from 'react';
import { Checkbox, message, Row, Col } from 'antd';
// import { postAction } from './../../../axios';
import MainModal from './../../../common/components/MainModal';
import { GetStrActualLength } from '../../../utils'

const CheckboxGroup = Checkbox.Group;

class TagModal extends React.Component{
	constructor (props) {
		super(props);
		this.state={
			selectedInput: [],
			options: [
//				{ label: 'Apple', value: 'Apple' }
			]
		};
		this.handleOk = this.handleOk.bind(this); // 弹出框确定按钮
		this.changeSelectedInput = this.changeSelectedInput.bind(this); // 勾选操作
		this.getTags = this.getTags.bind(this); // 获取标签信息
	}
	
	handleOk(){
		if (this.state.selectedInput.length <= 0) {
			message.warn("请选择要加入的标签");
			return
		};
    	// 向后端提交选中的学生的学号，需要去掉学号后面添加的下标
		let selectedStudent=[];
		this.props.selectedRowKeys.forEach(
			(item) => {
				selectedStudent.push(item.split("&&")[0])
			}
		);
		if(true){
			message.success("加入标签成功");
			// 成功后的页面操作
			this.props.handleModleSuccess();
			// 关闭弹出框
			this.props.hideModal();
		}
	}
	
	changeSelectedInput(checkedValues) {
		console.log(checkedValues)
		this.setState({
			selectedInput: checkedValues
		})
	}
	
	getTags() {
		const markList = [
			{label:'疑似藏独',value:1},
			{label:'一二三四五六七八九十一二三四五',value:2},
			{label:'同性恋',value:3},
			{label:'重点关注',value:4},
			{label:'成绩较差学生',value:5},
			{label:'成绩较好学生',value:6},
		];
		this.setState({
			options: markList
		})
	}
	
	componentDidMount(){
		this.getTags();
	}
	
	render () {
		return (
			<MainModal okText='确定' title="加入标签" onOk={this.handleOk} onCancel={this.props.hideModal} visible={true}>
	        	{/* <CheckboxGroup options={this.state.options} defaultValue={this.state.selectedInput} onChange={this.changeSelectedInput} /> */}
				<CheckboxGroup defaultValue={this.state.selectedInput} onChange={this.changeSelectedInput} >
					<Row>
						{this.state.options.map(item=>(
							<Col 
								span={GetStrActualLength(item.label)>17?16:8} style={{height:40}} key={item.value}>
								<Checkbox value={item.value}>{item.label}</Checkbox>
							</Col>))}
					</Row>
				</CheckboxGroup>
				
	        </MainModal>
		)
	}
}

export default TagModal;
import React from 'react';
import Filter from './Filter';
import MarkTable from './MarkTable';

const curYear = new Date().getFullYear();
class Mark extends React.Component{
	constructor (props) {
		super(props);
		this.state={
			filter: {
				year: curYear, // 学年
	            college: "", // 学院
	            major: "", // 专业
	            classes: "", // 班级
	            mark: "", // 标签
	            nameOrCode: "" // 姓名或者学号
			}
		};
		this.filterObj = this.filterObj.bind(this);
	}
	
	filterObj (obj) {
		this.setState({
			filter: obj
		})
	}
	
	render () {
		return (
			<React.Fragment>
				<div style={{padding: 10}}>
					<Filter filterObj={this.filterObj} />
				</div>
				<div style={{padding: 10}}>
					<MarkTable {...this.state.filter} />
				</div>
			</React.Fragment>
		)
	}
}

export default Mark;

import React from 'react';
import Filter from './Filter';
import HotMap from './../../../common/components/Bmap/HotMap';


class Hot extends React.Component{
	
	constructor (props) {
		super(props);
		this.state={
			dateStr: "", // 选择的日期
			mark: "", // 选择的标签
		};
		this.setData = this.setData.bind(this);
	}
	
	setData (obj) {
		this.setState({
			dateStr: obj.dateStr, // 选择的日期
			mark: obj.mark, // 选择的标签
		})
	}
	
	
	render () {
		const data = [
			{"longitude":118.721777,"latitude":32.209229,"amount":236},
			{"longitude":118.72369,"latitude":32.210791,"amount":16},
			{"longitude":118.722662,"latitude":32.210581,"amount":16},
			{"longitude":118.721642,"latitude":32.209538,"amount":660}
		]
		let newPoints = [];
		data.forEach(
			(item) => {
				newPoints.push({
					"lng":item.longitude,
					"lat":item.latitude,
					"count": item.amount
				})
			}
		);

		return (
			<React.Fragment>
				<Filter setData={this.setData} />
				<HotMap points={newPoints} dateStr={this.state.dateStr} mark={this.state.mark} />
			</React.Fragment>
		)
	}
}

export default Hot;

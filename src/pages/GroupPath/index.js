import React from 'react';
import { Breadcrumb, Menu } from 'antd';
import Hot from './Hot';
import Mark from './Mark';

class GroupPath extends React.Component{
	constructor (props) {
		super(props);
		this.state={
			current: 'item1'
		};
		this.handleTabClick = this.handleTabClick.bind(this);
	}
	
	// 切换tap页
    handleTabClick = (e) => {
        this.setState({
            current: e.key,
        });
    }
	
    render(){
        return (
            <React.Fragment>
            
                <Breadcrumb  className="breadcrumb">
                    <Breadcrumb.Item>轨迹分析</Breadcrumb.Item>
                    <Breadcrumb.Item>群体轨迹</Breadcrumb.Item>
                </Breadcrumb>
                
                <Menu onClick={this.handleTabClick} selectedKeys={[this.state.current]} mode="horizontal" style={{paddingLeft: 20, borderTop: "1px solid #ccc"}}>
	                <Menu.Item key="item1" style={{paddingLeft:35, paddingRight:35}}>
	                   校园热力图
	                </Menu.Item>
					
					<Menu.Item key="item2" style={{paddingLeft:35, paddingRight:35}}>
	                   重点人群标记
	                </Menu.Item>
	            </Menu>
                
                {this.state.current === "item1" ? <Hot /> : <Mark />}
                
            </React.Fragment>
        )
    }
}

export default GroupPath;
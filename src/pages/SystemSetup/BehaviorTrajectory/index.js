import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import TagManage from './TagManage'
import TestingWebsite from './TestingWebsite'

class BehaviorTrajectory extends Component {
    render() {
        return (
            <div>
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                    <Breadcrumb.Item>行为轨迹设置</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <TagManage/>
                    <TestingWebsite style={{marginTop: 20}} />
                </div>
            </div>
        )
    }
}

export default BehaviorTrajectory;
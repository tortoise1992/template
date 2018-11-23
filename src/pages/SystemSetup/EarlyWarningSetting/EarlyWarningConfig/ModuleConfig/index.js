import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import OutOfContact from './OutOfContact';
import NextWorkWarn from './NextWorkWarn';
import CostWarn from './CostWarn';
import { isObjectValueEqual } from '../../../../../utils';
import './ModuleConfig.less';
import LearningWarn from "./LearningWarn";

class ModuleConfig extends Component {
    shouldComponentUpdate(nextProps){
        if(isObjectValueEqual(nextProps.alarmStrategyType,this.props.alarmStrategyType,true)){
            return false;
        } else {
            return true;
        }
    }
    changeAction = (data,type,isError)=> {
        let alarmStrategyTypeTree = this.props.alarmStrategyTypeTree;
        alarmStrategyTypeTree[type] = data;
        let transDataLists = alarmStrategyTypeTree.filter(item=>item);
        let alarmStrategyType = [];
        transDataLists.forEach(item=>{
            item.forEach(a=>{
                let b = Object.assign({},a,{openFlag:1})
                alarmStrategyType.push(b)
            })
        })
        let alarmStrategyTypeIsError = this.props.alarmStrategyTypeIsError;
        alarmStrategyTypeIsError[type] = isError;

        this.props.onChange({alarmStrategyTypeTree,alarmStrategyType,alarmStrategyTypeIsError})
    }
    render() {
        // console.log(this.props.alarmStrategyType)
        let outOfContactData = [],nextWorkWarnData = [],costWarnData = [];
        this.props.alarmStrategyType.forEach(item=>{
            if(item.type===1){
                outOfContactData.push(item)
            } else if(item.type===2){
                nextWorkWarnData.push(item)
            } else if(item.type===4){
                costWarnData.push(item)
            }
        });
        return (
            <Card
                title={<div className={"common-title"}>预警模块配置</div>}
                style={this.props.style}
                className="ewc-moduleconfig"
            >
                <Row gutter={20}>
                    <Col span={12}>
                        <OutOfContact data={outOfContactData} onChange={this.changeAction}/>
                    </Col>
                    <Col span={12}>
                        <NextWorkWarn data={nextWorkWarnData} onChange={this.changeAction}/>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <CostWarn data={costWarnData} onChange={this.changeAction}/>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <LearningWarn/>
                    </Col>
                </Row>
            </Card>
        )
    }
}



export default ModuleConfig;
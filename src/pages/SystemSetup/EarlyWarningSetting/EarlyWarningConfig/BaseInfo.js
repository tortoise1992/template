import React, { Component } from 'react';
import moment from 'moment';
import { Card, Row, Col, Button, Input, DatePicker, Tag, Alert } from 'antd';
import EarlyWarningObjModel from '../Componets/EarlyWarningObjModel'

const { RangePicker } = DatePicker;

const disabledDate = (current)=> {
    return current && current < moment().endOf('day');
}

const regx = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"); 

class BaseInfo extends Component {
    state={
        visible:false,
        collegeLists:[],
        strategyTargetLists:[],
    }
    componentWillMount() {
        //获取学员列表
        const collegeLists = [
            {
                "collegeName": "机械工程学院",
                "collegeCode": "40010",
                "selectFlag": false
            },
            {
                "collegeName": "计算机工程学院",
                "collegeCode": "40070",
                "selectFlag": false
            },
            {
                "collegeName": "通信工程学院",
                "collegeCode": "40060",
                "selectFlag": true
            },
            {
                "collegeName": "自动化学院",
                "collegeCode": "40050",
                "selectFlag": false
            },
            {
                "collegeName": "外国语学院",
                "collegeCode": "40141",
                "selectFlag": false
            },
            {
                "collegeName": "材料工程学院",
                "collegeCode": "40020",
                "selectFlag": false
            },
            {
                "collegeName": "电力工程学院",
                "collegeCode": "40040",
                "selectFlag": false
            },
            {
                "collegeName": "能源与动力工程学院",
                "collegeCode": "40030",
                "selectFlag": false
            },
            {
                "collegeName": "经济与管理学院",
                "collegeCode": "40081",
                "selectFlag": false
            },
            {
                "collegeName": "人文与社会科学学院",
                "collegeCode": "40131",
                "selectFlag": false
            },
            {
                "collegeName": "艺术与设计学院",
                "collegeCode": "40100",
                "selectFlag": false
            },
            {
                "collegeName": "建筑工程学院",
                "collegeCode": "40090",
                "selectFlag": false
            },
            {
                "collegeName": "汽车与轨道交通学院",
                "collegeCode": "40111",
                "selectFlag": false
            },
            {
                "collegeName": "环境工程学院",
                "collegeCode": "40121",
                "selectFlag": false
            },
            {
                "collegeName": "工业中心",
                "collegeCode": "40171",
                "selectFlag": false
            },
            {
                "collegeName": "康尼学院",
                "collegeCode": "40210",
                "selectFlag": false
            },
            {
                "collegeName": "国际合作与交流处",
                "collegeCode": "10110",
                "selectFlag": false
            },
            {
                "collegeName": "机械工程学院(联合培养)",
                "collegeCode": "L40010",
                "selectFlag": false
            },
            {
                "collegeName": "建筑工程学院(路桥与港航工程学联合培养)",
                "collegeCode": "L40090",
                "selectFlag": false
            },
            {
                "collegeName": "自动化学院(电气工程学院)",
                "collegeCode": "L40050",
                "selectFlag": false
            }
        ]
        this.setState({collegeLists})
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.strategyTarget!==this.props.strategyTarget){
            let selecteds = nextProps.strategyTarget.split(',');
            let strategyTargetLists = [];
            let collegeLists = this.state.collegeLists.map(item=>{
                let isExist = false;
                selecteds.forEach(code => {
                    if(item.collegeCode===code){
                        isExist = true;
                    }
                });
                if(isExist){
                    strategyTargetLists.push(Object.assign({},item));
                    item.active = true;
                } else {
                    item.active = false;
                }
                return item;
            });
            this.setState({collegeLists,strategyTargetLists})
        }
    }
    //删除预警策略对象
    deleteStrategyTarget = (index)=> {
        let strategyTarget = this.state.strategyTargetLists.filter((item,i)=>(index!==i)).map(a=>{
            return a.collegeCode;
        }).join(',');
        this.props.onChange({strategyTarget});
    }
    checkStrategyName = (strategyName) => {
        if(strategyName){
            //验证预警策略名称是否重复
        } else {
            this.props.onChange({strategyNameIsRepeat:false});
        }
    }
    render() {
        return (
            <Card
                title={<div className={"common-title"}>预警基本信息</div>}
            >
                <Row gutter={20}>
                    <Col span={12}>
                        <p style={{marginBottom:8}}>预警策略名称</p>
                        <Input value={this.props.strategyName} maxLength={20} onChange={(e)=>{
                            if(!e.target.value.match(regx) || !e.target.value){
                                this.props.onChange({strategyName:e.target.value})
                            }
                        }} onBlur={(e)=>{
                            this.checkStrategyName(e.target.value)
                        }}/>
                        {this.props.strategyNameIsRepeat?<Alert style={{position:'relative',top:10}} message="预警策略名称重复！" type="error" />:null}
                    </Col>
                    <Col span={12}>
                        <p style={{marginBottom:8}}>预警策略时间</p>
                        <RangePicker
                            style={{width:'100%'}}
                            disabledDate={disabledDate}
                            value={this.props.startDate?[moment(this.props.startDate), moment(this.props.endDate)]:undefined}
                            format="YYYY-MM-DD"
                            onChange={(mt,value)=>{
                                let data = {startDate:value[0],endDate:value[1]}
                                this.props.onChange(data);
                            }}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:20}}>
                    <p style={{marginBottom:8}}>预警策略对象</p>
                    <div>
                        {this.state.strategyTargetLists.map((item,index)=>(
                            <Tag 
                                style={{height:28,lineHeight:'28px',color:'#4a4a4a'}}
                                closable 
                                key={item.collegeCode} 
                                afterClose={()=>this.deleteStrategyTarget(index)}>{item.collegeName}</Tag>
                        ))}
                        <Button icon="plus" type={'primary'} onClick={()=>{this.setState({visible:true})}}>新增</Button>
                    </div>
                </Row>
                {this.state.visible?<EarlyWarningObjModel 
                    title={'选择预警策略对象'}
                    visible={this.state.visible}
                    dataLists={this.state.collegeLists}
                    onCancel={()=>this.setState({visible:false})}
                    onOk={(selecteds)=>{
                        this.props.onChange({strategyTarget:selecteds});
                        this.setState({visible:false})
                    }}/>:null}
            </Card>
        )
    }
}

export default BaseInfo;
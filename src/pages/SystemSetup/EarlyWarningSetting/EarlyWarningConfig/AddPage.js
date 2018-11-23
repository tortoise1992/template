import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb, Card, Button, message } from 'antd';
// import Table from '../../../../components/Table'
import BaseInfo from './BaseInfo'
import ModuleConfig from './ModuleConfig'
import PushConfig from './PushConfig'
import { notNull } from '../../../../utils'

let outOfContactDefaut = [{
    maxVal:null,minVal:null,level:1,type:1,openFlag:1,
},{ 
    maxVal:null,minVal:null,level:2,type:1,openFlag:1,
},{
    maxVal:null,minVal:null,level:3,type:1,openFlag:1,
},{
    maxVal:null,minVal:null,level:4,type:1,openFlag:1,
}]

let netWorkDefaut = [{
    maxVal:null,minVal:null,level:1,type:2,openFlag:1,
},{ 
    maxVal:null,minVal:null,level:2,type:2,openFlag:1,
},{
    maxVal:null,minVal:null,level:3,type:2,openFlag:1,
},{
    maxVal:null,minVal:null,level:4,type:2,openFlag:1,
}]

let costWarnDefault = [{
    maxVal:null,minVal:null,level:1,type:4,openFlag:1,
},{ 
    maxVal:null,minVal:null,level:2,type:4,openFlag:1,
},{
    maxVal:null,minVal:null,level:3,type:4,openFlag:1,
},{
    maxVal:null,minVal:null,level:4,type:4,openFlag:1,
}]

let defaultAlarmStrategyType = [...outOfContactDefaut,...netWorkDefaut,...costWarnDefault];
let defaultAlarmStrategyTypeTree = [outOfContactDefaut,netWorkDefaut,costWarnDefault];

class AddPage extends Component {
    state = {
        pageNum: 1,
        pageSize: 10,
        total:0,
        strategyName:undefined,//预警策略名称
        strategyTarget:"",//预警策略对象
        startDate:undefined,//预警策略开始时间
        endDate:undefined,//预警策略结束时间
        alarmStrategyType:JSON.parse(JSON.stringify(defaultAlarmStrategyType)),//预警模块配置
        alarmPush:[],//预警推送配置
        alarmStrategyTypeTree:JSON.parse(JSON.stringify(defaultAlarmStrategyTypeTree)),//预警模块配置树
        editorId: undefined, //编辑ID
        alarmStrategyTypeIsError: [], //预警模块配置错误列表
        strategyNameIsRepeat: false
    }
    componentWillMount(){
        // console.log(this.props);
        let arr = this.props.location.search.split('?');
        let query = {};
        arr.forEach(a=>{
            if(a){
                let key = a.split("=")[0];
                let val = a.split("=")[1];
                query[key] = val;
            }
        })
        let id = query.id;
        if(id){
            // let data = {id};

            const obj = {
                "id": "5c93cd02d85c4806a0f01c23175d1fe3",
                "strategyName": "预警配置列表根据时间降序",
                "strategyTarget": "40060",
                "startDate": "2018-09-19",
                "endDate": "2018-09-21",
                "removeFlag": 0,
                "status": "未开始",
                "alarmStrategyType": [
                    {
                        "id": "3d519d8baf2c40b09cbea1bb98f1ae6b",
                        "strategyId": "5c93cd02d85c4806a0f01c23175d1fe3",
                        "type": 2,
                        "minVal": "55",
                        "level": 3,
                        "openFlag": 1
                    },
                    {
                        "id": "a6bc54b02aca4a13b5bbe5ba0229f8b5",
                        "strategyId": "5c93cd02d85c4806a0f01c23175d1fe3",
                        "type": 2,
                        "minVal": "1",
                        "level": 4,
                        "openFlag": 1
                    },
                    {
                        "id": "e9313cdb2dd7465b932f429b0238536d",
                        "strategyId": "5c93cd02d85c4806a0f01c23175d1fe3",
                        "type": 2,
                        "minVal": "77",
                        "level": 1,
                        "openFlag": 1
                    },
                    {
                        "id": "f7dafb282d5245af9aced9afa9a1b675",
                        "strategyId": "5c93cd02d85c4806a0f01c23175d1fe3",
                        "type": 2,
                        "minVal": "66",
                        "level": 2,
                        "openFlag": 1
                    }
                ],
                "alarmPush": [
                    {
                        "id": "a3798c816af94b0a99eb68c09d36c814",
                        "strategyId": "5c93cd02d85c4806a0f01c23175d1fe3",
                        "jobNumber": "11111",
                        "pushName": "11",
                        "pushMail": "111@qq.com",
                        "missAlarm": 0,
                        "networkAlarm": 1,
                        "studyAlarm": 0,
                        "consumeAlarm": 0
                    }
                ],
                "strategyTargetText": "通信工程学院",
                "strategyTime": "2018-09-19~2018-09-21",
                "networkAlarmText": "红:77小时、橙:66小时、黄:55小时、蓝:1小时"
            }
            let { strategyName, strategyTarget, startDate, endDate, alarmStrategyType, alarmPush } = obj;
            let alarmPushLists=[];
            alarmPush.forEach(item=>{
                let { jobNumber, pushName, pushMail, missAlarm, studyAlarm, networkAlarm, consumeAlarm } = item;
                let warnArr=[],warnName,warnModule=[];
                if(missAlarm){
                    warnModule.push('missAlarm');
                    warnArr.push('失联预警');
                }
                if(networkAlarm){
                    warnModule.push('networkAlarm');
                    warnArr.push('网络预警');
                }
                if(studyAlarm){
                    warnModule.push('studyAlarm');
                    warnArr.push('学业预警');
                }
                if(consumeAlarm){
                    warnModule.push('consumeAlarm');
                    warnArr.push('消费预警');
                }
                warnName = warnArr.join(',');
                let data = {jobNumber, pushName, pushMail, missAlarm, studyAlarm, networkAlarm, consumeAlarm,warnName,warnModule}
                alarmPushLists.push(data)
            })
            this.setState({
                strategyName,strategyTarget,startDate,endDate,
                alarmStrategyType: alarmStrategyType || [],
                alarmPush: alarmPushLists || [],
                editorId:id
            })
        }
    }
    changeState = (state) => {
        this.setState(state);
    }
    changePage = (page)=> {
        this.setState({pageNum:page},()=>this.getData())
    }
    saveAction = ()=> {
        let { strategyName, strategyTarget, startDate, endDate, alarmStrategyType, alarmPush, strategyNameIsRepeat } = this.state;
        if(!notNull(strategyName)){
            message.error('预警策略名称不能为空！');return;
        }
        if(strategyNameIsRepeat){
            message.error('预警策略名称不能重复！');return;
        }
        if(!notNull(strategyTarget)) {
            message.error('预警策略对象不能为空！');return;
        }
        if(!notNull(startDate)&&!notNull(endDate)) {
            message.error('预警策略时间不能为空！');return;
        }
        if(alarmStrategyType.length>0){
            for(let i=0;i<alarmStrategyType.length;i++){
                let item = alarmStrategyType[i];
                if(item.type===1 || item.type===2){
                    if(!item.minVal){
                        message.error('预警模块配置参数未填写！');
                        return;
                    }
                } 
                if(item.type===4){
                    if(!item.maxVal){
                        message.error('预警模块配置参数未填写！');
                        return;
                    }
                }
            }
            if(this.state.alarmStrategyTypeIsError.some(item=>item===false)){
                message.error('预警模块配置参数错误！');
                return;
            }
        }
        if(alarmPush.length===0) {
            message.error('预警推送人列表不能为空！');return;
        }
        let data = {strategyName, strategyTarget, startDate, endDate, alarmStrategyType, alarmPush};
        if(this.state.editorId){
            data.id = this.state.editorId;
            //修改
            message.success('保存成功！',2,()=>{
                this.props.history.goBack();
            });
        } else {
            //新增
            message.success('保存成功！',2,()=>{
                this.props.history.goBack();
            });
        }
        
    }
    render() {
        const dataSource = this.state.alarmPush || [];
        dataSource.forEach((item,index)=>{
            dataSource[index].key = index;
            dataSource[index].index = index + 1;
        })
        let total = dataSource.length;
        return (
            <div>
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                    <Breadcrumb.Item>预警设置</Breadcrumb.Item>
                    <Breadcrumb.Item>新增预警设置</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <BaseInfo 
                        strategyName={this.state.strategyName}
                        strategyTarget={this.state.strategyTarget}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.changeState}
                        strategyNameIsRepeat={this.state.strategyNameIsRepeat}
                        editorId = {this.state.editorId}
                    />
                    <ModuleConfig style={{marginTop:20}} 
                        alarmStrategyType={this.state.alarmStrategyType} 
                        alarmStrategyTypeTree={this.state.alarmStrategyTypeTree}
                        alarmStrategyTypeIsError={this.state.alarmStrategyTypeIsError}
                        onChange={this.changeState}/>
                    <PushConfig style={{marginTop:20}} editorId={this.state.editorId} dataSource={dataSource} total={total} onChange={this.changeState}/>
                    <Card style={{marginTop:20}}>
                        <div style={{margin:'-15px 0',textAlign:'right'}}>
                            <Button size="large" type="primary" style={{marginRight:20}} onClick={this.saveAction}>保存</Button>
                            <Button size="large" onClick={()=>{
                                this.props.history.go(-1)
                            }}>返回</Button>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}

export default withRouter(AddPage);
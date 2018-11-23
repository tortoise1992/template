import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Popconfirm, Tooltip, message} from 'antd';
import Table from '@/common/components/Table'
import UploadDraggerModal from '@/common/components/UploadDraggerModal'
import AddOrEditorModel from './AddOrEditorModel'
import './pushconfig.less'

const warnModules = [
    { label: '失联预警', value: 'missAlarm' },
    { label: '网络预警', value: 'networkAlarm' },
    { label: '学业预警', value: 'studyAlarm' },
    { label: '消费预警', value: 'consumeAlarm' },
];

class PushConfig extends Component {
    constructor(props){
        super(props);
        let columns = [{
            title: '序号',
            dataIndex: 'index',
            width: "8%"
        }, {
            title: '工号',
            dataIndex: 'jobNumber',
            width:"15%"
        }, {
            title: '姓名',
            dataIndex: 'pushName',
            width:"15%"
        }, {
            title: '邮箱',
            dataIndex: 'pushMail',
            width:"25%"
        }, {
            title: '提醒模块',
            dataIndex: 'warnName',
            width:"15%"
        }, {
            title: '操作',
            dataIndex: 'handle',
            render: (text, record)=>(
                <div>
                    <a style={{color:'#309cff',marginRight:10}} onClick={()=>{
                        this.setState({
                            visible: true,
                            isEdit: true,
                            editData: record,
                        })
                    }} href={'javascript:void(0)'}>编辑</a>
                    <Popconfirm title="确认删除?" onConfirm={() => this.deleteAction(record)}>
                        <a href="javascript:;" style={{color:'#8d99b0'}}>删除</a>
                    </Popconfirm>
                </div>
            )
        }];
        this.state = ({
            columns,
            pageNum: 1,
            pageSize: 10,
            dataLists: [],
            isEdit: false,
            editData: undefined,
            visible: false,
            isImport: false
        })
    }
    componentWillReceiveProps(nextProps){

    }
    changePage = (page)=> {
        this.setState({pageNum:page})
    }
    deleteAction = (record)=>{
        let dataLists = this.props.dataSource;
        dataLists.splice(record.index-1,1)
        this.props.onChange({
            alarmPush: dataLists
        })
    }
    addOrEditAction = (values)=> {
        let { jobNumber, pushName, pushMail, warnModule } = values;
        let data = { jobNumber,pushMail,pushName,warnModule:Object.assign([],warnModule)};
        let warnArr=[],warnName;
        warnModules.forEach(ele=>{
            if(warnModule.some(a=>a===ele.value)){
                warnArr.push(ele.label);
                data[ele.value] = 1;
            } else {
                data[ele.value] = 0;
            }
        })
        warnName = warnArr.join(',');
        data.warnName = warnName;
        let dataLists = this.props.dataSource;
        if(this.state.isEdit){
            let isError = false;
            dataLists.forEach((item,index)=>{
                if(item.key===this.state.editData.key){
                    if(dataLists.some(a=>{
                        return (a.key!==this.state.editData.key)&&(a.jobNumber===data.jobNumber || a.pushMail===data.pushMail);
                    })){
                        isError = true;
                        message.error('预警推送对象或邮箱重复！');
                    } else {
                        dataLists[index] = data;
                    }
                }
            })
            if(isError){
                return;
            }
        } else {
            if(dataLists.some(item=>{
                return item.jobNumber===data.jobNumber || item.pushMail===data.pushMail;
            })){
                message.error('预警推送对象或邮箱重复！');
                return;
            }
            dataLists.push(data);
        }
        this.setState({ visible:false,isEdit:false,editData:undefined});
        this.props.onChange({
            alarmPush: dataLists
        })
    }
    importAction = (datas)=> {
        // console.log(datas)
        let dataLists = this.props.dataSource;
        datas.forEach(item=>{
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
            dataLists.push(data)
        })
        
        this.setState({ isImport: false });
        this.props.onChange({
            alarmPush: dataLists
        })
    }
    cancelAddOrEdit = ()=> {
        this.setState({
            visible:false,
            isEdit:false,editData:undefined
        })
    }
    render() {
        let pageNum = this.state.pageNum;
        let pageSize = this.state.pageSize;
        const dataSource = this.props.dataSource.filter((item,index)=>{
            if((index+1)>(pageNum-1)*pageSize && (index+1)<=pageNum*pageSize){
                return true;
            } else {
                return false;
            }
        });
        
        return (
            <Card 
                title={
                    <Row style={{margin:'-5px 0px'}}>
                        <Col span={12}>
                            <div className="common-title" style={{lineHeight:'34px'}}>预警推送配置</div>
                        </Col>
                        <Col span={12} style={{textAlign:'right'}}>
                            <Tooltip placement="top" title="添加" overlayClassName={'common-tooltip'}>
                                <span style={{marginRight:12,fontSize:20}} 
                                    className="iconfont icon-btn icon-tianjiachengyuan" onClick={()=>this.setState({visible:true})}></span>
                            </Tooltip>
                            {this.props.editorId?(
                                <Tooltip placement="top" title="导出" overlayClassName={'common-tooltip'} onClick={()=>{
                                    //导出
                                    message.error('无导出链接！')
                                }}>
                                    <span style={{marginRight:12}} className="iconfont icon-btn icon-wenjiandaochu"></span>
                                </Tooltip>
                            ):null}
                            <Tooltip placement="top" title="导入" overlayClassName={'common-tooltip'} onClick={()=>this.setState({isImport:true})}>
                                <span style={{marginRight:12}} className="iconfont icon-btn icon-wenjiandaoru"></span>
                            </Tooltip>
                            <Tooltip placement="top" title="下载" overlayClassName={'common-tooltip'}>
                                <span style={{fontSize:20}} className="iconfont icon-btn icon-msnui-download" onClick={()=>{
                                    //下载
                                    message.error('无下载链接！')
                                }}></span>
                            </Tooltip>
                        </Col>
                    </Row>
                }
                className={this.props.className+' earlywarn-push-config'} style={this.props.style}>
                
                <Row style={{marginTop:14}}>
                    <Table dataSource={dataSource} 
                        columns={this.state.columns}
                        current={this.state.pageNum}
                        pageSize={this.state.pageSize}
                        pagination
                        bordered
                        total={this.props.total}
                        changePage={this.changePage} />
                </Row>
                {this.state.visible?(
                    <AddOrEditorModel
                        title={this.state.isEdit?'编辑预警对象':'新增预警对象'}
                        visible={this.state.visible}
                        onCancel={this.cancelAddOrEdit}
                        onOk={this.addOrEditAction}
                        warnModules={warnModules}
                        editData={this.state.editData}
                    />):null}
                {this.state.isImport?(
                    <UploadDraggerModal
                        visible={this.state.isImport}
                        action={''}
                        onCancel={()=>this.setState({isImport:false})}
                        onOk={this.importAction}
                    />
                ):null}
            </Card>
        )
    }
}

export default withRouter(PushConfig);
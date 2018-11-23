import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Button, message, Popconfirm, Badge } from 'antd';
import Table from '@/common/components/Table'
import MainModal from '@/common/components/MainModal'
import './style.less'

class EarlyWarningConfig extends Component {
    constructor(props){
        super(props);
        let columns = [{
            title: '序号',
            dataIndex: 'index',
            width: '6%',
        }, {
            title: '预警策略名称',
            dataIndex: 'strategyName',
            width: '18%',
            render: (text) => {
            	return (
            		<span title={text}>{text}</span>
            	)
            }
        }, {
            title: '预警策略对象',
            dataIndex: 'strategyTargetCollege',
            width: '18%',
            render: (text) => {
            	return (
            		<span title={text}>{text}</span>
            	)
            }
        }, {
            title: '预警策略时间',
            dataIndex: 'dateTime',
            width: '18%',
            render:(text,record)=>{
                return record.startDate + '~' + record.endDate;
            }
        }, {
            title: '预警推送方式',
            dataIndex: 'type',
            render: ()=>'邮箱',
            width: '15%',
        }, {
            title: '状态',
            dataIndex: 'status',
            width: '10%',
            render: (text, record)=>{
                let badge;
                if(text==='生效'){
                    badge = <Badge status="processing" />
                } else if(text==='未生效'){
                    badge = <Badge status="success" />
                } else {
                    badge = <Badge status="default" />
                }
                return <span>{badge}{text}</span>;
            }
        }, {
            title: '操作',
            dataIndex: 'handle',
            render: (text, record)=>(
                <div>
                    <a style={{color:'#309cff',marginRight:10}} onClick={()=>{
                        this.props.history.push('/mainframe/systemsetup/earlywarningconfigadd?id='+record.id)
                    }} href={'javascript:void(0)'}>编辑</a>
                    <Popconfirm title="确认删除?" onConfirm={() => this.deleteAction(record.id)}>
                        <a href="javascript:;" style={{color:'#8d99b0'}}>删除</a>
                    </Popconfirm>
                </div>
            ),
            onCell:()=>{
                return {
                    onClick:(e)=>e.stopPropagation()
                }
            }
        }];
        this.state = ({
            columns,
            pageNum: 1,
            pageSize: 10,
            total:0,
            dataLists:[],
            isEdit: false,
            editTag: {},
            showDetail:false,
            detailInfo:{}
        })
    }
    componentWillMount(){
        this.getData();
    }
    getData = () => {
        const dataLists = [
            {
                "id": "5c93cd02d85c4806a0f01c23175d1fe3",
                "strategyName": "预警配置列表根据时间降序",
                "strategyTarget": "40060",
                "startDate": "2018-09-19",
                "endDate": "2018-09-21",
                "removeFlag": 0,
                "status": "未开始",
                "strategyTargetCollege": "通信工程学院"
            }
        ]
        this.setState({
            dataLists,
            total: dataLists.length
        })
    }
    deleteAction = (id)=> {
        // let data = { id }
        message.error("删除失败！");
    }
    changePage = (page)=> {
        this.setState({pageNum:page},()=>this.getData())
    }
    rowClick = (record)=> {
        // let data = {id:record.id}
        let detailInfo = {
            "id": "5c93cd02d85c4806a0f01c23175d1fe3",
            "strategyName": "预警配置列表根据时间降序",
            "strategyTarget": "40060",
            "startDate": "2018-09-19",
            "endDate": "2018-09-21",
            "removeFlag": 0,
            "status": "未开始",
            "strategyTargetText": "通信工程学院",
            "strategyTime": "2018-09-19~2018-09-21",
            "networkAlarmText": "红:77小时、橙:66小时、黄:55小时、蓝:1小时"
        };
        this.setState({
            showDetail: true,
            detailInfo:Object.assign({},detailInfo,record)
        })
    }
    render() {
        const dataSource = this.state.dataLists || [];
        dataSource.forEach((item,index)=>{
            dataSource[index].key = index;
            dataSource[index].index = index + 1;
        })
        
        return (
            <Card className={this.props.className+' earlyWarningConfig'}>
                <Row>
                    <Col span={12}>
                        <div className="common-title">当前预警配置</div>
                    </Col>
                    <Col span={12} style={{textAlign:'right'}}>
                        <Button icon="plus" type={'primary'} onClick={()=>this.props.history.push('/mainframe/systemsetup/earlywarningconfigadd')}>新增</Button>
                    </Col>
                </Row>
                <Row style={{marginTop:14}}>
                    <Table dataSource={dataSource} 
                        columns={this.state.columns}
                        current={this.state.pageNum}
                        pagination
                        bordered
                        total={this.state.total}
                        changePage={this.changePage}
                        onRow={(record, index) => {
                            return {
                              onClick: () => this.rowClick(record, index),// 点击行
                            };
                        }} />
                </Row>
                {this.state.showDetail?(
                    <MainModal
                        title={'查看详情'}
                        visible={this.state.showDetail}
                        onCancel={()=>this.setState({showDetail:false})}
                        width={656}
                        noFooter={true}
                    >
                        <div className="ewc-detailModel">
                            <Row><Col span={8}>策略名称</Col><Col span={16}>{this.state.detailInfo.strategyName}</Col></Row>
                            <Row style={{height:102}}>
                                <Col span={8}><Row type="flex" align="middle" justify="center">策略对象</Row></Col>
                                <Col span={16}>
                                    <Row type="flex" align="middle" style={{overflowY:'auto'}}>
                                        {this.state.detailInfo.strategyTargetCollege}
                                    </Row>
                                </Col>
                            </Row>
                            <Row><Col span={8}>策略时间</Col><Col span={16}>{this.state.detailInfo.startDate + '～' + this.state.detailInfo.endDate}</Col></Row>
                            <Row><Col span={8}>失联预警</Col><Col span={16}>{this.state.detailInfo.missAlarmText}</Col></Row>
                            <Row><Col span={8}>网络预警</Col><Col span={16}>{this.state.detailInfo.networkAlarmText}</Col></Row>
                            {/* <Row><Col span={8}>学业预警</Col><Col span={16}>{this.state.detailInfo.strategyName}</Col></Row> */}
                            <Row><Col span={8} style={{height:83,lineHeight:'42px'}}>消费预警</Col><Col span={16} style={{height:83}}>{this.state.detailInfo.consumeAlarmText}</Col></Row>
                        </div>
                    </MainModal>
                ):null}
            </Card>
        )
    }
}

export default withRouter(EarlyWarningConfig);
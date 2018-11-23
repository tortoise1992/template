import React, { Component } from 'react';
import { Card, Row, Col, Button, Input, message, Popconfirm, Switch, Select } from 'antd';
import Table from '@/common/components/Table'
import MainModal from '@/common/components/MainModal'
import { notNull } from '../../../utils'
const { TextArea } = Input;
const Option = Select.Option;

let spanStyle = {
    width:70,
    display: 'inline-block',
    textAlign: 'right'
}

class ActionModel extends Component {
    state = {
        info:{},
        types:[]
    }
    componentWillMount(){
        let info = this.props.info || {};
        //网站类型
        const types = [
            {
                "dataType": "webSiteType",
                "dataKey": "搜索引擎",
                "dataValue": "搜索引擎",
                "orderCode": 0
            },
            {
                "dataType": "webSiteType",
                "dataKey": "电子商务",
                "dataValue": "电子商务",
                "orderCode": 0
            },
            {
                "dataType": "webSiteType",
                "dataKey": "门户网站",
                "dataValue": "门户网站",
                "orderCode": 0
            }
        ]
        this.setState({info,types});
    }
    changeInfo = (key,value)=> {
        let info = this.props.info;
        info[key] = value;
        this.setState({info});
    }
    onOk = () => {
        let { address, name, type } = this.state.info;
        if(!notNull(address)){
            message.error('网站地址不能为空！')
        } else if(!notNull(name)) {
            message.error('网站名称不能为空！')
        } else if(!notNull(type)) {
            message.error('网站类型不能为空！')
        } else {
            this.props.onOk(this.state.info)
        }
    }
    render() {
        // console.log(this.state.info)
        let info = this.state.info;
        return (
            <MainModal
                title={this.props.title}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                onOk={this.onOk}
                width={434}
            >
                <div>
                    <div>
                        <span style={spanStyle}>网站地址：</span>
                        <Input placeholder={'请输入网站地址'} style={{width:310}} value={info.address} 
                            maxLength={200}
                            onChange={(e)=>this.changeInfo('address',e.target.value)}/>
                    </div>
                    <div style={{marginTop:24}}>
                        <span style={spanStyle}>网站名称：</span>
                        <Input placeholder={'请输入网站名称'} 
                            maxLength={30}
                            style={{width:310}} 
                            value={info.name} onChange={(e)=>this.changeInfo('name',e.target.value)}/>
                    </div>
                    <div style={{marginTop:24}}>
                        
                        <span style={spanStyle}>网站类型：</span>
                        <Select placeholder={'请输入网站类型'} style={{width:310}} value={info.type} onChange={(value)=>this.changeInfo('type',value)}>
                            {this.state.types.map((item,i)=>(
                                <Option value={item.dataKey} key={i}>{item.dataValue}</Option>
                            ))}
                        </Select>
                        {/* <Input placeholder={'请输入网站类型'} style={{width:310}} value={info.type}/> */}
                    </div>
                    <div style={{marginTop:24}}>
                        <span style={spanStyle}>备注：</span>
                        <TextArea placeholder={'备注'} 
                            style={{width:310,resize:'none'}} 
                            maxLength={300} value={info.remark} onChange={(e)=>this.changeInfo('remark',e.target.value)}/>
                    </div>
                </div>
            </MainModal>
        )
    }
}

class TestingWebsite extends Component {
    constructor(props){
        super(props);
        let columns = [{
            title: '序号',
            dataIndex: 'index',
            width: '6%'
        }, {
            title: '网站地址',
            dataIndex: 'address',
            width: '20%',
            render: (text) => {
            	return (
            		<span title={text}>{text}</span>
            	)
            }
        }, {
            title: '名称',
            dataIndex: 'name',
            width: '20%',
            render: (text) => {
            	return (
            		<span title={text}>{text}</span>
            	)
            }
        }, {
            title: '类型',
            dataIndex: 'type',
            width: '14%',
            render: (text) => {
            	return (
            		<span title={text}>{text}</span>
            	)
            }
        }, {
            title: '创建时间',
            dataIndex: 'createDate',
            width: '15%'
        }, {
            title: '状态',
            dataIndex: 'openFlag',
            width: '10%',
            render: (text,record) => {
                return <Switch checked={text===1} onChange={()=>this.changeStatus(record)} />
            }
        }, {
            title: '操作',
            dataIndex: 'handle',
            width: '15%',
            render: (text, record)=>(
                <div>
                    <a style={{color:'#309cff',marginRight:10}} onClick={()=>this.editorAction(record)} href={'javascript:void(0)'}>编辑</a>
                    <Popconfirm title="确认删除?" onConfirm={() => this.deleteAction(record.id)}>
                        <a href="javascript:;" style={{color:'#8d99b0'}}>删除</a>
                    </Popconfirm>
                </div>
            )
        }];
        this.state = ({
            columns,
            visibleModel:false,
            pageNum: 1,
            pageSize: 10,
            total:0,
            dataLists:[],
            isEdit: false,
            editInfo: {}
        })
    }
    componentWillMount(){
        this.getData();
    }
    getData = () => {
        const dataLists = [
            {
                "id": "5a0ed4de2ad24f37aaa3e58f37903502",
                "address": "https://www.okcoin.com",
                "name": "OKCoin海外版",
                "type": "门户网站",
                "openFlag": 0,
                "createDate": "2018-09-05",
                "updateDate": "2018-09-12"
            },
            {
                "id": "843ae9ca66df45e29ca90924d7fcc022",
                "address": "www.twitter.com",
                "name": "推特",
                "type": "电子商务",
                "openFlag": 0,
                "createDate": "2018-09-05",
                "updateDate": "2018-09-12"
            },
            {
                "id": "9ca8f74e5ccf4a6f9cbcd2a5dd80754a",
                "address": "http://192.168.102.226:9080/mainframe/systemsetup/behaviortrajectory",
                "name": "南京工程学院大数据平台",
                "type": "门户网站",
                "openFlag": 0,
                "remark": "校内平台校内平台校内平台",
                "createDate": "2018-09-05",
                "updateDate": "2018-09-12"
            },
            {
                "id": "fe70b1563a0f4fdd93c020c842a0994b",
                "address": "www.facebook.com",
                "name": "脸书",
                "type": "电子商务",
                "openFlag": 0,
                "createDate": "2018-09-05",
                "updateDate": "2018-09-12"
            },
            {
                "id": "13cefc3f8639473b984f2fab18fd5a45",
                "address": "http://www.baidu.com",
                "name": "百度一下，你就知",
                "type": "搜索引擎",
                "openFlag": 1,
                "remark": "测试",
                "createDate": "2018-08-22",
                "updateDate": "2018-08-22"
            },
            {
                "id": "51781de58b564713b0dadb585318aad9",
                "address": "http://www.baidu.com",
                "name": "百度一下，你就知道",
                "type": "搜索引擎",
                "openFlag": 0,
                "createDate": "2018-08-22"
            },
            {
                "id": "81c9b684475e4a42a5fe45b378265468",
                "address": "http://www.baidu.com",
                "name": "百度一下，你就知道2",
                "type": "搜索引擎",
                "openFlag": 1,
                "createDate": "2018-08-22",
                "updateDate": "2018-08-30"
            },
            {
                "id": "b5fb91fa59f242f39e6b3cb42991ef43",
                "address": "http://www.baidu.com",
                "name": "百度一下，你就知道",
                "type": "搜索引擎",
                "openFlag": 1,
                "createDate": "2018-08-22",
                "updateDate": "2018-08-22"
            }
        ]
        this.setState({
            dataLists,
            total: dataLists.length
        })
    }
    saveAction = (info,changeStatus)=> {
        // let { id, address, name, remark, type, openFlag } = info;
        // let data,url;
        // if(changeStatus){
        //     data = {id, openFlag}
        //     url = '/bigdata/actionSetting/updateActionSettingWebsite';
        // } else if(this.state.isEdit){
        //     data = {id, address, name, remark, type}
        //     url = '/bigdata/actionSetting/updateActionSettingWebsite';
        // } else {
        //     data = {address, name, remark, type}
        //     url = '/bigdata/actionSetting/insertActionSettingWebsite';
        // }
        message.success("保存成功！");
        this.hideModal();
    }
    changeStatus = (info)=> {
        let { id, openFlag } = info;
        openFlag = openFlag===1?0:1;
        this.saveAction({ id, openFlag },true)
    }
    editorAction = (record)=> {
        this.setState({isEdit:true,editInfo:record,visibleModel:true})
    }
    deleteAction = (id)=> {
        // let data = { id }
        message.success("删除。。。！");
    }
    showModal = ()=> {
        this.setState({visibleModel:true})
    }
    hideModal = ()=> {
        this.setState({visibleModel:false,isEdit:false,editInfo:{}})
    }
    changePage = (page)=> {
        this.setState({pageNum:page},()=>this.getData())
    }
    render() {
        const dataSource = this.state.dataLists || [];
        dataSource.forEach((item,index)=>{
            dataSource[index].key = index;
            dataSource[index].index = index + 1;
        })
        
        return (
            <Card className={this.props.className} style={this.props.style}>
                <Row>
                    <Col span={12}>
                        <div className="common-title">网站监测管理</div>
                    </Col>
                    <Col span={12} style={{textAlign:'right'}}>
                        <Button icon="plus" type={'primary'} onClick={this.showModal}>新增</Button>
                    </Col>
                </Row>
                <Row style={{marginTop:14}}>
                    <Table dataSource={dataSource} 
                        columns={this.state.columns}
                        current={this.state.pageNum}
                        pagination
                        bordered
                        total={this.state.total}
                        changePage={this.changePage} />
                </Row>
                {this.state.visibleModel?<ActionModel 
                    title={this.state.isEdit?"编辑检测网站":"新增检测网站"}
                    visible={this.state.visibleModel}
                    onCancel={this.hideModal}
                    onOk={this.saveAction}
                    info={this.state.editInfo} />:null}
            </Card>
        )
    }
}

export default TestingWebsite;
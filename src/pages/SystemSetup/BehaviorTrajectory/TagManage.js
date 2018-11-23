import React, { Component } from 'react';
import { Card, Row, Col, Button, Input, message, Popconfirm } from 'antd';
import Table from '@/common/components/Table'
import MainModal from '@/common/components/MainModal'

const regx = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"); 

class ActionModel extends Component {
    state = {
        name: undefined
    }
    componentWillMount(){
        if(this.props.name){
            this.setState({name:this.props.name})
        }
    }
    onOk = () => {
        if(this.state.name && this.state.name.trim().length>0){
            this.props.onOk(this.state.name.trim())
        } else {
            message.error('标签名称不能为空！')
        }
    }
    render() {
        return (
            <MainModal
                title={this.props.title}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                onOk={this.onOk}
                width={420}
            >
                <div>
                    <Input placeholder={'请输入标签名称'} maxLength={15} value={this.state.name} onChange={(e)=>{
                        if(!e.target.value.match(regx) || !e.target.value){
                            this.setState({name:e.target.value})
                        }
                    }}/>
                </div>
            </MainModal>
        )
    }
}

class TagManage extends Component {
    constructor(props){
        super(props);
        let columns = [{
            title: '序号',
            dataIndex: 'index',
            width: '6%'
        }, {
            title: '标签名称',
            dataIndex: 'name',
            render: (text) => {
            	return (
            		<span title={text}>{text}</span>
            	)
            }
        }, {
            title: '人数统计',
            dataIndex: 'amount',
            width: '15%'
        }, {
            title: '创建时间',
            dataIndex: 'createDate',
            width: '15%'
        }, {
            title: '操作',
            dataIndex: 'handle',
            width: '20%',
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
            editTag: {}
        })
    }
    componentWillMount(){
        this.getData();
    }
    getData = () => {
        let dataLists = [
            {
                "id": "a5214501c43f4a0cb3a3c80ff7ca48d5",
                "name": "ertwerterteraaa",
                "createDate": "2018-09-12",
                "updateDate": "2018-09-12",
                "amount": 0
            },
            {
                "id": "5b6b2026cdf54d8caa36cd6b06b16eae",
                "name": "疑似藏独",
                "createDate": "2018-09-11",
                "updateDate": "2018-09-11",
                "amount": 896
            },
            {
                "id": "e9f9c4939ae7429c97c271609e2350ac",
                "name": "一二三四五六七八九十一二三四五",
                "createDate": "2018-09-05",
                "updateDate": "2018-09-06",
                "amount": 0
            },
            {
                "id": "e6722ce5f3df42aa85d8e5b357954649",
                "name": "同性恋",
                "createDate": "2018-09-05",
                "updateDate": "2018-09-06",
                "amount": 0
            },
            {
                "id": "dd03fb97f4624c338f06d7f3d1df2308",
                "name": "重点关注",
                "createDate": "2018-08-09",
                "updateDate": "2018-09-06",
                "amount": 21
            },
            {
                "id": "ca3c94b75e1f446cbc261d3faa938cd3",
                "name": "成绩较差学生",
                "createDate": "2018-09-05",
                "updateDate": "2018-09-06",
                "amount": 0
            },
            {
                "id": "bb9ef6dbe5f24b57b67f1018d3b2a23e",
                "name": "成绩较好学生",
                "createDate": "2018-09-05",
                "updateDate": "2018-09-06",
                "amount": 2
            },
            {
                "id": "73b4f5ad0897491f9ec002415ba48bad",
                "name": "疑似失联",
                "createDate": "2018-08-09",
                "updateDate": "2018-09-06",
                "amount": 6
            },
            {
                "id": "31329e1ec5fe42ee813f746146c2f8fd",
                "name": "自杀倾向",
                "createDate": "2018-09-05",
                "updateDate": "2018-09-06",
                "amount": 3
            },
            {
                "id": "0d0b815b967a449fb4487901fa1742c3",
                "name": "疑似台独",
                "createDate": "2018-09-05",
                "updateDate": "2018-09-06",
                "amount": 3
            }
        ];
        this.setState({
            dataLists,
            total: dataLists.length
        })
    }
    saveAction = (name)=> {
        message.success("保存成功！");
        this.hideModal();
    }
    editorAction = (record)=> {
        this.setState({isEdit:true,editTag:record,visibleModel:true})
    }
    deleteAction = (id)=> {
        message.success("删除。。。！");
    }
    showModal = ()=> {
        this.setState({visibleModel:true})
    }
    hideModal = ()=> {
        this.setState({visibleModel:false,isEdit:false,editTag:{}})
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
            <Card>
                <Row>
                    <Col span={12}>
                        <div className="common-title">标签管理</div>
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
                    title={this.state.isEdit?"编辑标签":"新增标签"}
                    visible={this.state.visibleModel}
                    onCancel={this.hideModal}
                    onOk={this.saveAction}
                    name={this.state.editTag.name} />:null}
            </Card>
        )
    }
}

export default TagManage;
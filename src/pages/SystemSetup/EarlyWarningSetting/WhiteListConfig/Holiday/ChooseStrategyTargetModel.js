import React, { Component } from 'react'
import { Button, Input, Row, Col, message, Badge } from 'antd'
import MainModal from '@/common/components/MainModal'
import Table from '@/common/components/Table'

let columns = [{
    title: '序号',
    dataIndex: 'index',
    width: "8%"
}, {
    title: '预警策略名称',
    dataIndex: 'strategyName',
    width: "20%",
    render: (text) => {
    	return (
    		<span title={text}>{text}</span>
    	)
    }
}, {
    title: '预警策略对象',
    dataIndex: 'strategyTargetCollege',
    render: (text) => {
    	return (
    		<span title={text}>{text}</span>
    	)
    }
}, {
    title: '预警策略时间',
    dataIndex: 'dateTime',
    width: "20%",
    render:(text,record)=>{
        return record.startDate + '~' + record.endDate;
    }
}, {
    title: '状态',
    dataIndex: 'status',
    width: "10%",
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
}];

class ChooseStudentModel extends Component {
    state = {
        pageNum: 1,
        pageSize: 8,
        total: 0,
        dataLists: [],
        strategyName: undefined,
        selectedRowKeys:[],
        selectedRows:[],
        visible:false
    }
    componentWillMount(){
        if(this.props.selectedTarget){
            this.setState({
                selectedRowKeys:[this.props.selectedTarget.id],
                selectedRows:[this.props.selectedTarget]
            })
        }
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
            total:dataLists.length,
            visible:true
        })
    }
    onOk = ()=> {
        if(this.state.selectedRows[0]){
            this.props.onOk(this.state.selectedRows[0])
        } else {
            message.warn('请选择预警策略！')
        }
    }
    changePage = (page)=> {
        this.setState({pageNum:page},()=>this.getData())
    }
    rowClick = (record) => {
        this.setState({
            selectedRowKeys: [record.key],
            selectedRows: [record]
        })
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    }
    render() {
        const dataSource = this.state.dataLists || [];
        dataSource.forEach((item,index)=>{
            dataSource[index].key = item.id;
            dataSource[index].index = index + 1;
        })

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            type: 'radio',
            columnWidth: "0px",
            onChange: this.onSelectChange,
        };
        if(this.state.visible){
            return (
                <MainModal
                    title={this.props.title}
                    visible={true}
                    onCancel={this.props.onCancel}
                    centered
                    onOk={this.onOk}
                    width={1004}
                >
                    <Row style={{marginBottom:24}}>
                        <Col span={9}>
                            预警策略名称：<Input style={{width:246}} placeholder={'请输入预警策略名称'} value={this.state.strategyName} 
                                onChange={(e)=>this.setState({strategyName:e.target.value})}/>
                        </Col>
                        <Col span={12}>
                            <Button icon="search" type="primary" onClick={this.getData}>搜 索</Button>
                        </Col>
                    </Row>
                    <Table dataSource={dataSource} 
                        bordered
                        rowSelection={rowSelection}
                        columns={columns}
                        current={this.state.pageNum}
                        pagination
                        paginationStyle={{textAlign:'right'}}
                        size="small"
                        total={this.state.total}
                        changePage={this.changePage}
                        onRow={(record, index) => {
                            return {
                                onClick: () => this.rowClick(record, index),// 点击行
                            };
                        }} />
                </MainModal>
            )
        } else {
            return (<div></div>)
        }
        
    }
}
export default ChooseStudentModel;
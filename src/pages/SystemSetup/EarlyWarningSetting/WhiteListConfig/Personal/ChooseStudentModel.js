import React, { Component } from 'react'
import { Button, Input, Row, Col, message } from 'antd'
import MainModal from '@/common/components/MainModal'
import Table from '@/common/components/Table'

let columns = [{
    title: '序号',
    dataIndex: 'index',
    width: 80,
    align: 'center',
}, {
    title: '学号',
    dataIndex: 'studentNo',
    width: 200,
    align: 'center'
}, {
    title: '姓名',
    dataIndex: 'name',
    width: 250,
    align: 'center'
}, {
    title: '院系',
    dataIndex: 'collegeName',
    align: 'center'
}];

class ChooseStudentModel extends Component {
    state = {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        studentLists: [],
        studentNo: undefined,
        name: undefined,
        selectedRowKeys:[],
        selectedRows:[]
    }
    componentWillMount(){
        if(this.props.selectedStudent){
            this.setState({
                selectedRowKeys:[this.props.selectedStudent.studentNo],
                selectedRows:[this.props.selectedStudent]
            })
        }
        this.getData();
    }
    getData = () => {
        const studentLists = [
            {
                "studentNo": "131594206",
                "name": "何志一",
                "gender": "男",
                "idcard": "320112199510271617",
                "politicalStatus": "群众",
                "schoolYear": 2015,
                "collegeName": "机械工程学院(联合培养)",
                "collegeCode": "L40010",
                "majorName": "机械电子工程",
                "majorCode": "7101",
                "classCode": "2711501",
                "className": "机电1514",
                "status": "1",
                "nation": "汉族",
                "birthday": "1995-10-27",
                "degree": "2",
                "currentGrade": "2015",
                "graduateYear": "2019"
            },
            {
                "studentNo": "134413117",
                "name": "许金鹏",
                "gender": "男",
                "idcard": "320682199404256591",
                "politicalStatus": "共青团员",
                "schoolYear": 2014,
                "collegeName": "自动化学院(电气工程学院)",
                "collegeCode": "L40050",
                "majorName": "通信工程",
                "majorCode": "7302",
                "classCode": "2741403",
                "className": "通信1414",
                "status": "1",
                "nation": "汉族",
                "birthday": "1994-04-25",
                "degree": "2",
                "currentGrade": "2014",
                "graduateYear": "2018"
            },
            {
                "studentNo": "141594102",
                "name": "陈根亮",
                "gender": "男",
                "idcard": "320723199504254011",
                "politicalStatus": "共青团员",
                "schoolYear": 2014,
                "collegeName": "机械工程学院(联合培养)",
                "collegeCode": "L40010",
                "majorName": "机械电子工程",
                "majorCode": "7101",
                "classCode": "2711401",
                "className": "机电1414",
                "status": "1",
                "nation": "汉族",
                "birthday": "1995-04-25",
                "degree": "2",
                "currentGrade": "2014",
                "graduateYear": "2018"
            },
            {
                "studentNo": "141594103",
                "name": "陈金鹏",
                "gender": "男",
                "idcard": "320124199503062812",
                "politicalStatus": "共青团员",
                "schoolYear": 2014,
                "collegeName": "机械工程学院(联合培养)",
                "collegeCode": "L40010",
                "majorName": "机械电子工程",
                "majorCode": "7101",
                "classCode": "2711401",
                "className": "机电1414",
                "status": "1",
                "nation": "汉族",
                "birthday": "1995-03-06",
                "degree": "2",
                "currentGrade": "2014",
                "graduateYear": "2018"
            },
        ]
        this.setState({
            studentLists,
            total:studentLists.length
        })
    }
    onOk = ()=> {
        if(this.state.selectedRows[0]){
            this.props.onOk(this.state.selectedRows[0])
        } else {
            message.warn('请选择学生！')
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
        const dataSource = this.state.studentLists || [];
        dataSource.forEach((item,index)=>{
            dataSource[index].key = item.studentNo;
            dataSource[index].index = index + 1;
        })

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            type: 'radio',
            columnWidth: "0px",
            onChange: this.onSelectChange,
        };

        return (
            <MainModal
                title={this.props.title}
                visible={this.props.visible}
                centered
                onCancel={this.props.onCancel}
                onOk={this.onOk}
                width={1004}
            >
                <Row style={{marginBottom:24}}>
                    <Col span={5}>
                        学号：<Input style={{width:132}} placeholder={'请输入学号'} value={this.state.studentNo} 
                            onChange={(e)=>this.setState({studentNo:e.target.value})}/>
                    </Col>
                    <Col span={7}>
                        姓名：<Input style={{width:226}} placeholder={'请输入学生姓名'} value={this.state.name} 
                            onChange={(e)=>this.setState({name:e.target.value})}/>
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
    }
}
export default ChooseStudentModel;
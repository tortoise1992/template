import React from 'react';
import { Table } from 'antd';
// import { postAction } from './../../../axios';

class StudentTable extends React.Component{
    constructor (props) {
        super(props);
        this.state={
            columns: [
                {
                    title: '序号',
                    dataIndex: 'sortIndex',
                    width: '6%'
                }, {
                    title: '学号',
                    dataIndex: 'studentNo',
                    width: '15%'
                }, {
                    title: '姓名',
                    dataIndex: 'name',
                    width: '15%'
                }, {
                    title: '性别',
                    dataIndex: 'gender',
                    width: '6%'
                }, {
                    title: '专业',
                    dataIndex: 'majorName',
			        render: (text) => {
			        	return (
			        		<span title={text}>{text}</span>
			        	)
			        }
                }, {
                    title: '年级',
                    dataIndex: 'currentGrade',
                    width: '10%'
                }, {
                    title: '班级',
                    dataIndex: 'className',
                    width: '20%',
			        render: (text) => {
			        	return (
			        		<span title={text}>{text}</span>
			        	)
			        }
                }
            ],
            data: [ // table数据结构形式
                // {
                //     key: '1',
                //     sortIndex: "1",
                //     studentNo: "U20136789",
                //     name: '胡彦斌',
                //     gender: "男",
                //     majorName: "动力学",
                //     currentGrade: "2017",
                //     className: "20170103"
                // }
            ],
            pagination: {
                current: 1,
                pageSize: 10,
                total: null
            },
            selectedRowKeys:[],
            selectedRows:[]
        };
        this.handleTableChange = this.handleTableChange.bind(this);
        this.getData = this.getData.bind(this);
    }

    handleTableChange(page) {
        const {current, pageSize, total} = page;
        this.setState(
            ()=>{
                return {
                    pagination: {
                        current,
                        pageSize,
                        total
                    }
                }
            },
            () => {
                this.getData()
            }
        )
    }

    getData(){
        // const {year, college, major, classes, nameOrCode} = this.props;
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
        
        studentLists.forEach(
            (item, index) => {
                item.key= item.studentNo;
                item.sortIndex = (index - 0) + 1;
            }
        );
        this.setState({
            data: studentLists,
            pagination: {
                total: studentLists.length
            }
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps !== this.props){
            this.setState(
                () => {
                    return {
                        data:[],
                        pagination: {
                            current: 1,
                            pageSize: 10,
                            total: null
                        },
                        selectedRowKeys:[],
                        selectedRows:[]
                    }
                },
                () => {
                    this.getData()
                }
            )
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state) {
            return true
        } else {
            return false            
        }
    }

    componentDidMount(){
        this.getData()
    }

    render(){
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            type: 'radio',
            columnWidth: "40px",
            onChange: (selectedRowKeys, selectedRows)=>{
                this.setState(
                    () => {
                        return {
                            selectedRowKeys: selectedRowKeys,
                            selectedRows: selectedRows
                        }
                    },
                    () => { // 传递给父级组建
                        this.props.getStudentInfo(this.state.selectedRows)
                    }
                )
            }
        }
        return(
            <Table
                columns={this.state.columns}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                onChange={this.handleTableChange}
                bordered={true}
                rowSelection = {rowSelection}
                onRow={(record) => {// 点击行, 获取行信息
                    return {
                        onClick: () => {
                            this.setState(
                                () => {
                                    return {
                                        selectedRowKeys: [record.key],
                                        selectedRows: [record]
                                    }
                                },
                                () => { // 传递给父级组建
                                    this.props.getStudentInfo(this.state.selectedRows)
                                }
                            )
                        } 
                    };
                }} 
                size="small"
                scroll={{ y: 280 }}
            />
        );
    }
}

export default StudentTable;




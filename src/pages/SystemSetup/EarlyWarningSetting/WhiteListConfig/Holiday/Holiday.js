import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Row, Col, Button, message, Popconfirm, Select } from 'antd'
import Table from '@/common/components/Table'
import MainModal from '@/common/components/MainModal'
const Option = Select.Option;

const collegeLists = [
    {
        "collegeName": "机械工程学院",
        "collegeCode": "40010",
    },
    {
        "collegeName": "计算机工程学院",
        "collegeCode": "40070",
    },
    {
        "collegeName": "通信工程学院",
        "collegeCode": "40060",
    },
    {
        "collegeName": "自动化学院",
        "collegeCode": "40050",
    },
    {
        "collegeName": "外国语学院",
        "collegeCode": "40141",
    },
    {
        "collegeName": "材料工程学院",
        "collegeCode": "40020",
    },
    {
        "collegeName": "电力工程学院",
        "collegeCode": "40040",
    },
    {
        "collegeName": "能源与动力工程学院",
        "collegeCode": "40030",
    },
    {
        "collegeName": "经济与管理学院",
        "collegeCode": "40081",
    },
    {
        "collegeName": "人文与社会科学学院",
        "collegeCode": "40131",
    },
    {
        "collegeName": "艺术与设计学院",
        "collegeCode": "40100",
    },
    {
        "collegeName": "建筑工程学院",
        "collegeCode": "40090",
    },
    {
        "collegeName": "汽车与轨道交通学院",
        "collegeCode": "40111",
    },
    {
        "collegeName": "环境工程学院",
        "collegeCode": "40121",
    },
    {
        "collegeName": "工业中心",
        "collegeCode": "40171",
    },
    {
        "collegeName": "康尼学院",
        "collegeCode": "40210",
    },
    {
        "collegeName": "国际合作与交流处",
        "collegeCode": "10110",
    },
    {
        "collegeName": "机械工程学院(联合培养)",
        "collegeCode": "L40010",
    },
    {
        "collegeName": "建筑工程学院(路桥与港航工程学联合培养)",
        "collegeCode": "L40090",
    },
    {
        "collegeName": "自动化学院(电气工程学院)",
        "collegeCode": "L40050",
    }
]

class Holiday extends Component {
    constructor(props){
        super(props);
        let columns = [{
            title: '序号',
            dataIndex: 'index',
            width: '6%'
        }, {
            title: '预警策略名称',
            dataIndex: 'strategyName',
            width: '20%',
            render: (text) => {
            	return (
            		<span title={text}>{text}</span>
            	)
            }
        }, {
            title: '不预警院系',
            dataIndex: 'strategyTargetCollege',
            width: '20%',
            render: (text) => {
            	return (
            		<span title={text}>{text}</span>
            	)
            }
        }, {
            title: '备注',
            dataIndex: 'remark',
            render: (text) => {
            	return (
            		<span title={text}>{text}</span>
            	)
            }
        }, {
            title: '更新时间',
            dataIndex: 'updateDate',
            width: '15%'
        }, {
            title: '操作',
            dataIndex: 'handle',
            width: '15%',
            render: (text, record)=>(
                <div>
                    <a style={{color:'#309cff',marginRight:10}} onClick={()=>{
                        this.props.history.push('/mainframe/systemsetup/earlywarningwhitelist/holiday/addoredit?id='+record.id)
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
            detailInfo:{},
            //搜索参数
            collegeCode: null,
            collegeLists: []
        })
    }
    componentWillMount(){
        this.getCollegeLists();
        this.getData();
    }
    //获取学院列表
    getCollegeLists(){
        this.setState({ collegeLists:collegeLists });
    }
    //获取数据列表
    getData = () => {
        // let { collegeCode } = this.state;
        const dataLists = [
            {
                "id": "519ad5a12dea47a4997da7abf160734b",
                "strategyId": "01816d0dd27f4da9816c7003b7ae3aed",
                "strategyTarget": "40070,40050,40141,40020",
                "strategyDate": "2018-09-13~2018-09-21,2018-09-11~2018-09-12",
                "remark": "handle_remarkhandle_remark",
                "createDate": "2018-09-10",
                "updateDate": "2018-09-10",
                "strategyName": "预警策略名称重复校验",
                "strategyTargetCollege": "计算机工程学院、自动化学院、外国语学院、材料工程学院"
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
            "id": "519ad5a12dea47a4997da7abf160734b",
            "strategyId": "01816d0dd27f4da9816c7003b7ae3aed",
            "strategyTarget": "40070,40050,40141,40020",
            "strategyDate": "2018-09-13~2018-09-21,2018-09-11~2018-09-12",
            "remark": "handle_remarkhandle_remark",
            "createDate": "2018-09-10",
            "updateDate": "2018-09-10",
            "strategyName": "预警策略名称重复校验",
            "strategyTargetCollege": "计算机工程学院、自动化学院、外国语学院、材料工程学院",
        };
        this.setState({
            showDetail: true,
            detailInfo:Object.assign({},detailInfo,record)
        })
    }
    changeFilter = (collegeCode)=> {
        this.setState({collegeCode},()=>this.getData())
    }
    render() {
        const dataSource = this.state.dataLists || [];
        dataSource.forEach((item,index)=>{
            dataSource[index].key = index;
            dataSource[index].index = index + 1;
        })
        return (
            <Card 
                className={this.props.className}
                title={(
                    <Row>
                        <Col span={12}>
                            {this.props.tabs}
                        </Col>
                        <Col span={12} style={{textAlign:'right'}}>
                            <Button icon={'usergroup-add'} type="primary" size="large" onClick={()=>{
                                this.props.history.push('/mainframe/systemsetup/earlywarningwhitelist/holiday/addoredit')
                            }}>添 加</Button>
                        </Col>
                    </Row>
                )}>
                <div style={{marginBottom:24}}>
                    选择院系：
                    <Select className="mr-10" style={{width:178}}
                        placeholder="选择学院"
                        value={this.state.collegeCode}
                        onChange={(value) => { this.changeFilter(value) }}>
                        {this.state.collegeLists.length>0?<Option key={'all'} value={null}>全部</Option>:null}
                        {this.state.collegeLists.map((item, index) => <Option key={index} value={item.collegeCode}>{item.collegeName}</Option>)}
                    </Select>
                </div>
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
                {this.state.showDetail?(
                    <MainModal
                        title={'查看详情'}
                        visible={this.state.showDetail}
                        onCancel={()=>this.setState({showDetail:false})}
                        width={656}
                        noFooter={true}
                    >
                        <div className="ewc-detailModel">
                            <Row><Col span={8}>关联的预警策略</Col><Col span={16}>{this.state.detailInfo.strategyName}</Col></Row>
                            <Row style={{height:102}}>
                                <Col span={8}><Row type="flex" align="middle" justify="center">不预警对象</Row></Col>
                                <Col span={16}>
                                    <Row type="flex" align="middle" style={{overflowY:'auto'}}>
                                        {this.state.detailInfo.strategyTargetCollege}
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={{height:132}}>
                                <Col span={8}>
                                    <Row type="flex" align="middle" justify="center">不预警时间</Row>
                                </Col>
                                <Col span={16}>
                                    <Row type="flex" align="middle" style={{overflowY:'auto'}}>
                                        {this.state.detailInfo.strategyDate.split(',').map((item,i)=>(<Col key={i} span={24}>{item}</Col>))}
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={{height:102}}>
                                <Col span={8}><Row type="flex" align="middle" justify="center">备注</Row></Col>
                                <Col span={16}>
                                    <Row type="flex" align="middle" style={{overflowY:'auto'}}>
                                        {this.state.detailInfo.remark}
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </MainModal>
                ):null}
            </Card>
        )
    }
}

export default withRouter(Holiday)
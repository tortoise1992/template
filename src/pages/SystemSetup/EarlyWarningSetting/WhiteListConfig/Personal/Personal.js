import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Input, Button, message, Popconfirm, Badge, Tooltip, Select } from 'antd'
import Table from '@/common/components/Table'
import MainModal from '@/common/components/MainModal'
import UploadModel from './UploadModel'
// import { hostUrl } from '../../../../../env'
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

const majorLists = [
    { "majorName": "机械工程", "majorCode": "0101" }, 
    { "majorName": "机械设计制造及其自动化(流体传动与控制)(卓越工程师计划)", "majorCode": "0112"},
    {  "majorName": "机械电子工程", "majorCode": "0110" }
]

class Personal extends Component {
    constructor(props){
        super(props);
        let columns = [{
            title: '序号',
            dataIndex: 'index',
            width: '6%'
        }, {
            title: '学号',
            dataIndex: 'studentNo',
            width: '10%',
            render: (text) => {
            	return (
            		<span title={text}>{text}</span>
            	)
            }
        }, {
            title: '姓名',
            dataIndex: 'name',
            width: '10%',
            render: (text) => {
            	return (
            		<span title={text}>{text}</span>
            	)
            }
        }, {
            title: '性别',
            dataIndex: 'gender',
            width: '6%'
        }, {
            title: '院系',
            dataIndex: 'collegeName',
            width: '15%',
            render: (text) => {
            	return (
            		<span title={text}>{text}</span>
            	)
            }
        }, {
            title: '不预警模块',
            dataIndex: 'alarmType',
            width: '15%',
            render: (text) => {
            	return (
            		<span title={text}>{text}</span>
            	)
            }
        }, {
            title: '备注',
            dataIndex: 'remark',
            width: '12%',
            render: (text) => {
            	return (
            		<span title={text}>{text}</span>
            	)
            }
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
            width: '15%',
            render: (text, record)=>(
                <div>
                    <a style={{color:'#309cff',marginRight:10}} onClick={()=>{
                        this.props.history.push('/mainframe/systemsetup/earlywarningwhitelist/personal/addoredit?id='+record.id)
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
            isImport: false,
            //搜索参数
            studentNo: undefined,
            gender: undefined,
            majorCode: undefined,
            collegeCode: null,
            classCode: undefined,
            collegeLists: [],
            majorLists: [],
            classLists: [],
            genderLists: ['男','女']
        })
    }
    componentWillMount(){
        this.getCollegeLists();
        this.getData();
    }
    //学院
    getCollegeLists(){
        this.setState({ collegeLists:collegeLists });
    }
    //专业
    getMajorLists(collegeCode){
        if(collegeCode===null){
            this.setState({ majorLists: [] });
            return;
        }
        this.setState({ majorLists: majorLists });
    }
    changeFilter(value, teamType) {
        switch (teamType) {
            case 1:
                this.setState({ collegeCode: value, majorCode: undefined },()=>this.getMajorLists(value)); break;
            case 2:
                this.setState({ majorCode: value }); break;
            case 3:
                this.setState({ gender: value }); break;
            case 4:
                this.setState({ studentNo: value }); break;
            default:
                break;
        }
    }
    getData = () => {
        //let { collegeCode, majorCode, classCode, gender, studentNo } = this.state;
        const dataLists = [
            {
                "id": "c93692c0ca10464b919237de9eb2cc7a",
                "studentNo": "131594206",
                "remark": "1212",
                "startDate": "2018-09-14",
                "endDate": "2018-10-23",
                "alarmType": "失联,学业",
                "name": "何志一",
                "gender": "男",
                "collegeName": "机械工程学院(联合培养)",
                "status": "未开始"
            }
        ];
        this.setState({
            dataLists: dataLists,
            total: dataLists.length
        })
    }
    deleteAction = (id)=> {
        //let data = { id }
        message.error("删除失败！");
    }
    changePage = (page)=> {
        this.setState({pageNum:page},()=>this.getData())
    }
    rowClick = (record)=> {
        // let data = {id:record.id}
        let detailInfo = {
            "id": "c93692c0ca10464b919237de9eb2cc7a",
            "studentNo": "131594206",
            "missAlarm": 1,
            "networkAlarm": 0,
            "studyAlarm": 1,
            "consumeAlarm": 0,
            "remark": "1212",
            "startDate": "2018-09-14",
            "endDate": "2018-10-23",
            "name": "何志一",
            "gender": "男",
            "collegeName": "机械工程学院(联合培养)"
        };
        this.setState({
            showDetail: true,
            detailInfo:Object.assign({},detailInfo,record)
        })
    }
    importAction = ()=> {
        this.setState({isImport:false},()=>{
            this.getData();
        })
    }
    searchAction = ()=> {
        // const { collegeCode, majorCode, gender, studentNo} = this.state;
        // console.log(collegeCode, majorCode, gender, studentNo)
        this.getData();
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
                        <Col span={12} style={{textAlign:'right',paddingTop:5}}>
                            <Tooltip placement="top" title="添加" overlayClassName={'common-tooltip'}>
                                <span style={{marginRight:12,fontSize:20}} 
                                    className="iconfont icon-btn icon-tianjiachengyuan" onClick={()=>{
                                        this.props.history.push('/mainframe/systemsetup/earlywarningwhitelist/personal/addoredit')
                                    }}></span>
                            </Tooltip>
                            <Tooltip placement="top" title="导入" overlayClassName={'common-tooltip'} onClick={()=>this.setState({isImport:true})}>
                                <span style={{marginRight:12}} className="iconfont icon-btn icon-wenjiandaoru"></span>
                            </Tooltip>
                            {/* <Tooltip placement="top" title="下载" overlayClassName={'common-tooltip'}>
                                <span style={{fontSize:20}} className="iconfont icon-btn icon-msnui-download" onClick={()=>{
                                    window.location.href = hostUrl+'/bigdata/alarmWhitelist/downloadWhitelistTemplate';
                                }}></span>
                            </Tooltip> */}
                        </Col>
                    </Row>
                )}>
                {this.state.isImport?(
                    <UploadModel
                        visible={this.state.isImport}
                        action={'/bigdata/alarmWhitelist/uploadWhitelistFile'}
                        onCancel={()=>this.setState({isImport:false})}
                        onOk={this.importAction}
                    />
                ):null}
                <div style={{marginBottom:24}}>
                    筛选条件：
                    <Select className="mr-10" style={{width:178,marginRight:10}}
                        placeholder="选择学院"
                        value={this.state.collegeCode}
                        onChange={(value) => { this.changeFilter(value, 1) }}>
                        {this.state.collegeLists.length>0?<Option key={'all'} value={null}>全部</Option>:null}
                        {this.state.collegeLists.map((item, index) => <Option key={index} value={item.collegeCode}>{item.collegeName}</Option>)}
                    </Select>
                    <Select className="mr-10" style={{width:178,marginRight:10}}
                        placeholder="选择专业"
                        value={this.state.majorCode}
                        onChange={(value) => { this.changeFilter(value, 2) }}>
                        {this.state.majorLists.length>0?<Option key={'all'} value={null}>全部</Option>:null}
                        {this.state.majorLists.map((item, index) => <Option key={index} value={item.majorCode}>{item.majorName}</Option>)}
                    </Select>
                    <Select className="mr-10" style={{width:178,marginRight:10}}
                        placeholder="性别"
                        value={this.state.gender}
                        onChange={(value) => { this.changeFilter(value, 3) }}>
                        <Option key={'all'} value={null}>全部</Option>
                        {this.state.genderLists.map((item, index) => <Option key={index} value={item}>{item}</Option>)}
                    </Select>
                    <Input placeholder="请输入学生姓名/学号" 
                        style={{width:172,marginRight:10}}
                        value={this.state.studentNo} 
                        onChange={(e) => { this.changeFilter(e.target.value, 4) }} />
                    <Button icon="search" type="primary" onClick={this.searchAction}>搜 索</Button>
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
                            <Row><Col span={8}>姓名/学号</Col><Col span={16}>{this.state.detailInfo.studentNo+'，'+this.state.detailInfo.name}</Col></Row>
                            <Row><Col span={8}>所属院系</Col><Col span={16}>{this.state.detailInfo.collegeName}</Col></Row>
                            <Row><Col span={8}>性别</Col><Col span={16}>{this.state.detailInfo.gender}</Col></Row>
                            <Row><Col span={8}>不预警时间</Col><Col span={16}>{this.state.detailInfo.startDate + '～' + this.state.detailInfo.endDate}</Col></Row>
                            <Row><Col span={8}>不预警模块</Col><Col span={16}>{this.state.detailInfo.alarmType}</Col></Row>
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

export default withRouter(Personal)
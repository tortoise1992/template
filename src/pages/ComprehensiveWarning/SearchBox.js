import React, { Component } from 'react';
import { Row, Col, Select, Button, Input, DatePicker } from 'antd'
import SelectYear from '@/common/components/SelectYear/SelectYear';
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

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

class SearchBox extends Component {
    constructor(props) {
        super(props);
        // let year = undefined;//new Date().getFullYear()
        let typeLists = [
            { code: null, name: '全部' },
            { code: 1, name: '失联预警' },
            { code: 3, name: '学业预警' },
            { code: 2, name: '网络预警' },
            { code: 4, name: '消费预警' },
        ];
        let levelLists = [
            { code: null, name: '全部' },
            { code: 1, name: '红色预警' },
            { code: 2, name: '橙色预警' },
            { code: 3, name: '黄色预警' },
            { code: 4, name: '蓝色预警' }
        ];
        let statusLists = [
            { code: null, name: '全部' },
            { code: 0, name: '未处理' },
            { code: 1, name: '已处理' },
            { code: 'mark', name: '旗标预警' }
        ];
        this.state = ({
            collegeLists: [],
            majorLists: [],
            studentTypeLists: [],
            typeLists,
            levelLists,
            statusLists,
            college: null,
            major: undefined,
            studentType: undefined,
            year: undefined,
            type: null,
            level: null,
            status: null,
            flag: undefined,
            studentNo: undefined,
            startDate: undefined,
            endDate: undefined,
            filter: {
                year: undefined,
            }
        });
    }
    componentWillMount() {
        this.getCollegeLists();
    }
    getCollegeLists() {
        this.setState({ collegeLists: collegeLists });
    }
    getMajorLists(collegeCode) {
        if (collegeCode === null) {
            this.setState({ majorLists: [] });
            return;
        }
        // let data = {collegeCode}
        // postAction('/bigdata/school/listMajorByCollege',data).then(res=>{
        //     if(res.success){
        //         this.setState({ majorLists:res.obj });
        //     }
        // })
        this.setState({ majorLists: majorLists });
    }
    changeFilter(value, teamType) {
        switch (teamType) {
            case 0:
                this.setState({ year: value }); break;
            case 1:
                this.setState({ college: value, major: undefined }, () => this.getMajorLists(value)); break;
            case 2:
                this.setState({ major: value }); break;
            case 3:
                this.setState({ studentType: value }); break;
            case 4:
                this.setState({ type: value }); break;
            case 5:
                this.setState({ level: value }); break;
            case 6:
                if (value === 'mark') {
                    this.setState({ flag: 1, status: value });
                } else {
                    this.setState({ status: value, flag: null });
                }
                break;
            case 7:
                this.setState({ studentNo: value }); break;
            case 8:
                this.setState({ startDate: value[0], endDate: value[1] }); break;
            default:
                break;
        }
    }
    searchAction() {
        const {
            year,
            college: collegeCode,
            major: majorCode,
            type: alarmType,
            level: alarmLevel,
            status,
            flag,
            studentNo,
            startDate,
            endDate } = this.state;
        let filter = { year, collegeCode, majorCode, alarmType, alarmLevel, status: status === 'mark' ? undefined : status, flag, studentNo, startDate, endDate };
        // console.log(filter)
        this.props.refreshData(filter);
        // this.setState({
        //     filter
        // })
    }
    render() {

        return (
            <div>
                <Row>
                    <Col span={8}>
                        <Row type={'flex'} align={'middle'}>
                            <Col span={8} className="text-center">年级:</Col>
                            <Col span={16}>
                                <SelectYear className="mr-10"
                                    years={5}
                                    style={{ width: '100%' }}
                                    placeholder={'选择年级'}
                                    unit={'级'}
                                    defaultYear={this.state.year}
                                    handleChange={(value) => this.changeFilter(value, 0)} />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row type={'flex'} align={'middle'}>
                            <Col span={8} className="text-center">学院:</Col>
                            <Col span={16}>
                                <Select className="mr-10" style={{ width: '100%' }}
                                    placeholder="选择学院"
                                    value={this.state.college}
                                    onChange={(value) => { this.changeFilter(value, 1) }}>
                                    {this.state.collegeLists.length > 0 ? <Option key={'all'} value={null}>全部</Option> : null}
                                    {this.state.collegeLists.map((item, index) => <Option key={index} value={item.collegeCode}>{item.collegeName}</Option>)}
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row type={'flex'} justify={'center'} align={'middle'}>
                            <Col span={8} className="text-center">专业:</Col>
                            <Col span={16}>
                                <Select className="mr-10" style={{ width: '100%' }}
                                    placeholder="选择专业"
                                    value={this.state.major}
                                    onChange={(value) => { this.changeFilter(value, 2) }}>
                                    {this.state.majorLists.length > 0 ? <Option key={'all'} value={null}>全部</Option> : null}
                                    {this.state.majorLists.map((item, index) => <Option key={index} value={item.majorCode}>{item.majorName}</Option>)}
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    {/* <Col span={6}>
                        <Row type={'flex'} justify={'center'} align={'middle'}>
                            <Col span={8} className="text-center">学生类型:</Col>
                            <Col span={16}>
                                <Select className="mr-10" style={{ width: '100%' }}
                                    placeholder="选择学生类型"
                                    value={this.state.studentType}
                                    onChange={(value) => { this.changeFilter(value, 3) }}>
                                    {this.state.studentTypeLists.length>0?<Option key={'all'} value={null}>全部</Option>:null}
                                    {this.state.studentTypeLists.map((item, index) => <Option key={index} value={item.teamId}>{item.name}</Option>)}
                                </Select>
                            </Col>
                        </Row>
                    </Col> */}
                </Row>
                <Row style={{ marginTop: 16 }}>
                    <Col span={8}>
                        <Row type={'flex'} justify={'center'} align={'middle'}>
                            <Col span={8} className="text-center">预警类别:</Col>
                            <Col span={16}>
                                <Select className="mr-10" style={{ width: '100%' }}
                                    placeholder="选择预警类别"
                                    value={this.state.type}
                                    onChange={(value) => { this.changeFilter(value, 4) }}>
                                    {this.state.typeLists.map((item, index) => <Option key={index} value={item.code}>{item.name}</Option>)}
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row type={'flex'} justify={'center'} align={'middle'}>
                            <Col span={8} className="text-center">预警级别:</Col>
                            <Col span={16}>
                                <Select className="mr-10" style={{ width: '100%' }}
                                    placeholder="选择预警级别"
                                    value={this.state.level}
                                    onChange={(value) => { this.changeFilter(value, 5) }}>
                                    {this.state.levelLists.map((item, index) => <Option key={index} value={item.code}>{item.name}</Option>)}
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row type={'flex'} justify={'center'} align={'middle'}>
                            <Col span={8} className="text-center">预警状态:</Col>
                            <Col span={16}>
                                <Select className="mr-10" style={{ width: '100%' }}
                                    placeholder="选择预警状态"
                                    value={this.state.status}
                                    onChange={(value) => { this.changeFilter(value, 6) }}>
                                    {this.state.statusLists.map((item, index) => <Option key={index} value={item.code}>{item.name}</Option>)}
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginTop: 16 }}>
                    <Col span={8}>
                        <Row type={'flex'} justify={'center'} align={'middle'}>
                            <Col span={8} className="text-center">学号/姓名:</Col>
                            <Col span={16}>
                                <Input className="mr-10"
                                    value={this.state.studentNo}
                                    style={{ width: '100%' }}
                                    placeholder="请输入学生学号或姓名"
                                    onChange={(e) => { this.changeFilter(e.target.value, 7) }} />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={16}>
                        <Row type={'flex'} justify={'center'} align={'middle'}>
                            <Col span={4} className="text-center">时间:</Col>
                            <Col span={16}>
                                <RangePicker
                                    style={{ width: '100%' }}
                                    onChange={(moment, values) => {
                                        this.changeFilter(values, 8)
                                    }} />
                            </Col>
                            <Col span={4} className={"text-right"}>
                                <Button icon="search" type={'primary'} onClick={() => this.searchAction()}>搜索</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SearchBox;
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Breadcrumb } from 'antd';
import CurEarlyWarnings from './CurEarlyWarnings';
import LineChartCard from '@/common/components/BizChartsCard/LineChartCard';
import Info from './Info';

class EarlyWarningDetail extends Component {
    state = {
        studentInfo:{},
        studentNo:undefined,
        historyAlarms:[]
    }
    componentWillMount() {
        if(this.props.match.params && this.props.match.params.id){
            let studentNo = this.props.match.params.id;
            this.setState({studentNo},()=>{
                this.getData(studentNo);
            });
        }
    }
    getData(studentNo){
        // let data = {studentNo}
        //学生信息
        this.setState({
            studentInfo: {"studentNo":"202150636","name":"张江儒","gender":"男","idcard":"520181199708180454","politicalStatus":"共青团员","schoolYear":2016,"collegeName":"计算机工程学院","collegeCode":"40070","majorName":"数字媒体技术","majorCode":"0213","classCode":"2021604","className":"数字媒体161","status":"1","nation":"彝族","birthday":"1997-08-18","degree":"2","currentGrade":"2016","graduateYear":"2020"}
        })
        //历史预警
        let historyAlarms = [
            {
                "createMonth": "2017-09",
                "alarmMiss": 1,
                "alarmNetwork": 1,
                "alarmConsume": 1
            },
            {
                "createMonth": "2017-10",
                "alarmMiss": 1,
                "alarmNetwork": 1,
                "alarmConsume": 1
            },
            {
                "createMonth": "2017-11",
                "alarmMiss": 1,
                "alarmNetwork": 0,
                "alarmConsume": 2
            },
            {
                "createMonth": "2017-12",
                "alarmMiss": 1,
                "alarmNetwork": 1,
                "alarmConsume": 1
            },
            {
                "createMonth": "2018-01",
                "alarmMiss": 1,
                "alarmNetwork": 1,
                "alarmConsume": 1
            },
            {
                "createMonth": "2018-02",
                "alarmMiss": 1,
                "alarmNetwork": 1,
                "alarmConsume": 1
            },
            {
                "createMonth": "2018-03",
                "alarmMiss": 2,
                "alarmNetwork": 1,
                "alarmConsume": 1
            },
            {
                "createMonth": "2018-04",
                "alarmMiss": 1,
                "alarmNetwork": 1,
                "alarmConsume": 1
            },
            {
                "createMonth": "2018-05",
                "alarmMiss": 1,
                "alarmNetwork": 1,
                "alarmConsume": 2
            },
            {
                "createMonth": "2018-06",
                "alarmMiss": 1,
                "alarmNetwork": 1,
                "alarmConsume": 1
            },
            {
                "createMonth": "2018-07",
                "alarmMiss": 1,
                "alarmNetwork": 1,
                "alarmConsume": 0
            },
            {
                "createMonth": "2018-08",
                "alarmMiss": 0,
                "alarmNetwork": 0,
                "alarmConsume": 0
            }
        ];
        historyAlarms = historyAlarms.map(item=>{
            return {
                date: item.createMonth,
                '失联预警': item.alarmMiss,
                '网络': item.alarmNetwork,
                '消费': item.alarmConsume,
            }
        })
        this.setState({historyAlarms})

    }
    render(){
        const data = this.state.historyAlarms || [];
        return (
            <div>
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>综合预警</Breadcrumb.Item>
                    <Breadcrumb.Item>预警详情</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <Row gutter={20} type={'flex'}>
                        <Col sm={16} xl={17} xxl={18}>
                            <CurEarlyWarnings studentNo={this.state.studentNo}/>
                            <div style={{marginTop:20}}>
                                <LineChartCard style={{height:382}}
                                    title={(
                                        <div className="common-title">历史预警<span>（单位：次）</span></div>
                                    )}
                                    data={data}
                                    height={304}
                                    transpose={true}
                                    colors={['#e06950','#4ed8da','#f0c757','#4a90e2','#c04dd8']}
                                />
                            </div>
                        </Col>
                        <Col sm={8} xl={7} xxl={6}>
                            <Card style={{height:'100%'}}>
                                <Info studentInfo={this.state.studentInfo}/>
                            </Card>
                        </Col>
                    </Row>
                </div>
                
            </div>
        )
    }
}

export default withRouter(EarlyWarningDetail);
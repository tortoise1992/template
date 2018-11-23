import React, {Component} from 'react';
import {Card, Badge, Row, Col} from 'antd';


class LearningWarn extends Component{
    render () {
        return (
            <Card title="学业预警" type="inner">
                <Row>
                    <Col span={9} style={{textAlign:'right'}}>
                        <Badge status="error" text="红色预警" />&nbsp;&nbsp;
                    </Col>
                    <Col span={15} style={{textAlign:'left'}}>
                        <span>1、在校期间累计不及格达15学分者；</span><br/>
                        <span>2、一年级学生，任一学期累计不及格达10学分者；</span><br/>
                        <span>3、毕业班学生，在校最后一个学期仍有不及格课程者；</span><br/>
                        <span>4、毕业班学生，在校最后一个学期公共选修课未达学校规定要求者；</span>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default LearningWarn
/**
 * Created by hutao on 2018/7/11.
 */
import React, {Component} from 'react';
import './style.less';
import boyPng from './student-b.png'
import girlPng from './student-g.png'

class Info extends Component {
    render() {
        const studentInfo = this.props.studentInfo || {};
        const avatarPng = studentInfo.gender === '男'?boyPng:girlPng;
        return (
            <div className={'stuInfoContent'} style={this.props.style}>
                <div className={'avatarBox'}>
                    <img src={avatarPng} alt="头像"/>
                    <h4 style={{marginTop:10}}>{studentInfo.name}</h4>
                </div>
                <p style={{marginTop:20}}>性别<span>{studentInfo.gender}</span></p>
                <p>学号<span>{studentInfo.studentNo}</span></p>
                <p>学院<span>{studentInfo.collegeName}</span></p>
                <p>专业<span>{studentInfo.majorName}</span></p>
                <p>班级<span>{studentInfo.className}</span></p>
                <p>民族<span>{studentInfo.nation}</span></p>
                <p>出生日期<span>{studentInfo.birthday}</span></p>
                <p>政治面貌<span>{studentInfo.politicalStatus}</span></p>
                <p>籍贯<span>{studentInfo.nativePlace}</span></p>
                <p>入学时间<span>{studentInfo.schoolYear}</span></p>
                <p>毕业时间<span>{studentInfo.graduateYear}</span></p>
            </div>
        );
    }
}

export default Info;

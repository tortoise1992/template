import React from 'react';
import { Input, Button, Icon, DatePicker, message } from 'antd';
import StudentSelect from './StudentSelect/index';

class Filter extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            date: "", // 选择的日期
            name: '', // 选择的学生
            studentNo: "", // 选择的学生的学号
            show: false, // 控制选择学生弹出框
            selectedStudentInfo: [] // 选择的学生的所有信息
        };
        this.dateChange = this.dateChange.bind(this); // 变更日期
        this.showJump = this.showJump.bind(this); // 显示选择学生弹出框
        this.hideJump = this.hideJump.bind(this); // 隐藏选择学生弹出框
        this.getInfo = this.getInfo.bind(this); // 变更选择的学生名称
        this.searchPath = this.searchPath.bind(this); // 点击搜索按钮， 查询轨迹
    }

    searchPath(){

        if (!this.state.date) { // 没有选择日期
            message.warn("请选择查询日期")
            return
        }

        if (!this.state.studentNo) { //没有选择学员
            message.warn("请选择学生!")
            return
        }

        let obj = {
            name: this.state.name, // 选择的学生
            studentNo: this.state.studentNo, // 选择的学生的学号
            date: this.state.date // 选择的日期
        }

        this.props.getInfo(obj)

    }

    dateChange(date, dateString) { // 变更日期
        this.setState({
            date: dateString
        })
    }

    showJump() { // 显示弹出框，选择学生
        this.setState({
            show: true
        })
    }

    hideJump() { // 隐藏选择学生弹出框
        this.setState({
            show: false
        })
    }

    getInfo(ary){ //变更选择的学生信息
        // console.log(ary);
        this.setState({
            selectedStudentInfo: ary,
            name: ary[0].name,
            studentNo: ary[0].studentNo
        })
    }

    render () {
        return (
            <div style={{padding: "10px 20px", borderBottom: "1px solid #ccc"}}>
                <span>选择条件：</span>

                <DatePicker onChange={this.dateChange} style={{marginRight: 10}} />

                <Input
                    style={{width: 120, marginRight: 10}}
                    placeholder="选择学生"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    value={this.state.name}
                    onClick={this.showJump}
                />
                
                <Button type="primary" icon="search" onClick={this.searchPath}>搜索</Button>

                {
                    this.state.show ? <StudentSelect getInfo={this.getInfo} hideJump={this.hideJump} /> : null
                }

            </div>
        )
    }
}

export default Filter;

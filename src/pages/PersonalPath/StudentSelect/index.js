import React from 'react';
import { message } from 'antd';
import Filter from './Filter';
import StudentTable from './StudentTable';
import MainModal from './../../../common/components/MainModal';

const curYear = new Date().getFullYear();
var  selectedStudent = [];

class StudentSelect extends React.Component{

    constructor(props){
        super(props);
        this.state={
            filterObj: {
                year: curYear,
                college: "", 
                major: "", 
                classes:  "", 
                nameOrCode: ""
            }
        };
        this.handleSure = this.handleSure.bind(this);//点击确定按钮
        this.filterObj = this.filterObj.bind(this);//筛选条件
        this.getStudentInfo = this.getStudentInfo.bind(this); // 获取选择的学生信息
        this.handleCancel = this.handleCancel.bind(this); // 点击取消...关闭弹出框
    }

    handleCancel(){
        selectedStudent = [];
        this.props.hideJump();
    }

    handleSure(){ //点击确定按钮
        if (!selectedStudent || selectedStudent.length <= 0) {
            message.warn("请选择学生！");
            return
        } else {
            this.props.getInfo(selectedStudent) //将选择的学生信息传递给父组件
            this.props.hideJump(); // 操作完成， 关闭弹窗
        }
    }
    
    filterObj(obj){ // 获取筛选条件
        this.setState({
            filterObj: obj
        })
    }

    // 从表单table中回去选中的学生信息
    getStudentInfo(ary){ // obj为选择学生的所有信息
        // console.log(ary);
        selectedStudent = ary;
    }

    render () {
        return (
            <MainModal title="选择学生" okText='确定' visible={true} onCancel={this.handleCancel} onOk={this.handleSure} width={"80%"} style={{ top: 20, marginBottom: 0 }} >
                <Filter filterObj={this.filterObj} />
                <StudentTable {...this.state.filterObj} getStudentInfo={this.getStudentInfo} />
            </MainModal>
        )
    }
}

export default StudentSelect;

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb, Card, Form, DatePicker, Input, Button, Icon, Row, Col, Checkbox, message } from 'antd';
import ChooseStudentModel from './ChooseStudentModel'
import moment from 'moment';
import { getHashParam } from '../../../../../utils'

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const formItemLayout = {
    labelCol: { span: 10},
    wrapperCol: { span: 14, style:{paddingLeft:'10px'}},
};

const warnModules = [
    { label: '失联预警', value: 'missAlarm' },
    { label: '网络预警', value: 'networkAlarm' },
    { label: '学业预警', value: 'studyAlarm' },
    { label: '消费预警', value: 'consumeAlarm' },
];
const disabledDate = (current)=> {
    return current && current < moment().endOf('day');
}

const dateFormat = 'YYYY-MM-DD';

const studentStyle = { 
    width:258,height:58,borderRadius:4,
    border:'1px dashed #d9d9d9',cursor:'pointer',
    marginTop:-10,lineHeight:'20px',textAlign:'center'}

class AddOrEditPage extends Component {
    state = {
        visible: false,
        selectedStudent:undefined,
        editId:undefined,
        editInfo:undefined
    }
    componentWillMount(){
        let params = getHashParam();
        if(params.id){
            // let data = {id:params.id}
            this.setState({editId:params.id},()=>{
                //获取用户详细信息
                let data =  {
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
                let warnModule = [
                    data.missAlarm===1?'missAlarm':null,
                    data.networkAlarm===1?'networkAlarm':null,
                    data.studyAlarm===1?'studyAlarm':null,
                    data.consumeAlarm===1?'consumeAlarm':null
                ].filter(item=>item!==null);
                
                let editInfo = Object.assign({},{ warnModule },data) || {};
                this.setState({
                    editInfo,
                    selectedStudent:editInfo
                })
            })
        }
    }
    chooseStudent = (selectedStudent) => {
        this.setState({selectedStudent,visible:false})
        this.props.form.setFieldsValue({studentNo: selectedStudent.studentNo})
    }
    saveAction = () => {
        this.props.form.validateFields(
            (err,values) => {
                if (!err) {
                    const { studentNo, remark, warnModule, rangePicker } = values;
                    let missAlarm = warnModule.indexOf('missAlarm')>=0?1:0;
                    let networkAlarm = warnModule.indexOf('networkAlarm')>=0?1:0;
                    let studyAlarm = warnModule.indexOf('studyAlarm')>=0?1:0;
                    let consumeAlarm = warnModule.indexOf('consumeAlarm')>=0?1:0;
                    let data = {
                        studentNo,
                        missAlarm,
                        networkAlarm,
                        studyAlarm,
                        consumeAlarm,
                        remark,
                        startDate:rangePicker[0].format(dateFormat),
                        endDate:rangePicker[1].format(dateFormat)
                    }
                    if(this.state.editInfo){
                        data.id = this.state.editInfo.id;
                    }
                    message.success('保存成功！',1,()=>{
                        this.props.history.push('/mainframe/systemsetup/earlywarningsetting?whitelist')
                    });
                    
                }
            },
        );
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        let editInfo = this.state.editInfo;
        let selectedStudent = this.state.selectedStudent;
        return (
            <div>
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>综合预警</Breadcrumb.Item>
                    <Breadcrumb.Item>预警设置</Breadcrumb.Item>
                    <Breadcrumb.Item>预警白名单</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <Card title={<div className="common-title">{this.state.editId?'编辑个人白名单配置':'新增个人白名单配置'}</div>}>
                        <FormItem {...formItemLayout} style={{paddingTop:10}} label="选择学生">
                            {getFieldDecorator('studentNo', {
                                rules: [{
                                    required: true,
                                    message: '请选择学生！'
                                }],
                                initialValue: editInfo&&editInfo.studentNo,
                            })(
                                <Row type={'flex'} align={'middle'} justify={'center'} 
                                    style={studentStyle}
                                    onClick={()=>this.setState({visible:true})}>
                                    {selectedStudent?(
                                        <div>
                                            {selectedStudent.name} <br/>
                                            {selectedStudent.studentNo}，{selectedStudent.collegeName}
                                        </div>
                                    ):(
                                        <div><Icon type="plus" /> 添加学生</div>
                                    )}
                                    
                                </Row>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="选择不预警时间">
                            {getFieldDecorator('rangePicker', {
                                rules: [{
                                    type: 'array',
                                    required: true,
                                    message: '请选择不预警时间！'
                                }],
                                initialValue: editInfo&&[moment(editInfo.startDate, dateFormat),moment(editInfo.endDate, dateFormat)]
                            })(
                                <RangePicker style={{width:398}} 
                                disabledDate={disabledDate}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="关联模块">
                            {getFieldDecorator('warnModule', {
                                rules: [{
                                    type: 'array',
                                    required: true,
                                    message: '请选择关联模块！'
                                }],
                                initialValue: editInfo&&editInfo.warnModule
                            })(
                                <Checkbox.Group>
                                    {warnModules.map(item=>(
                                        <div style={{paddingTop:10}} key={item.value}><Checkbox value={item.value}>{item.label}</Checkbox></div>
                                    ))}
                                </Checkbox.Group>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="备注">
                            {getFieldDecorator('remark',{
                                initialValue: editInfo&&editInfo.remark
                            })(
                                <Input.TextArea style={{width:398,height:138,resize:'none'}} maxLength="50" />
                            )}
                        </FormItem>
                        <Row>
                            <Col {...formItemLayout.labelCol}></Col>
                            <Col {...formItemLayout.wrapperCol}>
                                <Button size="large" type="primary" style={{marginRight:20}} onClick={this.saveAction}>{'保 存'}</Button>
                                <Button size="large" onClick={()=>{
                                    this.props.history.push('/mainframe/systemsetup/earlywarningsetting?whitelist')
                                }}>{'返 回'}</Button>
                            </Col>
                        </Row>
                    </Card>
                </div>
                {this.state.visible?(
                    <ChooseStudentModel title={'选择学生'}
                        visible={this.state.visible}
                        selectedStudent={this.state.selectedStudent}
                        onCancel={()=>this.setState({visible:false})}
                        onOk={this.chooseStudent}/>
                ):null}
            </div>
        );
    }
}
const AddOrEditPageForm = Form.create()(AddOrEditPage);
export default withRouter(AddOrEditPageForm);
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb, Card, Form, DatePicker, Input, Button, Icon, Row, Col, message, Tag } from 'antd';
import ChooseStrategyTargetModel from './ChooseStrategyTargetModel'
import moment from 'moment';
import { getHashParam } from '../../../../../utils'

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const formItemLayout = {
    labelCol: { span: 10},
    wrapperCol: { span: 14, style:{paddingLeft:'10px'}},
};

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
        selectedTarget:undefined,
        editId:undefined,
        editInfo:undefined,
        rangePickerValue:[]
    }
    componentWillMount(){
        let params = getHashParam();
        if(params.id){
            // let data = {id:params.id}
            this.setState({editId:params.id},()=>{
                //获取用户详细信息
                const obj = {
                    "id": "519ad5a12dea47a4997da7abf160734b",
                    "strategyId": "01816d0dd27f4da9816c7003b7ae3aed",
                    "strategyTarget": "40070,40050,40141,40020",
                    "strategyDate": "2018-09-13~2018-09-21,2018-09-11~2018-09-12",
                    "remark": "handle_remarkhandle_remark",
                    "createDate": "2018-09-10",
                    "updateDate": "2018-09-10",
                    "strategyName": "预警策略名称重复校验",
                    "strategyTargetCollege": "计算机工程学院、自动化学院、外国语学院、材料工程学院",
                }
                let editInfo = Object.assign({},obj) || {};
                let selectedTarget = {
                    id: editInfo.strategyId,
                    strategyName: editInfo.strategyName,
                    strategyTarget: editInfo.strategyTarget,
                    strategyTargetCollege: editInfo.strategyTargetCollege,
                    strategyDate: editInfo.strategyDate
                }
                let strategyDate = editInfo.strategyDate.split(',').map(item=>{
                    return {
                        startDate: item.split('~')[0],
                        endDate: item.split('~')[1]
                    }
                })
                let strategyTargetCollege = editInfo.strategyTargetCollege?selectedTarget.strategyTargetCollege.split('、'):[];
                this.setState({
                    editInfo,
                    selectedTarget
                })
                this.props.form.setFieldsValue({
                    strategyDate,
                    strategyTargetCollege
                })
            })
        }
    }
    chooseStudent = (selectedTarget) => {
        this.setState({selectedTarget,visible:false})
        let strategyTargetCollege = selectedTarget.strategyTargetCollege?selectedTarget.strategyTargetCollege.split('、'):[];
        this.props.form.setFieldsValue({
            strategyId: selectedTarget.id,
            strategyTargetCollege
        })
    }
    saveAction = () => {
        this.props.form.validateFields(
            (err,values) => {
                if (!err) {
                    const { strategyId, remark, strategyDate } = values;
                    let flag = true;
                    //判断是否选择关联的预警策略
                    if(!strategyId){
                        this.props.form.setFields({
                            strategyId: {
                                errors: [new Error('请选择关联的预警策略！')],
                            },
                        });
                        flag = false;
                    }
                    //判断是否选择不预警时间
                    if((!strategyDate || strategyDate.length===0) && this.state.rangePickerValue.length===0){
                        this.props.form.setFields({
                            strategyDate: {
                                errors: [new Error('请选择不预警时间！')],
                            },
                        });
                        flag = false;
                    }
                    if(!flag){ //如果不通过验证不能继续执行提交
                        return;
                    }
                    //获取预警时间
                    let dateArr = JSON.parse(JSON.stringify(strategyDate)) || [];
                    if(this.state.rangePickerValue.length>0){
                        dateArr.push({
                            startDate:this.state.rangePickerValue[0].format(dateFormat),
                            endDate:this.state.rangePickerValue[1].format(dateFormat)
                        })
                    }
                    let date = dateArr.map(item=>{
                        return item.startDate + '~' + item.endDate;
                    }).join(',');
                    let data = {
                        strategyId,
                        strategyTarget:this.state.selectedTarget.strategyTarget,
                        remark,
                        strategyDate:date
                    }
                    // let url = '/bigdata/alarmWhitelist/insertAlarmHolidayWhitelist';
                    if(this.state.editInfo){ //编辑时
                        // url = '/bigdata/alarmWhitelist/updateAlarmHolidayWhitelist';
                        data.id = this.state.editInfo.id;
                    }
                    message.success('保存成功！',1,()=>{
                        this.props.history.push('/mainframe/systemsetup/earlywarningsetting?whitelist')
                    });
                    
                }
            },
        );
    }
    addStrategyDate = () => {
        let rangePickerValue = this.state.rangePickerValue;
        if(rangePickerValue && rangePickerValue.length>0){
            let strategyDate = this.props.form.getFieldValue('strategyDate') || [];
            let addDate = {
                startDate:rangePickerValue[0].format(dateFormat),
                endDate:rangePickerValue[1].format(dateFormat)
            }
            let isExist = false;
            strategyDate.forEach(item=>{
                if(item.startDate===addDate.startDate && item.endDate===addDate.endDate){
                    isExist = true 
                }
            })
            if(isExist){
                message.error('所选日期重复！');
                return;
            }
            strategyDate.push(addDate)
            this.props.form.setFieldsValue({
                strategyDate
            })
            this.setState({rangePickerValue:[]})
        } else {
            message.error('请选择日期范围！')
        }
        
    }
    changeRangePicker = (values)=>{
        this.setState({rangePickerValue:values})
        //判断不预警时间是否为空
        let strategyDate = this.props.form.getFieldValue('strategyDate') || [];
        if((!strategyDate || strategyDate.length===0) && values.length===0){
            this.props.form.setFields({
                strategyDate: {
                    errors: [new Error('请选择不预警时间！')],
                },
            });
        } else {
            this.props.form.validateFields();
        }
    }
    deletestrategyDate = (item,index)=> {
        let strategyDate = this.props.form.getFieldValue('strategyDate') || [];
        let changestrategyDate = strategyDate.filter((a)=>{
            return !(a.startDate===item.startDate && a.endDate===item.endDate)
        });
        this.props.form.setFieldsValue({
            strategyDate:changestrategyDate
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        let editInfo = this.state.editInfo;
        let selectedTarget = this.state.selectedTarget;
        let strategyTargetCollege = this.props.form.getFieldValue('strategyTargetCollege') || [];
        let strategyDate = this.props.form.getFieldValue('strategyDate') || [];
        // console.log(strategyDate)
        return (
            <div>
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>综合预警</Breadcrumb.Item>
                    <Breadcrumb.Item>预警设置</Breadcrumb.Item>
                    <Breadcrumb.Item>预警白名单</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <Card title={<div className="common-title">{this.state.editId?'编辑节假日白名单配置':'新增节假日白名单配置'}</div>}>
                        <FormItem {...formItemLayout} style={{paddingTop:10}} label="选择关联的预警策略">
                            {getFieldDecorator('strategyId', {
                                rules: [{
                                    message: '请选择关联的预警策略！'
                                }],
                                initialValue: editInfo&&editInfo.strategyId,
                            })(
                                <Row type={'flex'} align={'middle'} justify={'center'} 
                                    style={studentStyle}
                                    onClick={()=>this.setState({visible:true})}>
                                    {selectedTarget?(
                                        <div>
                                            {selectedTarget.strategyName}
                                        </div>
                                    ):(
                                        <div><Icon type="plus" /> 选择关联的预警策略</div>
                                    )}
                                    
                                </Row>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="不预警学院">
                            {getFieldDecorator('strategyTargetCollege', {
                                rules: [{
                                    type: 'array',
                                }]
                            })(
                                <div>
                                    {strategyTargetCollege.map((item,index)=>(
                                        <Tag 
                                            style={{height:28,lineHeight:'28px',color:'#4a4a4a'}}
                                            key={index}>{item}</Tag>
                                    ))}
                                </div>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="选择不预警时间">
                            {getFieldDecorator('strategyDate', {
                                rules: [{
                                    type: 'array',
                                    message: '请选择不预警时间！'
                                }]
                            })(
                                <React.Fragment>
                                    <div>
                                        <RangePicker style={{width:398}} 
                                            disabledDate={disabledDate} value={this.state.rangePickerValue} onChange={this.changeRangePicker}/>
                                        <Icon type="plus-circle-o" style={{marginLeft:10,cursor:'pointer'}} onClick={this.addStrategyDate} />
                                    </div>
                                    <div>
                                        {strategyDate.map((item,index)=>(
                                            <div key={index}>
                                                <Tag style={{height:28,lineHeight:'28px',color:'#4a4a4a'}} >
                                                    {item.startDate+'~'+item.endDate} 
                                                    <Icon type="close" 
                                                        style={{marginLeft:5,color:'rgba(0, 0, 0, 0.45)'}} 
                                                        onClick={()=>this.deletestrategyDate(item,index)}/>
                                                </Tag>
                                            </div>
                                        ))}
                                    </div>
                                </React.Fragment>
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
                    <ChooseStrategyTargetModel title={'选择预警策略'}
                        visible={this.state.visible}
                        selectedTarget={this.state.selectedTarget}
                        onCancel={()=>this.setState({visible:false})}
                        onOk={this.chooseStudent}/>
                ):null}
            </div>
        );
    }
}
const AddOrEditPageForm = Form.create()(AddOrEditPage);
export default withRouter(AddOrEditPageForm);
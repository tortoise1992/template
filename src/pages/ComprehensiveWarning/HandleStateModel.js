import React, { Component } from 'react'
import MainModal from '@/common/components/MainModal'
import { Radio, Row, Col, Form, Input, message } from 'antd'

const RadioGroup = Radio.Group
const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 6},
    wrapperCol: { span: 14, style:{paddingLeft:'20px'}},
};
const handleResultTypes = ['请假','病假','实习','休学','退学','毕业','其他'];

class HandleStateModel extends Component {
    saveAction = ()=> {
        this.props.form.validateFields((err,values) => {
            // let { handleResult, handleRemark } = values;
            // let alarmTriggerId = this.props.alarmTriggerId;
            // let data = { handleResult, handleRemark, alarmTriggerId }
            
            //保存处理结果 
            const res = {success:true}
            if(res.success) {
                message.success("处理成功！");
                this.props.onOk();
            } else {
                message.error(res.msg);
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let handleResult = this.props.form.getFieldValue('handleResult');
        return (
            <MainModal
                    title={'处理预警'}
                    onCancel={this.props.onCancel}
                    onOk={this.saveAction}
                    visible={true}
                    width={656}
                >
                <FormItem {...formItemLayout} label="提醒模块">
                    {getFieldDecorator('handleResult', {
                        rules: [{
                            required: true,
                            message: '请选择提醒模块！'
                        }]
                    })(
                        <RadioGroup>
                            <Row>
                                {handleResultTypes.map(item=>(
                                    <Col span={8} key={item}><Radio value={item}>{item}</Radio></Col>
                                ))}
                            </Row>
                        </RadioGroup>
                    )}
                </FormItem>
                {handleResult==='其他'?(
                    <FormItem {...formItemLayout} label="其他原因">
                        {getFieldDecorator('handleRemark', {
                            rules: [{
                                required: true,
                                message: '请填写其他原因！'
                            }]
                        })(
                            <Input.TextArea style={{width:398,height:138,resize:'none'}}/>
                        )}
                    </FormItem>
                ):null}
            </MainModal>
        )
    }
}

const HandleStateModelForm = Form.create()(HandleStateModel)
export default HandleStateModelForm
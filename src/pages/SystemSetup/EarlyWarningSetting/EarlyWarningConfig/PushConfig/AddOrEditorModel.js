import React, { Component } from 'react'
import { Form, Input, Checkbox  } from 'antd'
import MainModal from '@/common/components/MainModal'
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 19, style:{paddingLeft:'10px'}},
};

class AddOrEditorModel extends Component {
    onOk = ()=> {
        this.props.form.validateFields(
            (err,values) => {
                if (!err) {
                    this.props.onOk(values);
                }
            },
        );
    }
    handleChange = ()=>{

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let editData = this.props.editData;
        return (
            <MainModal
                title={this.props.title}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                onOk={this.onOk}
                width={600}
            >
                <div>
                    <FormItem {...formItemLayout} label="工号">
                        {getFieldDecorator('jobNumber', {
                            rules: [{
                                required: true,
                                message: '请填写正确的工号！',
                                pattern: /^[0-9]{5}$/,
                            }],
                            initialValue: editData&&editData.jobNumber
                        })(
                            <Input placeholder="工号" max={5} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="姓名">
                        {getFieldDecorator('pushName', {
                            rules: [{
                                required: true,
                                message: '请填写姓名！',
                                max:30
                            }],
                            initialValue: editData&&editData.pushName
                        })(
                            <Input placeholder="姓名" maxLength={30}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="邮箱">
                        {getFieldDecorator('pushMail', {
                            rules: [{
                                required: true,
                                message: '请填写邮箱！',
                                pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                            }],
                            initialValue: editData&&editData.pushMail
                        })(
                            <Input placeholder="邮箱" maxLength={100}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="提醒模块">
                        {getFieldDecorator('warnModule', {
                            rules: [{
                                required: true,
                                message: '请选择提醒模块！',
                                type: 'array'
                            }],
                            initialValue: editData?editData.warnModule:[]
                        })(
                            <Checkbox.Group options={this.props.warnModules} onChange={this.handleChange}/>
                        )}
                        
                    </FormItem>
                </div>
            </MainModal>
        )
    }
}
const AddOrEditorModelForm = Form.create()(AddOrEditorModel);
export default AddOrEditorModelForm;
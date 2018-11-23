/**
 * Created by hutao on 2018/8/31.
 * 权限配置
 */
import React, { Component } from 'react';
import { Form, Input } from 'antd';
import MainModal from '@/common/components/MainModal';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 19, style:{paddingLeft:'10px'}},
};

class AddOrEditRole extends Component {
    sureAction = () => {
        this.props.form.validateFields(
            (err,values) => {
                if (!err) {
                    this.props.onOk(values);
                }
            },
        );
    }
	render () {
        const { getFieldDecorator } = this.props.form;
        let editData = this.props.editData
		return (
			<MainModal
                title={this.props.title}
                visible={true}
                onOk={this.sureAction}
                onCancel={this.props.onCancel}
                okText="确定"
                cancelText="取消"
            >
                <FormItem {...formItemLayout} label="角色名称">
                    {getFieldDecorator('roleName', {
                        rules: [{
                            required: true,
                            message: '请输入角色名称(不超过8字)'
                        }],
                        initialValue: editData&&editData.roleName
                    })(
                        <Input placeholder="请输入角色名称(不超过8字)" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="角色描述">
                    {getFieldDecorator('remark', {
                        initialValue: editData&&editData.remark
                    })(
                        <Input.TextArea style={{resize:'none',height:60}} placeholder="请输入角色描述(不超过20字)"/>
                    )}
                </FormItem>
            </MainModal>
		)
	}
}

const AddOrEditRoleModel = Form.create()(AddOrEditRole);
export default AddOrEditRoleModel;
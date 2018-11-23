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
        let activeData = this.props.isEditor ? this.props.activeData: undefined;
        let isHasUrl = !activeData || activeData.subMenus.length===0;
		return (
			<MainModal
                title={this.props.title}
                visible={true}
                onOk={this.sureAction}
                onCancel={this.props.onCancel}
                okText="确定"
                cancelText="取消"
            >
                <FormItem {...formItemLayout} label="名称">
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true,
                            message: '请输入菜单名称'
                        }],
                        initialValue: activeData&&activeData.name
                    })(
                        <Input placeholder="请输入菜单名称" />
                    )}
                </FormItem>
                {isHasUrl?
                    <FormItem {...formItemLayout} label="URL">
                        {getFieldDecorator('url', {
                            rules: [{
                                required: true,
                                message: '请输入路由地址'
                            }],
                            initialValue: activeData&&activeData.url
                        })(
                            <Input placeholder="请输入路由地址"/>
                        )}
                    </FormItem>:null
                }
                <FormItem {...formItemLayout} label="排序">
                    {getFieldDecorator('seq', {
                        rules: [{
                            required: true,
                            message: '请输入排序'
                        }],
                        initialValue: activeData&&activeData.seq
                    })(
                        <Input.TextArea style={{resize:'none',height:60}} placeholder="请输入排序"/>
                    )}
                </FormItem>
            </MainModal>
		)
	}
}

const AddOrEditRoleModel = Form.create()(AddOrEditRole);
export default AddOrEditRoleModel;
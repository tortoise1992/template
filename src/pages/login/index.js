import React from 'react';
import { connect} from 'react-redux';
import { loginAction } from '../../redux/actions/loginAction';
import { postAction } from '../../util/axios';
import { Input, Icon, Button, Form } from 'antd';
import router from 'umi/router';
import BgImg from './bg.jpg';
import Logo from './logo.png';
import {setLocal} from '../../util/tool'
// import md5 from 'md5'
const FormItem = Form.Item;

const divstyle={
	width: "100vw", 
	height:"100vh", 
	overflow: "hidden",
	position: "relative"
};

const bgimg = {
	position: "absolute",
	top:"0px",
	left:"0px",
	width: "100%",
	height:"100%",
	zIndex: "0",
}

const content = {
	position: "absolute",
	top:"50%",
	left:"50%",
	width: "348px",
	height: "418px",
	background: "white",
	borderRadius: "5px",
	padding:"35px",
	zIndex: "1",
	marginTop: "-209px",
	marginLeft:"-174px"
}



class LoginPage extends React.Component{
	
	// 账户名称
	userEmpty = () => {
	    this.userNameInput.focus();
	    this.props.form.setFieldsValue({relationNo: undefined});
	}
	
	// 账户密码
	passwordEmpty = () => {
	    this.userCodeInput.focus();
	    this.props.form.setFieldsValue({userPassword: undefined});
	}

	handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
				let { relationNo, userPassword } = values;
				this.props.handleLogin({relationNo, userPassword}).then(status=>{
					if(status){
						router.replace('/')
					}
				});
            }
        });
    }
    render () {
		const { getFieldDecorator } = this.props.form;
		let username = this.props.form.getFieldValue('relationNo');
		let password = this.props.form.getFieldValue('userPassword');
    	const suffixUserName = username ? <Icon type="close-circle" onClick={this.userEmpty} style={{ color: 'rgba(0,0,0,.25)' }} /> : null;
    	const suffixUserCode = password ? <Icon type="close-circle" onClick={this.passwordEmpty} style={{ color: 'rgba(0,0,0,.25)' }} /> : null;
        return (
            <div style={divstyle}>
               	<img src={BgImg} alt="" style={bgimg} />
               	<div style={content}>
               		<div style={{textAlign:'center',paddingBottom:20}}>
					   	<img src={Logo} alt="" style={{marginTop: 10}} />
               			<h4 style={{fontSize: "18px", margin: "20px auto"}}>智能文档管理系统</h4>
					</div>
               		<Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('relationNo', {
                                rules: [{ required: true, message: '请输入账户名称!' }],
                            })(
                                <Input 
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
									suffix={suffixUserName}
									ref={node => this.userNameInput = node}
                                    placeholder="请输入账户名称"
                                    size="large" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('userPassword', {
                                rules: [{ required: true, message: '请输入账户密码!' }],
                            })(
                                <Input 
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
									type="password" 
									suffix={suffixUserCode}
									ref={node => this.userCodeInput = node}
                                    placeholder="请输入账户密码"
                                    size="large" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" block htmlType="submit" size="large" style={{marginTop:20}}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
               	</div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin (data) {
			const curUrl = `/bigdata/user/login`;
			// 此处处理异步请求返回一个promise对象，供回调跳转路由使用
			return new Promise((resolve,reject)=>{
				postAction(
					curUrl,data
				).then (function (res) {
					if (res.success) {
						setLocal("userInfo", JSON.stringify(res.obj));
						setLocal("loginStatus", true);
						const action  = loginAction(true);			
						dispatch(action);	
						resolve(true)				
					}
				})
			})
            
        }
    }
}
export default connect(null, mapDispatchToProps)(Form.create()(LoginPage))


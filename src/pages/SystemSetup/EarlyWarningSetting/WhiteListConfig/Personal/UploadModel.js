import React, { Component } from 'react'
import MainModal from '@/common/components/MainModal'
import { Upload, Icon, message } from 'antd';

const Dragger = Upload.Dragger;

class ImportModel extends Component {
    state = {
        fileList:[],
        sureUrl:undefined
    }
    componentWillMount(){
        const options = {
            accept: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            action: '',
            onChange:this.handleChange,
            beforeUpload:()=>{
                if(this.state.fileList.length>0){
                    message.warn('只能上传一个文件！');
                    return false;
                }
            }
        };
        this.setState({options})
    }
    onOk = ()=> {
        if(this.state.sureUrl){
            message.error('上传错误！');
            
        } else {
            message.warn('您还未上传文件！');
        }
    }
    handleChange = (info) => {
        let fileList = info.fileList;
        if(fileList.length>1){
            return false;
        }
        fileList = fileList.filter((file) => {
            if (file.response) {
                return file.response.success;
            }
          return true;
        });

        const status = info.file.status;
        if (status === 'done') {
            if(info.file.response.success){
                this.setState({sureUrl:info.file.response.obj})
                message.success(`${info.file.name} 上传成功.`);
            } else {
                message.error(info.fileList[0].response.msg);
            }
        } else if (status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
        this.setState({ fileList });
    }
    render() {
        
        return (
            <MainModal
                title={this.props.title || '导入文件'}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                onOk={this.onOk}
                width={600}
            >
                <div style={{padding:'20px 100px'}}>
                    <Dragger {...this.state.options} fileList={this.state.fileList}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
                        <p className="ant-upload-hint">仅支持Excel文件</p>
                    </Dragger>
                </div>
            </MainModal>
        )
    }
}

export default ImportModel;
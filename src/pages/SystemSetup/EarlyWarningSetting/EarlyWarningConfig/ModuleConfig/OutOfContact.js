import React, { Component } from 'react';
import { Row, Col, InputNumber, Alert } from 'antd';
import ModuleConfigCard from '../../Componets/ModuleConfigCard'
import { isObjectValueEqual, ArrayNumSortTure } from '../../../../../utils'

let defaultConfig = [{
    maxVal:null,minVal:null,level:1,type:1,
},{ 
    maxVal:null,minVal:null,level:2,type:1,
},{
    maxVal:null,minVal:null,level:3,type:1,
},{
    maxVal:null,minVal:null,level:4,type:1,
}]

class OutOfContact extends Component {
    state = {
        data: JSON.parse(JSON.stringify(defaultConfig)),
        openFlag: true,
        visibleError: false
    }
    componentWillReceiveProps(nextProps){
        if(!isObjectValueEqual(nextProps.data,this.props.data)&&nextProps.data.length>0){
            let data = nextProps.data.sort((a,b)=>a.level-b.level);
            let openFlag = data[0].openFlag===1;
            this.setState({data,openFlag})
        } else if(nextProps.data.length===0) {
            this.setState({openFlag:false})
        }
    }
    updatePropsData(data){
        if(this.state.openFlag){
            let isError = this.checkValue(data);
            this.props.onChange(data,0,isError);
        } else {
            this.props.onChange(null,0,true);
        }
    }
    checkValue = (data)=> {
        let dataArr = data.map(item=>item.minVal);
        let flag = !ArrayNumSortTure(dataArr);
        this.setState({visibleError:flag})
        return !flag;
    }
    changeValue = (index,value)=> {
        let data = this.state.data;
        data[index].minVal = value;
        this.setState({data});
        this.updatePropsData(data);
    }
    changeSwitch = ()=> {
        this.setState({
            openFlag:!this.state.openFlag
        },()=>{
            this.updatePropsData(this.state.data);
        })
    }
    render() {
        let disabled = this.state.openFlag;
        return (
            <ModuleConfigCard
                title={'失联预警'}
                footer={'学生连续失联天数达到预警值，系统会触发预警机制。'}
                checked={this.state.openFlag}
                onChange={this.changeSwitch}
            >
                <Row gutter={40}>
                    <Col span={12} className="text-right">
                        <span className="warn-cilcle-point"></span>
                        <span style={{ marginRight: 10 }}>红色预警</span>
                        <InputNumber value={this.state.data[0].minVal} disabled={!disabled}
                            className="input-item" min={0} onChange={(value)=>this.changeValue(0,value)} /> 天
                    </Col>
                    <Col span={12}>
                        <span className="warn-cilcle-point" style={{ backgroundColor: '#f5a623' }}></span>
                        <span style={{ marginRight: 10 }}>橙色预警</span>
                        <InputNumber value={this.state.data[1].minVal} disabled={!disabled}
                            className="input-item" min={0} onChange={(value)=>this.changeValue(1,value)}  /> 天
                    </Col>
                </Row>
                <Row gutter={40} style={{ marginTop: 28 }}>
                    <Col span={12} className="text-right">
                        <span className="warn-cilcle-point" style={{ backgroundColor: '#f8e71c' }}></span>
                        <span style={{ marginRight: 10 }}>黄色预警</span>
                        <InputNumber value={this.state.data[2].minVal} disabled={!disabled} 
                            className="input-item" min={0} onChange={(value)=>this.changeValue(2,value)}  /> 天
                    </Col>
                    <Col span={12}>
                        <span className="warn-cilcle-point" style={{ backgroundColor: '#309cff' }}></span>
                        <span style={{ marginRight: 10 }}>蓝色预警</span>
                        <InputNumber value={this.state.data[3].minVal} disabled={!disabled} 
                            className="input-item" min={0} onChange={(value)=>this.changeValue(3,value)}  /> 天
                    </Col>
                </Row>
                <div style={{ height:40,margin:'5px 0px',visibility:this.state.visibleError?'visible':'hidden' }}>
                    <Alert type="error" banner message={'请从大到小按顺序填写'} />
                </div>
            </ModuleConfigCard>
        )
    }
}

export default OutOfContact
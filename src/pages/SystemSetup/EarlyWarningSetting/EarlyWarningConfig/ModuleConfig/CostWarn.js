import React, { Component } from 'react';
import { Row, Col, InputNumber, Alert } from 'antd';
import ModuleConfigCard from '../../Componets/ModuleConfigCard'
import { isObjectValueEqual, ArrayNumSortTure } from '../../../../../utils'

let defaultConfig = [{
    maxVal:null,minVal:null,level:1,type:4,
},{ 
    maxVal:null,minVal:null,level:2,type:4,
},{
    maxVal:null,minVal:null,level:3,type:4,
},{
    maxVal:null,minVal:null,level:4,type:4,
}]

class CostWarn extends Component {
    state = {
        data: JSON.parse(JSON.stringify(defaultConfig)),
        openFlag: true,
        visibleError: false,
        errorText: '请从大到小按顺序填写'
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
            this.props.onChange(data,2,isError);
        } else {
            this.props.onChange(null,2,true);
        }
    }
    checkValue = (data)=> {
        let dataArr = data.map(item=>item.minVal);
        let maxDataArr = data.map(item=>item.maxVal);
        let flag = !ArrayNumSortTure(dataArr,true) || !ArrayNumSortTure(maxDataArr);
        let errorText;
        if(!ArrayNumSortTure(dataArr,true)){
            errorText = '月消费最低金额请从小到大按顺序填写';
        } else {
            errorText = '月消费最高金额请从大到小按顺序填写';
        }
        data.forEach(item => {
            if(item.minVal && item.maxVal && item.minVal>=item.maxVal){
                flag = true;
                errorText = '月消费最低金额不能大于月消费最高金额';
            }
        });
        this.setState({visibleError:flag,errorText})
        return !flag;
    }
    changeValue = (index,key,value)=> {
        let data = this.state.data;
        data[index][key] = value;
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
                title={'消费预警'}
                footer={'学生月消费低于/高于预警值，系统会触发预警机制。'}
                checked={this.state.openFlag}
                onChange={this.changeSwitch}
            >
                <Row gutter={40}>
                    <Col span={12} className="text-right">
                        <span className="warn-cilcle-point"></span>
                        <span style={{ marginRight: 10 }}>红色预警</span>
                        <InputNumber value={this.state.data[0].minVal} disabled={!disabled}
                            className="input-item" min={0} onChange={(value)=>this.changeValue(0,'minVal',value)} />
                            <span> —— </span>
                        <InputNumber value={this.state.data[0].maxVal} disabled={!disabled}
                            className="input-item" min={0} onChange={(value)=>this.changeValue(0,'maxVal',value)} /> 元
                    </Col>
                    <Col span={12}>
                        <span className="warn-cilcle-point" style={{ backgroundColor: '#f5a623' }}></span>
                        <span style={{ marginRight: 10 }}>橙色预警</span>
                        <InputNumber value={this.state.data[1].minVal} disabled={!disabled}
                            className="input-item" min={0} onChange={(value)=>this.changeValue(1,'minVal',value)} />
                            <span> —— </span>
                        <InputNumber value={this.state.data[1].maxVal} disabled={!disabled}
                            className="input-item" min={0} onChange={(value)=>this.changeValue(1,'maxVal',value)} /> 元
                    </Col>
                </Row>
                <Row gutter={40} style={{ marginTop: 28 }}>
                    <Col span={12} className="text-right">
                        <span className="warn-cilcle-point" style={{ backgroundColor: '#f8e71c' }}></span>
                        <span style={{ marginRight: 10 }}>黄色预警</span>
                        <InputNumber value={this.state.data[2].minVal} disabled={!disabled}
                            className="input-item" min={0} onChange={(value)=>this.changeValue(2,'minVal',value)} />
                            <span> —— </span>
                        <InputNumber value={this.state.data[2].maxVal} disabled={!disabled}
                            className="input-item" min={0} onChange={(value)=>this.changeValue(2,'maxVal',value)} /> 元
                    </Col>
                    <Col span={12}>
                        <span className="warn-cilcle-point" style={{ backgroundColor: '#309cff' }}></span>
                        <span style={{ marginRight: 10 }}>蓝色预警</span>
                        <InputNumber value={this.state.data[3].minVal} disabled={!disabled}
                            className="input-item" min={0} onChange={(value)=>this.changeValue(3,'minVal',value)} />
                            <span> —— </span>
                        <InputNumber value={this.state.data[3].maxVal} disabled={!disabled}
                            className="input-item" min={0} onChange={(value)=>this.changeValue(3,'maxVal',value)} /> 元
                    </Col>
                </Row>
                <div style={{ height:40,margin:'5px 0px',visibility:this.state.visibleError?'visible':'hidden' }}>
                    <Alert type="error" banner message={this.state.errorText} />
                </div>
            </ModuleConfigCard>
        )
    }
}

export default CostWarn
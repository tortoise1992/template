import React, { Component } from 'react'
import { Row, Col } from 'antd'
import MainModal from '@/common/components/MainModal'
import '../styles.less'

class EarlyWarningObjModel extends Component {
    state = {
        dataLists:[]
    }
    componentWillMount() {
        this.setState({
            dataLists:JSON.parse(JSON.stringify(this.props.dataLists)) || []
        })
    }
    selectData = (index)=> {
        let dataLists = this.state.dataLists;
        dataLists[index].active=!dataLists[index].active;
        this.setState({dataLists})
    }
    onOk = ()=> {
        let slecteds = this.state.dataLists.filter(item=>item.active).map(a=>{
            return a.collegeCode;
        }).join(',');
        this.props.onOk(slecteds);
    }
    render() {
        let dataLists = this.state.dataLists.map((item,index)=>(
            <Col span={6} key={item.collegeCode}>
                <div className={"item" + (item.active?' active':'')} onClick={()=>this.selectData(index)}>{item.collegeName}</div>
            </Col>
        ));
        return (
            <MainModal
                title={this.props.title}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                onOk={this.onOk}
                width={1004}
            >
                <div className={"earlyWarningObjModel"}>
                    <Row gutter={20}>
                        {dataLists}
                    </Row>
                </div>
            </MainModal>
        )
    }
}

export default EarlyWarningObjModel
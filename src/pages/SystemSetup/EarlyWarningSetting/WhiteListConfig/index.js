import React, { Component } from 'react';
import { Radio } from 'antd';
import Personal from './Personal/Personal'
import Holiday from './Holiday/Holiday'
import './whitelist.less'

class WhiteListConfig extends Component {
    state={
        mode: 'person'
    }
    componentWillMount () {
        let mode = window.localStorage.getItem('whitelistTab');
        if(mode){
            this.setState({mode});
        }
    }
    handleModeChange = (mode)=> {
        window.localStorage.setItem('whitelistTab',mode);
        this.setState({
            mode
        })
    }
    render() {
        const tabButton = (<Radio.Group onChange={(e)=>this.handleModeChange(e.target.value)} value={this.state.mode} size="large">
                                <Radio.Button value="person" style={{width:80,textAlign:"center"}}>个人</Radio.Button>
                                <Radio.Button value="holiday" style={{width:80,textAlign:"center"}}>节假日</Radio.Button>
                            </Radio.Group>);
        return (
            <div className="early-warn-whitelist">
                {this.state.mode==='person'?(<Personal tabs={tabButton}/>):(<Holiday tabs={tabButton}/>)}
            </div>
        )
    }
}

export default WhiteListConfig;
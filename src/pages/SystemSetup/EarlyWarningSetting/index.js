import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb, Tabs } from 'antd';
import EarlyWarningConfig from './EarlyWarningConfig';
import WhiteListConfig from './WhiteListConfig';
import './styles.less'
const TabPane = Tabs.TabPane;
const keyLists = {config:true,whitelist:true}
class EarlyWarningSetting extends Component {
    state = {
        defaultKey:'config'
    }
    componentWillMount(){
        let search = this.props.location.search;
        if(search){
            let tab = search.replace('?','');
            if(tab && keyLists[tab]){
                this.setState({defaultKey:tab})
            }
        }
    }
    changeTab = (activeKey) => {
        window.localStorage.removeItem('whitelistTab');//移除白名单默认tab配置
        let path = this.props.match.path;
        this.props.history.replace(path+'?'+activeKey);
    }
    render() {
        return (
            <div className={"earlyWarningSetting"}>
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                    <Breadcrumb.Item>预警设置</Breadcrumb.Item>
                </Breadcrumb>
                <Tabs defaultActiveKey={this.state.defaultKey} className={"nav-tab"} onChange={this.changeTab}>
                    <TabPane tab="预警配置" key="config" className={"common-content"}>
                        <EarlyWarningConfig/>
                    </TabPane>
                    <TabPane tab="预警白名单配置" key="whitelist" className={"common-content"}>
                        <WhiteListConfig/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default withRouter(EarlyWarningSetting);
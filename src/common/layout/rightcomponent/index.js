import React from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import { asyncComponent } from '../../../utils';
import './rightcomponent.css'

//获取到异步组件
// Dashboard
const Analysis = asyncComponent(() => import('../../../pages/Dashboard/Analysis')); //分析页
const Relation = asyncComponent(() => import('../../../pages/Dashboard/Relation')); //关系页

// 地图
const BaiduMaps = asyncComponent(() => import('../../../pages/Map/BaiduMaps')); //百度地图
const BMap = asyncComponent(() => import('../../../pages/Map/BMap')); //BMap

// 其他组件
const ModalCont = asyncComponent(() => import('../../../pages/Others/Modal')); //弹框
const NoDataCont = asyncComponent(() => import('../../../pages/Others/NoData')); //空数据处理
const TableToExcel = asyncComponent(() => import('../../../pages/Others/TableToExcel')); //Table转Excel
const MainCard = asyncComponent(() => import('../../../pages/Others/MainCard')); //MainCard
const Editor = asyncComponent(() => import('../../../pages/Others/editor')); //富文本编辑器

// //综合预警
// const ComprehensiveWarning = asyncComponent(() => import('../../../pages/ComprehensiveWarning')); //列表页
// const ComprehensiveWarningDetail = asyncComponent(() => import('../../../pages/ComprehensiveWarning/Detail/Detail')); //详情页
// //系统设置
// const BehaviorTrajectory = asyncComponent(() => import('../../../pages/SystemSetup/BehaviorTrajectory')); //行为轨迹设置
// const EarlyWarningSetting = asyncComponent(() => import('../../../pages/SystemSetup/EarlyWarningSetting')); //预警设置
// const EarlyWarningConfigAdd = asyncComponent(() => import('../../../pages/SystemSetup/EarlyWarningSetting/EarlyWarningConfig/AddPage')); //预警设置
// const WhitelistPersonalAdd = asyncComponent(() => import('../../../pages/SystemSetup/EarlyWarningSetting/WhiteListConfig/Personal/AddOrEditPage')); //预警白名单添加编辑页面
// const WhitelistHolidayAdd = asyncComponent(() => import('../../../pages/SystemSetup/EarlyWarningSetting/WhiteListConfig/Holiday/AddOrEditPage')); //预警白名单节假日添加编辑页面
// // 权限管理
// const Account = asyncComponent(() => import('../../../pages/AccessManage/Account')); //账户管理
// const Menu = asyncComponent(() => import('../../../pages/AccessManage/Menu')); //菜单管理
// const Authority = asyncComponent(() => import('../../../pages/AccessManage/Authority')); //权限配置

class RightComponent extends React.Component{
    render () {
        return (
            <div className='rightcomponent'>
                <div className='scrollcontainer'>
                    <Switch>
                        <Route path="/mainframe/dashboard/analysis" component={Analysis}/>
                        <Route path="/mainframe/dashboard/relation" component={Relation}/>
                        <Route path="/mainframe/map/baidumaps" component={BaiduMaps}/>
                        <Route path="/mainframe/map/bmap" component={BMap}/>
                        <Route path="/mainframe/others/modal" component={ModalCont}/>
                        <Route path="/mainframe/others/nodata" component={NoDataCont}/>
                        <Route path="/mainframe/others/tabletoexcel" component={TableToExcel}/>
                        <Route path="/mainframe/others/maincard" component={MainCard}/>
                        <Route path="/mainframe/others/editor" component={Editor}/>

                        {/* <Route path="/mainframe/systemsetup/behaviortrajectory" component={BehaviorTrajectory}/>
                        <Route path="/mainframe/systemsetup/earlywarningsetting" component={EarlyWarningSetting}/>
                        <Route path="/mainframe/systemsetup/earlywarningconfigadd" component={EarlyWarningConfigAdd}/>
                        <Route path="/mainframe/systemsetup/earlywarningwhitelist/personal/addoredit" component={WhitelistPersonalAdd}/>
                        <Route path="/mainframe/systemsetup/earlywarningwhitelist/holiday/addoredit" component={WhitelistHolidayAdd}/>
                        <Route path="/mainframe/comprehensivewarning" exact component={ComprehensiveWarning}/>
                        <Route path="/mainframe/comprehensivewarning/detail/:id" exact component={ComprehensiveWarningDetail}/>
                        <Route path="/mainframe/accessmanage/account" component={Account}/>
                        <Route path="/mainframe/accessmanage/menu" component={Menu}/>
                        <Route path="/mainframe/accessmanage/authority" component={Authority}/> */}
                        <Route path="/" render={(props) => <Redirect to='/mainframe/dashboard/analysis'/>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(RightComponent)
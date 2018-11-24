import React from 'react';
import { Switch, Route,Redirect } from 'react-router-dom';
import { asyncComponent } from '../utils';
//获取到异步组件
// Dashboard
const Analysis = asyncComponent(() => import('../pages/Dashboard/Analysis')); //分析页
const Relation = asyncComponent(() => import('../pages/Dashboard/Relation')); //关系页

// 地图
const BaiduMaps = asyncComponent(() => import('../pages/Map/BaiduMaps')); //百度地图
const BMap = asyncComponent(() => import('../pages/Map/BMap')); //BMap

// 其他组件
const ModalCont = asyncComponent(() => import('../pages/Others/Modal')); //弹框
const NoDataCont = asyncComponent(() => import('../pages/Others/NoData')); //空数据处理
const TableToExcel = asyncComponent(() => import('../pages/Others/TableToExcel')); //Table转Excel
const MainCard = asyncComponent(() => import('../pages/Others/MainCard')); //MainCard
const Editor = asyncComponent(() => import('../pages/Others/editor')); //富文本编辑器

const pageRouter=()=>(
    <React.Fragment>
        <Switch>
            <Route path="/mainframe/dashboard/analysis" component={Analysis} />
            <Route path="/mainframe/dashboard/relation" component={Relation} />
            <Route path="/mainframe/map/baidumaps" component={BaiduMaps} />
            <Route path="/mainframe/map/bmap" component={BMap} />
            <Route path="/mainframe/others/modal" component={ModalCont} />
            <Route path="/mainframe/others/nodata" component={NoDataCont} />
            <Route path="/mainframe/others/tabletoexcel" component={TableToExcel} />
            <Route path="/mainframe/others/maincard" component={MainCard} />
            <Route path="/mainframe/others/editor" component={Editor} />    
            <Route path="/" render={(props) => <Redirect to='/mainframe/dashboard/analysis' />} />
        </Switch>
    </React.Fragment>
)
export default pageRouter